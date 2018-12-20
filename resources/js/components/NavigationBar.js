import React, {Component} from 'react';


import {
    Link,
} from 'react-router-dom'

import {withRouter} from 'react-router'
import '../CSS/bootstrap.min.css'

import '../App.css'

import {
    Nav,
    NavItem
} from 'react-bootstrap'

import API from '../Services/API'

const dIconSearch = 'M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z';

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            statusLoggedIn: false,
            userId: null,
            showNotification: false
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
            this.setState({userId: result.user_id})
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
                        <a style={{marginRight: 10}}
                           href={(this.state.statusLoggedIn && this.state.userId) ? '/admin' : '/login'}>{this.state.statusLoggedIn ? 'Go to my profile' : 'Login'}</a>
                        {
                            this.state.statusLoggedIn &&
                            <div>
                                <a onClick={() => this.setState({showNotification: !this.state.showNotification})}>
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px"
                                         width="24px" height="24px"
                                         viewBox="0 0 510 510">
                                        <path
                                            d="M255,510c28.05,0,51-22.95,51-51H204C204,487.05,226.95,510,255,510z M420.75,357V216.75    c0-79.05-53.55-142.8-127.5-160.65V38.25C293.25,17.85,275.4,0,255,0c-20.4,0-38.25,17.85-38.25,38.25V56.1    c-73.95,17.85-127.5,81.6-127.5,160.65V357l-51,51v25.5h433.5V408L420.75,357z"
                                            fill={this.state.showNotification ? 'red' : 'blue'}/>
                                    </svg>
                                </a>
                                {
                                    this.state.showNotification &&
                                    <div style={{width: 400, height: 600, backgroundColor: 'red', position: 'absolute', marginLeft: -300, marginTop: 10, zIndex: 100}}>
                                        <div style={{marginTop: -15, marginLeft: 300}}>
                                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                                 x="0px" y="0px"
                                                 width="24px" height="24px"
                                                 viewBox="0 0 490 490">
                                                <path d="M490,474.459H0L245.009,15.541L490,474.459z"/>
                                            </svg>
                                        </div>
                                        <div style={{width: 400, height: 600, backgroundColor: 'red', position: 'absolute', zIndex: 2000, marginTop: -10}}>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        {
                            this.state.statusLoggedIn &&
                            <a href={'/author?id=' + this.state.userId} className="login-btn" style={{marginRight: 50}}>My
                                Post</a>
                        }
                    </div>
                </nav>
            </div>
        );
    }
}

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
