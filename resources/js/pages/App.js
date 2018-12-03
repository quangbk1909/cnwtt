import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Example from '../components/Example';
import NavigationBar from "../components/NavigationBar";
import HomePage from "./HomePage";
import PostPage from "./PostPage";
import AuthorPage from "./AuthorPage";
import TopicPage from "./TopicPage";
import ResultPage from "./ResultPage";
import CreatePostPage from "./CreatePostPage";

export default class App extends Component {

    render() {
        return (
            <Router>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                    <NavigationBar/>
                    <div style={{marginTop: 0, width: '100%'}}>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/home" component={HomePage}/>
                        <Route exact path="/post" component={CreatePostPage}/>
                        <Route exact path="/post/:postId" component={PostPage}/>
                        <Route exact path="/author/:authorId" component={AuthorPage}/>
                        <Route exact path="/author" component={AuthorPage}/>
                        <Route exact path="/topic/:topicId" component={TopicPage}/>
                        <Route exact path="/search" component={ResultPage}/>
                        <Route path="/post/new" component={CreatePostPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('example'));
