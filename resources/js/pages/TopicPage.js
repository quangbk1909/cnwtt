import React, {Component} from 'react'
import {Link} from "react-router-dom";

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'
import ProgressBar from "react-progress-bar-plus";
import API from "../Services/API";
import moment from "moment";

export default class TopicPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            percent: 0,
            relatedCategories: [],
            popularTopics: []
        }
    }

    componentDidMount() {
        API.getPostByCategory('', (result) => {
            this.setState({data: result, percent: 100});
        }, (error) => {

        });

        API.getAllPosts((result) => {
            this.setState({popularTopics: result});
        }, (error) => {

        });

        API.getAllCategories((result) => {
            this.setState({relatedCategories: result.length < 6 ? result : result.slice(0, 6), percent: 100})
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
        return this.state.data.length === 0 ? this.renderEmptyPage() : this.renderContent()
    }

    renderContent() {
        let firstItem = this.state.data[0];
        let firstItemContent = firstItem.content.length > 200 ? firstItem.content.substr(0, 250) + '...' : firstItem.content;
        return (
            <div style={styles.contentWrapper}>
                <section style={styles.mainContent}>
                    <p style={{color: 'black', fontWeight: '600'}}>FEATURED</p>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Link to={'/post/' + firstItem.post_id}>
                                <a>
                                    <img src={'https://miro.medium.com/max/1360/1*lwA85Zar22pq4lHmjgS9iw.jpeg'}
                                         style={{width: '100%', height: 400}}/>
                                </a>
                            </Link>


                            <h2>
                                <Link to={'/post/' + firstItem.post_id} style={{color: 'black', textDecorationColor: 'transparent'}}>
                                    <span>{firstItem.title}</span>
                                </Link>
                            </h2>
                            <p>{firstItemContent}</p>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                    <span className="meta-footer-thumb">
                                        <Link to={'/author/' + firstItem.user_id}>
								            <a>
                                                <img className="author-thumb"
                                                     src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
                                                     alt="Sal"/>
                                            </a>
                                        </Link>
								    </span>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                        <span style={{display: 'flex', flexDirection: 'column'}}>
								            <span className="post-name">
                                                <Link to={'/Author/' + firstItem.user_id}>
                                                    <h6 style={{marginBottom: 0}}>Than Thai</h6>
                                                </Link>
                                            </span>
                                            <div>
                                                <span style={{marginTop: 0}}>{moment(firstItem.created_at).format('DD MMM YYYY')}</span>
                                                {/*<span className="dot"/>*/}
                                                {/*<span>6 min read</span>*/}
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
                                let itemContent = item.content.length > 100 ? item.content.substr(0, 100) + '...' : item.content;
                                return (
                                    <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 3,
                                            marginBottom: 20
                                        }} key={index}>
                                            <Link to={'/post/' + item.post_id}
                                                  style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                <h6 style={{marginBottom: 0}}>{item.title}</h6>
                                            </Link>
                                            <p style={{color: 'rgba(0,0,0,0.54)', marginBottom: 0}}>{itemContent}</p>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <Link to={'/author/' + item.user_id}
                                                      style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                        <span style={{
                                                            color: 'rgba(0,0,0,0.54)',
                                                            fontSize: 12,
                                                            marginTop: 0
                                                        }}>New York Times Magazine</span>
                                                </Link>
                                                {/*<span className="dot"/>*/}
                                                {/*<span*/}
                                                    {/*style={{*/}
                                                        {/*color: 'rgba(0,0,0,0.54)',*/}
                                                        {/*fontSize: 12*/}
                                                    {/*}}>4 min read</span>*/}
                                            </div>
                                        </div>
                                        <div style={{flex: 1}}>
                                            <Link to={'/post/' + item.post_id}
                                                  style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                <img
                                                    src={'https://miro.medium.com/max/320/1*R_148RUf_824I3KD58sZDw.jpeg'}
                                                    style={{width: '100%', height: 100}}/>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <section style={styles.rightContent}>
                    <h3>Culture</h3>
                    High, low, and sideways.
                    <div className="section-title" style={{marginTop: 50}}>
                        <h6>
                            <span>RELATED TOPICS</span>
                        </h6>
                    </div>
                    {
                        this.state.relatedCategories.map((item, index) => {
                            return (
                                <Link to={'/'} style={{
                                    textDecorationColor: 'transparent',
                                    color: 'rgba(0,0,0,0.54)',
                                    fontSize: 14,
                                    marginBottom: 5
                                }}><span key={index}>{item.name.toUpperCase()}</span></Link>
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
                                <Link to={'/post/' + item.post_id} style={{color: 'black', textDecorationColor: 'transparent'}} key={index}>
                                    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
                                        <div style={{display: 'flex', flexDirection: 'column', flex: 4}}>
                                            <span style={{fontWeight: '600'}}>{item.title}</span>
                                            <span
                                                style={{
                                                    fontSize: 13,
                                                    color: 'rgba(0,0,0,0.84)'
                                                }}>{item.content.length < 30 ? item.content : item.content.slice(0, 30) + '...'}</span>
                                        </div>
                                        <div style={{flex: 1}}>
                                            <a>
                                                <img
                                                    src={'https://miro.medium.com/max/110/1*QjBLlFPJ4vZAlWfa0G_eng.jpeg'}
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
