import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Example from '../components/Example';
import NavigationBar from "../components/NavigationBar";
import HomePage from "./HomePage";
import PostPage from "./PostPage";
import AuthorPage from "./AuthorPage";
import TopicPage from "./TopicPage";
import ResultPage from "./ResultPage";
import CreatePostPage from "./CreatePostPage";
import Pusher from 'pusher-js'

import {setPusherClient} from 'react-pusher'

import rootReducer from '../redux/reducers'

const store = createStore(rootReducer);
import pushNotification from '../redux/PusherActions'

import Echo from 'laravel-echo'

const pusher = new Pusher('b8416bb5c1e33d4d2a9f', {
    cluster: 'ap1',
    forceTLS: true
});

export default class App extends Component {

    componentDidMount() {
        // setPusherClient(pusher);
        // let channel = pusher.subscribe('App.User.60');
        // channel.bind('notification', function (data) {
        //     alert(JSON.stringify(data));
        // });

        // let echo = new Echo({
        //     broadcaster: 'pusher',
        //     key: 'b8416bb5c1e33d4d2a9f',
        //     cluster: 'ap1',
        //     encrypted: true,
        // });
        //
        // echo.private('App.User.60')
        //     .notification((notification) => {
        //         console.log('noti', notification);
        //     });
    }

    render() {
        return (
            <Provider store={store}>
                {/*<Pusher*/}

                {/*channel={"App.User.31"}*/}
                {/*event="listChanged"*/}
                {/*onUpdate={() => {*/}
                {/*store.dispatch(pushNotification({}));*/}
                {/*console.log('noti');*/}
                {/*}}*/}
                {/*/>*/}
                <Router>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                        <NavigationBar/>
                        <div style={{marginTop: 70, width: '100%'}}>
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/home" component={HomePage}/>
                            <Route exact path="/post" component={PostPage}/>
                            {/*<Route exact path="/post/:postId" component={PostPage}/>*/}
                            {/*<Route exact path="/author/:authorId" component={AuthorPage}/>*/}
                            <Route exact path="/author" component={AuthorPage}/>
                            {/*<Route exact path="/topic/:topicId" component={TopicPage}/>*/}
                            <Route exact path="/topic" component={TopicPage}/>
                            <Route exact path="/search" component={ResultPage}/>
                            <Route path="/post/new" component={CreatePostPage}/>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}
ReactDOM.render(<App/>, document.getElementById('example'));
