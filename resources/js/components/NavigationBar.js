import React, {Component} from 'react';


import {
    Link
} from 'react-router-dom'

import logo from '../../Assets/logo.png'

// import '../App.css'

import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
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
                <Navbar fixedTop={true}>
                    <Nav pullLeft={true}>
                        <Link to={'/'}>
                            <a className="navbar-brand">
                                <img src={logo} alt="logo"/>
                            </a>
                        </Link>
                    </Nav>
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
                                <Link to={'/'} style={{textDecoration: 'none'}}>
                                    <a style={{marginRight: 20}} className="nav-link">Stories</a>
                                </Link>
                                <Link to={'/'} style={{marginRight: 20, textDecoration: 'none'}}>
                                    <text>Post</text>
                                </Link>
                                <Link to={'/'} style={{textDecoration: 'none', marginRight: 20}}>
                                    <text>Author</text>
                                </Link>
                                <div style={{
                                    marginLeft: 15,
                                    display: 'flex',
                                    borderCollapse: 'collapsed',
                                    flexDirection: 'row',
                                    flex: 1,
                                    width: 200
                                }}>
                                    <input type="text" placeholder="Search" style={styles.searchInput}/>
                                </div>
                            </div>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
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
