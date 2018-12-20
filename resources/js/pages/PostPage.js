import React, {Component} from 'react'
import Images from "../Themes/Images";

import API from '../Services/API'
import {
    Link
} from 'react-router-dom'
import moment from "moment";
import CommentItem from "../components/CommentItem";
import CommentView from "../components/CommentView";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBar from "react-progress-bar-plus";
import ValueHolder from "../Services/ValueHolder";
import Config from "../config/Config";

export default class PostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.location.search.substring(4, props.location.search.length),
            comments: [],
            post: {},
            author: {},
            recommendedItems: [],
            animate: false,
            liked: false,
            followed: false,
            loading: true,
            percent: 0,
            followedError: false,
            notExist: null
        };
        console.log('props', props);
    }

    componentDidMount() {
        this.fetchComment();
        if (this.refs.buttonHeart) {
            this.refs.buttonHeart.addEventListener('animationend', () => this.cancelAnim());
        }
        // API.get('/api/blog/author/checkRelationship/')
    }

    fetchComment() {
        API.get('/api/blog/post/getSinglePost/' + this.state.id, {}, (result) => {
            console.log('result post', result);
            this.setState({author: result.author, post: result.post});
            this.checkFollow(result.author.id)
        }, (error) => {
            this.setState({notExist: true, loading: false, percent: 100});
        });

        API.getCmt(this.state.id).then((comments) => {
            console.log('post', comments);
            this.setState({comments})
        });

        API.getRecommendItems((result) => {
            console.log('reco', result);
            this.setState({recommendedItems: result})
        }, (error) => {

        })
    }

    checkFollow(authorId) {
        API.get('/api/blog/author/checkRelationship/' + authorId, {}, (result) => {
            this.setState({followed: result.check_relationship, percent: 100, loading: false})
        }, (error) => {
            this.setState({percent: 100, loading: false, followedError: true})
        })
    }

    saveComment(comment) {
        if (comment.content && comment.content !== '') {
            API.saveComment(this.state.id, comment, (result) => {
                this.fetchComment();
                console.log('save success', result)
            }, (error) => {
                console.log('save error', error)
            })
        }
    }

    vote() {
        API.get(`/api/blog/post/vote/${this.state.id}`, {}, (result) => {
            let post = this.state.post;
            post.vote_numbers += 1;
            this.setState({post});
            console.log('vote', result)
        }, (error) => {

        })
    }

    cancelAnim() {
        this.setState({animate: false})
    }

    follow() {
        let followed = !this.state.followed;
        this.setState({followed});
        if (followed) {
            API.get('/api/blog/author/follow/' + this.state.author.id, {}, (result) => {

            }, (result) => {

            })
        } else {
            API.get('/api/blog/author/unfollow/' + this.state.author.id, {}, (result) => {

            }, (result) => {

            })
        }
    }

    renderRecommendedItem() {
        return this.state.recommendedItems.map((item, index) => {

            const createDate = item.createdDate;
            let dateStr = moment(createDate).format('MMM, DD YYYY');


            return (
                <div className="col-md-4" key={index}>
                    <div className="card">
                        <a href={'/post?id=' + item.post_id}>
                            <img className="img-fluid img-thumb" src={Images.imagePost(item.image_post)} alt=""
                                 style={{height: 180, width: '100%'}}/>
                        </a>
                        <div className="card-block">
                            <h2 className="card-title">
                                <a href={'/post?id=' + item.post_id} style={{textDecorationColor: 'transparent'}}>
                                    <span className="topic-post-title-popular">{item.title}</span>
                                </a>
                            </h2>
                            <div className="metafooter">
                                <div className="wrapfooter">
                                    <span className="meta-footer-thumb">
                                        <a href={'/author?id=' + item.author_id}>
                                            <img className="author-thumb"
                                                 src={Images.avatar(item.avatar)}
                                                 alt="Sal"/>
                                        </a>
                                    </span>
                                    <span className="author-meta">
                                        <span className="post-name">
                                            <a href={'/author?id=' + item.author_id}>
                                                <span>{item.author_name}</span>
                                            </a>
                                        </span>
                                        <br/>
                                        <span className="post-date">{dateStr}</span>
                                    </span>
                                    <span className="post-read-more">
                                        <a href={'/post?id=' + 2}>
                                            <svg className="svgIcon-use" width="25" height="25"
                                                 viewBox="0 0 25 25">
                                                <path
                                                    d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"
                                                    fillRule="evenodd"/>
                                            </svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderContent() {
        console.log('renderContent')
        if (this.state.loading) {
            return this.renderLoadingPage()
        } else {
            if (this.state.notExist) {
                return this.renderError()
            } else {
                return this.renderPage()
            }
        }
    }

    renderLoadingPage() {
        console.log('renderLoadingPage')
        return (
            <div>
            </div>
        )
    }

    renderPage() {
        console.log('renderPage');
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-xs-12">
                            <div className="share">
                                <p>
                                    Vote
                                </p>
                                <ul>
                                    <li>
                                        <a>
                                            {this.state.post.vote_numbers ? this.state.post.vote_numbers : 0}
                                            <br/>
                                            <div
                                                ref={(button) => {
                                                    this.buttonHeart = button;
                                                    console.log('button', this.buttonHeart)
                                                    if (this.buttonHeart) {
                                                        this.buttonHeart.addEventListener('animationend', () => this.cancelAnim());
                                                    }
                                                    // this.buttonHeart.addEventListener('animationend', () => this.cancelAnim());
                                                }}
                                                // ref="buttonHeart"
                                                className={this.state.animate ? "is-animating" : (this.state.liked ? "heart-fill" : "heart")}
                                                onClick={() => {
                                                    if (!this.state.liked) {
                                                        this.vote();
                                                        this.setState({animate: true, liked: true});
                                                    }
                                                }}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8 col-md-offset-2 col-xs-12">
                            <div className="mainheading">

                                <div className="row post-top-meta">
                                    <div className="col-md-2">
                                        <a href={'/author?id=' + this.state.author.id}>
                                            <img className="author-thumb"
                                                 src={this.state.author.image_link ? Images.avatar(this.state.author.image_link) : "https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"}
                                                 alt="Sal"/>
                                        </a>
                                    </div>
                                    <div className="col-md-10">
                                        <a href={'/author?id=' + this.state.author.id}>
                                            <span className="link-dark">{this.state.author.name}</span>
                                        </a>
                                        {
                                            this.state.author && !this.state.followedError && (this.state.author.id !== ValueHolder.userId) &&
                                            <a className="btn follow"
                                               onClick={() => this.follow()}>{this.state.followed ? 'Followed' : 'Follow'}</a>
                                        }
                                        <br/>
                                        <span
                                            className="author-description">{this.state.author.description || ''}</span>
                                        <br/>
                                        <span
                                            className="post-date">{moment(this.state.post.created_at).format('MMM, DD YYYY')}</span>
                                    </div>
                                </div>

                                <h1 className="posttitle">{this.state.post.title}</h1>

                            </div>

                            <img className="featured-image img-fluid"
                                 src={this.state.post.image_name ? Images.imagePost(this.state.post.image_name) : Images.demopic.img10}
                                 alt=""/>

                            <div
                                dangerouslySetInnerHTML={{__html: `<span>${this.state.post.content || ''}</span>`}}/>

                        </div>

                    </div>
                </div>

                <CommentView comments={this.state.comments}
                             saveComment={(comment) => this.saveComment(comment)}/>

                <div className="hideshare"/>
                <div className="graybg">
                    <div className="container">
                        <div className="row listrecent listrelated">
                            {
                                this.renderRecommendedItem()
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderError() {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 50
            }}>
                <span>Oops, Maybe this post has been deleted or not exists! <a
                    href={"/"}>Let's recover the others...</a></span>
            </div>
        )
    }

    render() {
        return (
            <div>
                {
                    this.state.loading &&
                    <ProgressBar
                        percent={this.state.percent}
                        autoIncrement
                        spinner="right"
                    />
                }
                {
                    this.renderContent()
                }
            </div>
        );
    }
}
