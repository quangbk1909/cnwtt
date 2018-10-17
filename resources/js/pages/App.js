import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Example from '../components/Example'
import NavigationBar from "../components/NavigationBar";
import HomePage from "./HomePage";

export default class App extends Component {
    render() {
        return (
            <Router>
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
                    <NavigationBar/>
                    <div className="container">
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/Home" component={HomePage}/>
                        <Route exact path="/example" component={Example}/>
                    </div>
                </div>
            </Router>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('example'));
