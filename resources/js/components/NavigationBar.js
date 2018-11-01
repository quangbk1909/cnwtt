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
            <nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation"
                 style={{paddingLeft: 100, alignSelf: 'center', height: 50, marginBottom: 20}}>
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
                                <span style={{marginRight: 20}} >Stories</span>
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
                                        <path
                                            d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"/>
                                    </svg>
                                </span>
                                </form>
                            </div>
                        </div>
                    </NavItem>
                </Nav>
            </nav>
        );
    }
}

/*
<nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        <img src={logo} alt="logo"/>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">Stories <span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="post.html">Post</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="author.html">Author</a>
                            </li>
                        </ul>
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
            </nav>
 */

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        alignSelf: 'center',
        position: 'fixed',
        backgroundColor: 'white'
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
    }
};
