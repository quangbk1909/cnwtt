import React, {Component} from 'react'
import {Link} from "react-router-dom";

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'
import ProgressBar from "react-progress-bar-plus";
import API from "../Services/API";
import moment from "moment";
import Images from "../Themes/Images";

export default class TopicPage extends Component {

    constructor(props) {
        super(props);
        this.id = props.location.search.substring(4, props.location.search.length);
        this.state = {
            data: null,
            percent: 0,
            relatedCategories: [],
            popularTopics: [],
            description: null
        };
        console.log('id', props.location.search.substring(4, props.location.search.length));

    }

    componentDidMount() {
        API.getNewestPost(this.id, (result) => {
            this.setState({data: result, percent: 100});
        }, (error) => {

        });

        API.getPopularPost(this.id, (result) => {
            this.setState({popularTopics: result});
            console.log('res', result)

        }, (error) => {

        });

        API.getAllCategories((result) => {
            this.setState({relatedCategories: result.length < 6 ? result : result.slice(0, 6), percent: 100})
        }, (error) => {

        });

        API.get('/api/blog/category/description/' + this.id, {}, (result) => {
            console.log('res des', result);
            this.setState({description: result})
        }, (error) => {

        })
    }


    render() {
        return (
            <div style={styles.container}>
                {
                    this.state.data ? this.renderPage() : this.renderProgressBar()
                }
            </div>
        );
    }

    renderProgressBar() {
        return (
            <div>
                <ProgressBar
                    percent={this.state.percent}
                    autoIncrement
                    spinner="right"
                />
            </div>
        )
    }

    renderPage() {
        console.log('posts', this.state.data);
        return this.state.data.length === 0 ? this.renderEmptyPage() : this.renderContent()
    }

    renderContent() {
        let firstItem = this.state.data[0] || {
            id: 11,
            title: 'title4',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            status: 1,
            vote_numbers: 0,
            visibility: 0,
            image_path: 'assets/img/img_post/',
            image_name: 'img_4',
            user_id: 31,
            created_at: '2018-07-18 17:05:28',
            updated_at: '2018-07-18 17:06:02'
        };
        return (
            <div style={styles.contentWrapper}>
                <section style={styles.mainContent}>
                    <p style={{color: 'black', fontWeight: '600'}}>FEATURED</p>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <a href={'/post?id=' + firstItem.post_id}>
                                <img src={Images.imagePost(firstItem.image_post)}
                                     style={{width: '100%', height: 400}}/>
                            </a>


                            <h2>
                                <a href={'/post?id=' + firstItem.post_id}
                                   style={{color: 'black', textDecorationColor: 'transparent'}}>
                                    <span>{firstItem.title}</span>
                                </a>
                            </h2>
                            <div className="topic-post-content" dangerouslySetInnerHTML={{__html: `<span>${firstItem.content}</span>`}}/>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span className="meta-footer-thumb">
                                    <a href={'/author?id=' + firstItem.author_id}>
                                        <img className="author-thumb"
                                             src={Images.avatar(firstItem.avatar)}
                                             alt="Sal"/>
                                    </a>
                                </span>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                        <span style={{display: 'flex', flexDirection: 'column'}}>
								            <span className="post-name">
                                                <a href={'/author?id=' + firstItem.author_id}>
                                                    <h6 style={{marginBottom: 0}}>{firstItem.author_name}</h6>
                                                </a>
                                            </span>
                                            <div>
                                                <span
                                                    style={{marginTop: 0}}>{moment(firstItem.created_at).format('DD MMM YYYY')}</span>
                                            </div>
								        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-title" style={{marginTop: 50}}>
                        <h5>
                            <span>Latest</span>
                        </h5>
                    </div>
                    <div style={{width: '100%'}}>
                        {
                            this.state.data.slice(1, this.state.data.length).map((item, index) => {
                                return (
                                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 3,
                                            marginBottom: 20
                                        }} key={index}>
                                            <a href={'/post?id=' + item.post_id}
                                               style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                <h6 style={{marginBottom: 0}}>{item.title}</h6>
                                            </a>
                                            <div className="topic-post-content-small" dangerouslySetInnerHTML={{__html: `<span>${firstItem.content}</span>`}}/>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <a href={'/author?id=' + item.author_id}
                                                   style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                        <span style={{
                                                            color: 'rgba(0,0,0,0.54)',
                                                            fontSize: 12,
                                                            marginTop: 0
                                                        }}>{item.author_name}</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div style={{flex: 1}}>
                                            <a href={'/post?id=' + item.post_id}
                                               style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                <img
                                                    src={Images.imagePost(item.image_post)}
                                                    style={{width: '100%', height: 100}}/>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <
                    section
                    style={styles.rightContent
                    }>
                    <h3> {this.state.description ? this.state.description.name : ''}</h3>
                    High, low, and
                    sideways.
                    <div className="section-title" style={{marginTop: 50}}>
                        <h6>
                            <span>RELATED TOPICS</span>
                        </h6>
                    </div>
                    {
                        this.state.relatedCategories.map((item, index) => {
                            return (
                                <a href={'/topic?id=' + item.id} style={{
                                    textDecorationColor: 'transparent',
                                    color: 'rgba(0,0,0,0.54)',
                                    fontSize: 14,
                                    marginBottom: 5
                                }}><span key={index}>{item.name.toUpperCase()}</span></a>
                            )
                        })
                    }

                    <div className="section-title" style={{marginTop: 50}}>
                        <h6>
                            <span>POPULAR TOPICS</span>
                        </h6>
                    </div>

                    {
                        this.state.popularTopics.map((item, index) => {
                            return (
                                <Link to={'/post?id=' + item.post_id}
                                      style={{color: 'black', textDecorationColor: 'transparent'}} key={index}>
                                    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', flex: 4}}>
                                            <span className="topic-post-title-popular" style={{fontWeight: '600'}}>{item.title}</span>
                                            {/*<span*/}
                                                {/*style={{*/}
                                                    {/*fontSize: 13,*/}
                                                    {/*color: 'rgba(0,0,0,0.84)'*/}
                                                {/*}}>{item.content.length < 30 ? item.content : item.content.slice(0, 30) + '...'}</span>*/}
                                            <div className="topic-post-content-popular" dangerouslySetInnerHTML={{__html: `<span>${firstItem.content}</span>`}}/>
                                        </div>
                                        <div style={{flex: 1}}>
                                            <a>
                                                <img
                                                    src={Images.imagePost(item.image_post)}
                                                    style={{width: 50, height: 50}}/>
                                            </a>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </section>
            </div>
        )
    }

    renderEmptyPage() {
        return (
            <div>
                Sorry, something wrong!
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    contentWrapper: {
        display: 'flex',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainContent: {
        display: 'flex',
        width: '60%',
        flexDirection: 'column'
    },
    rightContent: {
        display: 'flex',
        width: '30%',
        flexDirection: 'column'
    }
};
