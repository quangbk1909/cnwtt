import React, {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import PropTypes from 'prop-types'

import moment from 'moment'
import {Link} from "react-router-dom";
import Images from "../Themes/Images";

export default class FeturedItem extends Component {
    render() {

        const data = this.props.data;
        const createDate = data.createdDate;
        let dateStr = moment(data.date_created.date).format('DD MMM YYYY');


        let content = data.content;
        if (content.length > 150) {
            content = content.substr(0, 147) + '...';
        }

        return (
            <div className="card">
                <div className="row" style={{flexWrap: 'wrap'}}>
                    <div className="col-md-5 wrapthumbnail">
                        <Link to={{pathname: '/post/' + data.post_id}}>
                            <a>
                                <img className="thumbnail" src={Images.demopic.img10} style={{width: 200, height: '100%'}}/>
                            </a>
                        </Link>
                    </div>
                    <div className="col-md-7">
                        <div className="card-block">
                            <h2 className="card-title">
                                <Link to={{pathname: '/post/' + data.post_id}}
                                      style={{marginRight: 20, textDecorationColor: 'transparent'}}>
                                    <span>{data.title}</span>
                                </Link>
                            </h2>
                            <h4 className="card-text">{content}</h4>
                            <div className="metafooter">
                                <div className="wrapfooter">
								<span className="meta-footer-thumb">
                                    <Link to={'/Author/' + data.author_id}>
								        <a>
                                            <img className="author-thumb"
                                                 src={Images.demopic.img7}
                                                 alt="Sal"/>
                                        </a>
                                    </Link>
								</span>
                                    <span className="author-meta">
								        <span className="post-name">
                                            <Link to={'/Author/' + data.author_id}>
                                                <span>{data.author_name}</span>
                                            </Link>
                                        </span>
                                        <br/>
								        <span className="post-date">{dateStr}</span>
                                        {/*<span className="dot"/>*/}
                                        {/*<span className="post-read">6 min read</span>*/}
								    </span>
                                    <span className="post-read-more">
                                        <Link to={'/post/' + data.author_id}>
                                        <a title="Read Story">
                                            <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                                <path
                                                    d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"/>
                                            </svg>
                                        </a>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    thumbnail: {
        backgroundImage: 'background-image:url(assets/img/demopic/1.jpg)'
    }
};

FeturedItem.propTypes = {
    data: PropTypes.object
};
