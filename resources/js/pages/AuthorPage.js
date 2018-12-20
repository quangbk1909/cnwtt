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
import ValueHolder from "../Services/ValueHolder";


export default class AuthorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAuthor: null,
            percent: 0,
            followed: false,
            followedError: false,
            loading: true,
            authorId: props.location.search.substring(4, props.location.search.length),
            currentUserId: parseInt(props.location.search.substring(4, props.location.search.length))
        };
        console.log('author page', props.location.search.substring(4, props.location.search.length));
        this.count = 0;
    }

    componentDidMount() {
        console.log('user_id', this.state.authorId);
        API.getAuthorById(this.state.authorId, (result) => {
            this.setState({currentAuthor: result});
            console.log('author', result);
            this.checkFollow(result.user_id)
        }, (error) => {

        });
    }

    checkFollow(authorId) {
        API.get('/api/blog/author/checkRelationship/' + authorId, {}, (result) => {
            this.setState({followed: result.check_relationship, percent: 100});
            this.getCurrentUser();
        }, (error) => {
            this.setState({percent: 100, followedError: true});
            this.getCurrentUser()
        })
    }

    getCurrentUser() {
        API.getCurrentAuthor((result) => {
            console.log('current', result);
            this.setState({currentUserId: result.user_id, loading: false});
        }, (error) => {
            this.setState({loading: false})
        })
    }

    follow() {
        let followed = !this.state.followed;
        this.setState({followed});
        if (followed) {
            API.get('/api/blog/author/follow/' + this.state.currentAuthor.user_id, {}, (result) => {

            }, (result) => {

            })
        } else {
            API.get('/api/blog/author/unfollow/' + this.state.currentAuthor.user_id, {}, (result) => {

            }, (result) => {

            })
        }
    }

    render() {


        let author = this.state.currentAuthor;

        console.log('check', this.state.authorId !== this.state.currentUserId);
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
                                                <span className="author-description">{author.description}</span>
                                                <div className="sociallinks">
                                                </div>
                                                {
                                                    (!this.state.followedError || this.state.loading) && this.state.authorId != this.state.currentUserId &&
                                                    <a onClick={() => this.follow()}
                                                       className={"btn follow"}>{this.state.followed ? 'Followed' : 'Follow'}</a>
                                                }
                                            </div>
                                            <div className="col-md-2 col-xs-12">
                                                <img className="author-thumb"
                                                     src={Images.avatar(author.avatar)}
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
