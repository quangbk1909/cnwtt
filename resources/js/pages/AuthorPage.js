/* eslint-disable react/jsx-no-target-blank */
import React, {Component} from 'react'
import NavigationBar from "../components/NavigationBar";
import Images from '../Themes/Images'

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'
import API from '../Services/API'

import ProgressBar from 'react-progress-bar-plus'
import 'react-progress-bar-plus/lib/progress-bar.css'
import AuthorPost from "../components/AuthorPost";


export default class AuthorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAuthor: null,
            percent: 0
        }
    }

    componentDidMount() {
        console.log('user_id', this.props.match.params.authorId);
        API.getAuthorById(this.props.match.params.authorId, (result) => {
            this.setState({currentAuthor: result, percent: 100});
            console.log('author', result)
        }, (error) => {

        })
    }


    render() {

        let author = this.state.currentAuthor;

        return (
            <div>
                {
                    !this.state.currentAuthor ?
                        <ProgressBar
                            percent={this.state.percent}
                            autoIncrement
                            spinner="right"
                        />
                        :
                        <div style={{width: '100%'}}>
                            <div className="row">
                                <div className="col-md-2"/>
                                <div className="col-md-8 col-md-offset-2">
                                    <div className="mainheading">
                                        <div className="row post-top-meta authorpage">
                                            <div className="col-md-10 col-xs-12">
                                                <h1>{author.author_name}</h1>
                                                <span className="author-description">Founder of <a target="_blank"
                                                                                                   href="https://www.wowthemes.net">WowThemes.net</a> and creator of <strong>"Mediumish"</strong> theme that you're currently previewing. I professionally develop premium themes, templates & scripts since the Apocalypse (2012). You can reach me out on the social links below.</span>
                                                <div className="sociallinks">
                                                    <a target="_blank" href="https://www.facebook.com/wowthemesnet/">
                                                        <i className="fa fa-facebook"/>
                                                    </a>
                                                    <span className="dot"/>
                                                    <a target="_blank"
                                                       href="https://plus.google.com/s/wowthemesnet/top">
                                                        <i className="fa fa-google-plus"/>
                                                    </a>
                                                </div>
                                                <a target="_blank" href="https://twitter.com/wowthemesnet"
                                                   className="btn follow">Follow</a>
                                            </div>
                                            <div className="col-md-2 col-xs-12">
                                                <img className="author-thumb"
                                                     src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
                                                     alt="Sal"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="graybg authorpage">
                                <div className="container">
                                    <div className="listrecent listrelated">
                                        {
                                            this.state.currentAuthor.posts.map((item, index) => {
                                                return <AuthorPost key={index} data={item} author={author}/>
                                            })
                                        }
                                    </div>
                                </div>

                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div className="footer"
                                         style={{display: 'flex', width: '80%', alignSelf: 'center'}}>
                                        <p className="pull-left">
                                            Group 12
                                        </p>
                                        <div className="clearfix">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}
