import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NavigationBar from "./NavigationBar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import AuthorPage from "../pages/AuthorPage";

export default class Example extends Component {
    render() {
        return (
            <Router>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                    <NavigationBar/>
                    <div style={{marginTop: 10, width: '100%'}}>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/Home" component={HomePage}/>
                        <Route exact path="/Post" component={PostPage}/>
                        <Route exact path="/Post/:postId" component={PostPage}/>
                        <Route exact path="/Author/:authorId" component={AuthorPage}/>
                        <Route exact path="/Author" component={AuthorPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
