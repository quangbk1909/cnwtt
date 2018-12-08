import React, {Component} from 'react'

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'


import PropTypes from 'prop-types'

import moment from 'moment'
import {Link} from "react-router-dom";
import Images from "../Themes/Images";

export default class StoryItem extends Component {
    post_id: any;
    date_created: any;
    author_id: any;
    author_name: any;
    render() {

        const data = this.props.data;
        const createDate = data.createdDate;
        // let dateStr = moment(createDate).format('DD MMM YYYY');
        let dateStr = moment(data.date_created.date).format('DD MMM YYYY');

        return (
            <div className="card">
                <Link to={'/Post/' + data.post_id}>
                    <a>
                        <img className="img-fluid" src={Images.demopic.img10} alt=""/>
                    </a>
                </Link>
                <div className="card-block">
                    <h2 className="card-title">
                        <Link to={'/Post/' + data.post_id}>
                            <a>{data.title}</a>
                        </Link>
                    </h2>
                    <h4 className="card-text">{data.content}</h4>
                    <div className="metafooter">
                        <div className="wrapfooter">
						<span className="meta-footer-thumb">
                            <Link to={'author/' + data.author_id}>
                                <a>
                                    <img className="author-thumb"
                                         src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
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
                                <Link to={'/Post/' + data.post_id}>
                                <a title="Read Story">
                                    <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                        <path
                                            d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd">
                                        </path>
                                    </svg>
                                </a>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StoryItem.propTypes = {
    data: PropTypes.object
};
