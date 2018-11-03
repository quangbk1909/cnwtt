import React, {Component} from 'react';


import {
    Link,
    NavLink
} from 'react-router-dom'

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

export default class NavigationBar extends Component {
    render() {
        return (
            <div style={styles.container}>
                <nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation"
                     style={{paddingLeft: 100, alignSelf: 'center', marginBottom: 0}}>
                    <Link to={'/'}>
                        <a className="navbar-brand">
                            <img src={logo} alt="logo"/>
                        </a>
                    </Link>
                    <Nav pullRight navbar={true}>
                        <NavItem>
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
                                <Link to={'/Post'} style={{marginRight: 20, textDecorationColor: 'transparent'}}>
                                    <span>Post</span>
                                </Link>
                                <Link to={'/Author'} style={{textDecorationColor: 'transparent', marginRight: 20}}>
                                    <span>Author</span>
                                </Link>
                                <div style={{
                                    marginLeft: 15,
                                    display: 'flex',
                                    borderCollapse: 'collapsed',
                                    flexDirection: 'row',
                                    flex: 1,
                                    width: 200
                                }}>
                                    <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                                        <span className="search-icon">
                                    <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                        <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"/>
                                    </svg>
                                </span>
                                    </form>
                                </div>
                            </div>
                        </NavItem>
                    </Nav>
                </nav>
            </div>
        );
    }
}

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
};
