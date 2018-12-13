import React, {Component} from 'react';


import {
    Link,
    NavLink,
} from 'react-router-dom'

import {withRouter} from 'react-router'

import logo from '../Assets/logo.png'

import '../CSS/bootstrap.min.css'

import '../App.css'

import {
    Nav,
    NavItem
} from 'react-bootstrap'

const categories = [
    {
        name: 'Home',
        path: '/Home'
    },
    {
        name: 'Collections',
        path: '/'
    },
    {
        name: 'Power Trip',
        path: '/'
    },
    {
        name: 'Culture',
        path: '/'
    },
    {
        name: 'Tech',
        path: '/'
    },
    {
        name: 'Startup',
        path: '/'
    },
    {
        name: 'Self',
        path: '/'
    },
    {
        name: 'Politics',
        path: '/'
    },
    {
        name: 'Design',
        path: '/'
    },
    {
        name: 'Popular',
        path: '/'
    }
];

const dIconSearch = 'M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z';

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    componentDidMount() {

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
                            <img src={logo} alt="logo"/>
                        </div>
                    </Link>
                    <Nav pullRight navbar={true}>
                        <NavItem componentClass={'span'}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 50,
                                alignSelf: 'center'
                            }}>
                                <NavLink to={'/'} style={{textDecorationColor: 'transparent'}}>
                                    <span style={{marginRight: 20}}>Stories</span>
                                </NavLink>
                                <NavLink to={'/Post'} style={{marginRight: 20, textDecorationColor: 'transparent'}}>
                                    <span>Post</span>
                                </NavLink>
                                <NavLink to={'/Author'} style={{textDecorationColor: 'transparent', marginRight: 20}}>
                                    <span>Author</span>
                                </NavLink>
                                <div style={styles.searchContainer}>
                                    <div className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" name="textSearch" type="text" value={this.state.keyword}
                                               placeholder="Search"
                                               onKeyPress={(evt) => this.onPressSearch(evt)}
                                               onChange={event => this.updateInputValue(event)}/>

                                        {
                                            this.state.keyword.trim().length > 0 || true ?
                                                (
                                                    <Link to={{pathname: '/search', search: 'text=' + this.state.keyword}}>
                                                        <span className="search-icon">
                                                            <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                                                <path d={dIconSearch}/>
                                                            </svg>
                                                        </span>
                                                    </Link>
                                                ) :
                                                (
                                                    <span className="search-icon" onClick={() => alert('Empty keyword')}>
                                                        <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
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
