import React, {Component} from 'react';


import {
    Link,
} from 'react-router-dom'

import {withRouter} from 'react-router'
import '../CSS/bootstrap.min.css'
import '../CSS/mediumish.css'
import '../App.css'

import pushNotification from '../redux/PusherActions'

import {
    Nav,
    NavItem
} from 'react-bootstrap'

import API from '../Services/API'
import ValueHolder from "../Services/ValueHolder";
import Images from "../Themes/Images";
import moment from 'moment'
import Echo from "laravel-echo";

const dIconSearch = 'M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z';

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            statusLoggedIn: false,
            userId: null,
            showNotification: false,
            notifications: []
        }
    }

    componentDidMount() {
        API.get('/api/blog/author/checkUser', {}, (result) => {
            this.setState({statusLoggedIn: result.status_logged_in});
            console.log('login', result)
        }, (error) => {
            console.log('login', error)
        });

        API.getCurrentAuthor((result) => {
            this.setState({userId: result.user_id});
            ValueHolder.userId = result.user_id;
            this.getNotifications();
            let echo = new Echo({
                broadcaster: 'pusher',
                key: 'b8416bb5c1e33d4d2a9f',
                cluster: 'ap1',
                encrypted: true,
            });

            echo.private('App.User.' + result.user_id)
                .notification((notification) => {
                    // console.log('noti', notification);
                    this.getNotifications();
                });
        }, (error) => {

        })
    }

    getNotifications() {
        API.get('/api/blog/author/notifications', {}, (result) => {
            console.log('noti', result);
            this.setState({notifications: result})
        }, (error) => {

        })
    }

    updateInputValue(evt) {
        console.log('evt', evt.target.value);
        this.setState({keyword: evt.target.value});
    }

    navigateSearchScreen() {
        console.log(this);
        this.props.history.push('/post')
    }

    onPressSearch(evt) {
        if (evt.key === 'Enter') {
            this.props.history.push({
                pathname: '/search',
                search: 'text=' + this.state.keyword
            });
            this.setState({keyword: ''})
        }
    }

    markAsRead() {
        API.get('/api/blog/author/markAsRead', {}, (result) => {
            let notifications = this.state.notifications.map(noti => {
                noti.read_at = new Date().getMilliseconds();
                return noti;
            });
            console.log('new notis', notifications);
            this.setState({notifications});
        }, (error) => {

        })
    }

    render() {
        return (
            <div style={styles.container}>
                <nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation"
                     style={{paddingLeft: 100, alignSelf: 'center', marginBottom: 0}}>
                    <Link to={'/'}>
                        <div className="navbar-brand">
                            <h4 className="logo">{'HustBlog'}</h4>
                        </div>
                    </Link>

                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Nav pullRight navbar={true}>
                            <NavItem componentClass={'span'}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center'
                                }}>
                                    <div style={styles.searchContainer}>
                                        <div className="form-inline my-2 my-lg-0">
                                            <input className="form-control mr-sm-2" name="textSearch" type="text"
                                                   value={this.state.keyword}
                                                   placeholder="Search"
                                                   onKeyPress={(evt) => this.onPressSearch(evt)}
                                                   onChange={event => this.updateInputValue(event)}/>

                                            {
                                                this.state.keyword.trim().length > 0 || true ?
                                                    (
                                                        <Link to={{
                                                            pathname: '/search',
                                                            search: 'text=' + this.state.keyword
                                                        }}>
                                                        <span className="search-icon">
                                                            <svg className="svgIcon-use" width="25" height="25"
                                                                 viewBox="0 0 25 25">
                                                                <path d={dIconSearch}/>
                                                            </svg>
                                                        </span>
                                                        </Link>
                                                    ) :
                                                    (
                                                        <span className="search-icon"
                                                              onClick={() => alert('Empty keyword')}>
                                                        <svg className="svgIcon-use" width="25" height="25"
                                                             viewBox="0 0 25 25">
                                                            <path d={dIconSearch}/>
                                                        </svg>
                                                    </span>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </NavItem>
                        </Nav>
                        {
                            this.state.statusLoggedIn &&
                            <div>
                                <a onClick={() => {
                                    let currentState = this.state.showNotification;
                                    this.setState({showNotification: !this.state.showNotification});
                                    if (!currentState) {
                                        this.markAsRead()
                                    }
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
                                         width="24px" height="24px"
                                         viewBox="0 0 510 510">
                                        <path
                                            d="M255,510c28.05,0,51-22.95,51-51H204C204,487.05,226.95,510,255,510z M420.75,357V216.75    c0-79.05-53.55-142.8-127.5-160.65V38.25C293.25,17.85,275.4,0,255,0c-20.4,0-38.25,17.85-38.25,38.25V56.1    c-73.95,17.85-127.5,81.6-127.5,160.65V357l-51,51v25.5h433.5V408L420.75,357z"
                                            fill={this.state.showNotification ? '#02B875' : '#aaaaaa'}/>
                                    </svg>
                                    {
                                        this.state.notifications.filter(noti => noti.read_at === null).length > 0 &&
                                        <a onClick={() => {
                                            let currentState = this.state.showNotification;
                                            this.setState({showNotification: !this.state.showNotification});
                                            if (!currentState) {
                                                this.markAsRead()
                                            }
                                        }}
                                           style={{color: 'white'}}
                                           className={"noti-badge"}>{this.state.notifications.filter(noti => noti.read_at === null).length}</a>
                                    }
                            </a>
                            {
                                this.state.showNotification &&
                                <div style={{
                                    width: 400,
                                    backgroundColor: '#02B875',
                                    position: 'absolute',
                                    marginLeft: -300,
                                    marginTop: 10,
                                    zIndex: 100
                                }}>
                                    <div style={{marginTop: -15, marginLeft: 300}}>
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                             x="0px" y="0px"
                                             width="24px" height="24px"
                                             viewBox="0 0 490 490">
                                            <path d="M490,474.459H0L245.009,15.541L490,474.459z" fill={'#02B875'}/>
                                        </svg>
                                    </div>
                                    <div style={{
                                        width: 400,
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        zIndex: 2000,
                                        marginTop: -10,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: 10,
                                        minHeight: 300,
                                        maxHeight: 600
                                    }} className="noti-pan">
                                        {
                                            this.state.notifications.map((noti, index) => {
                                                return (
                                                    <div style={{width: '100%', marginBottom: 10}} key={index}>
                                                        <div className="metafooter">
                                                            <div className="wrapfooter">
								                                    <span className="meta-footer-thumb">
                                                                        <a style={{color: 13}}>
                                                                            <img className="author-thumb"
                                                                                 src={Images.avatar(noti.data.user.image_link)}
                                                                                 alt="Sal"/>
                                                                        </a>
                                                                    </span>
                                                            </div>
                                                        </div>
                                                        <span style={{fontSize: 13}}><b>{noti.data.user.name}</b> đã thêm bài viết mới: <b>{noti.data.post.title}</b>. <a
                                                            style={{color: '#00ab6b'}}
                                                            href={'/post?id=' + noti.data.post.id}>Xem thêm</a></span>
                                                        <br/>
                                                        <span style={{
                                                            fontSize: 13,
                                                            color: '#aaaaaa',
                                                            marginLeft: 52
                                                        }}>{moment(noti.data.post.created_at).fromNow()}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            </div>
                        }
                        {
                            this.state.statusLoggedIn &&
                            <a href={'/author?id=' + this.state.userId}
                               style={{marginRight: 10, marginLeft: 10, color: '#00ab6b'}}>
                                {/*My Post*/}
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     width="24px" height="24px" viewBox="0 0 47 47" fill={'#aaaaaa'}>
                                    <path d="M26.198,8.368H10.176c-1.18,0-2.137,0.957-2.137,2.136c0,1.179,0.957,2.136,2.137,2.136h16.022
				                            c1.182,0,2.137-0.957,2.137-2.136C28.334,9.325,27.379,8.368,26.198,8.368z"/>
                                    <path d="M28.334,18.515c0-1.18-0.955-2.136-2.137-2.136H10.176c-1.18,0-2.137,0.957-2.137,2.136c0,1.18,0.957,2.137,2.137,2.137
				h16.022C27.379,20.652,28.334,19.695,28.334,18.515z"/>
                                    <path d="M18.188,28.663c1.18,0,2.136-0.957,2.136-2.136c0-1.18-0.956-2.137-2.136-2.137h-8.012c-1.18,0-2.137,0.957-2.137,2.137
				s0.957,2.136,2.137,2.136H18.188z"/>
                                    <path d="M34.314,35.93l-2.241,1.479v5.318H4.301V4.273h27.772v8.442l4.273-7.401V2.136c0-1.18-0.957-2.136-2.137-2.136H2.164
				c-1.18,0-2.136,0.957-2.136,2.136v42.729c0,1.18,0.956,2.136,2.136,2.136h32.045c1.181,0,2.138-0.957,2.138-2.136V33.09
				l-1.021,1.766C35.077,35.287,34.727,35.658,34.314,35.93z"/>
                                    <path d="M46.947,9.894c-0.044-0.192-0.495-1.918-3.213-3.488c-2.718-1.569-4.438-1.097-4.628-1.038
				c-0.255,0.081-0.47,0.253-0.604,0.485L25.15,28.979c-0.083,0.145-0.132,0.306-0.142,0.472l-0.5,8.345
				c-0.024,0.404,0.182,0.786,0.531,0.989c0.352,0.202,0.785,0.188,1.123-0.033l6.977-4.606c0.139-0.09,0.254-0.213,0.337-0.356
				L46.829,10.66C46.963,10.428,47.004,10.156,46.947,9.894z M28.854,35.055c-0.355-0.287-0.758-0.558-1.191-0.809
				c-0.435-0.251-0.871-0.462-1.297-0.628l0.149-2.502c0.557,0.073,1.383,0.299,2.432,0.903c1.048,0.605,1.655,1.209,1.999,1.654
				L28.854,35.055z"/>
                                    <path d="M14.922,38.534c0.07,0.429,0.565,0.562,0.896,0.7c0.32,0.135,0.702-0.121,0.968-0.25c1.63-0.793,3.838,0.139,5.584,0.139
				c1.033,0,1.033-1.602,0-1.602c-2.036,0-3.73-0.515-5.748-0.182c0-0.117-0.043-0.275-0.169-0.49
				c-0.377-0.645-0.857-0.828-1.338-0.75c-0.032-0.076-0.063-0.152-0.108-0.229c-0.126-0.206-0.302-0.309-0.5-0.352
				c0.563-0.984,0.926-2.025,0.557-2.867c-0.113-0.256-0.434-0.387-0.692-0.397c-1.07-0.04-1.988,1.083-2.676,1.757
				c-1.721,1.687-3.237,3.602-4.704,5.508c-0.63,0.819,0.763,1.615,1.383,0.81c1.3-1.688,2.677-3.327,4.159-4.86
				c-0.357,0.586-0.736,1.161-1.135,1.715c-0.57,0.881,0.791,1.631,1.383,0.809c0.141-0.215,0.32-0.37,0.516-0.503
				c-0.039,0.099-0.079,0.196-0.119,0.296c0.002,0,0.004,0.001,0.006,0.002c-0.031,0.064-0.062,0.128-0.087,0.189
				c-0.358,0.897,0.979,1.308,1.465,0.616c0.123-0.174,0.237-0.36,0.34-0.555C14.896,38.172,14.893,38.352,14.922,38.534z"/>
                                </svg>

                            </a>
                        }
                        <a style={{marginRight: 10, color: '#00ab6b'}} className="login-btn"
                           href={(this.state.statusLoggedIn && this.state.userId) ? '/admin' : '/login'}>{this.state.statusLoggedIn ? 'Go to my profile' : 'Login'}</a>

                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pushNotification: state.noti
})

const mapDispatchToProps = dispatch => ({
    // toggleTodo: id => dispatch(toggleTodo(id))
})


export default withRouter(NavigationBar)

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        zIndex: 1030,
        backgroundColor: 'red'
    },
    logo: {
        fontFamily: 'Lato',
        color: 'red',
        borderWidth: 2,
        borderColor: 'black'
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        overflow: 'hidden',
        borderRadius: 30,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        outline: 'none',
        flex: 1
    },
    searchIcon: {
        backgroundColor: 'red'
    },
    searchContainer: {
        marginLeft: 15,
        display: 'flex',
        borderCollapse: 'collapsed',
        flexDirection: 'row',
        flex: 1,
        width: 200
    }
};
