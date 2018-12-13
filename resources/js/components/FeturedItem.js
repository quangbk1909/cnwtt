import React, {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import PropTypes from 'prop-types'

import moment from 'moment'
import Images from "../Themes/Images";
import '../CSS/mediumish.css'
import '../App.css'

export default class FeturedItem extends Component {
    render() {

        const data = this.props.data;
        let dateStr = moment(data.date_created.date).format('DD MMM YYYY');


        let content = data.content;
        if (content.length > 150) {
            content = content.substr(0, 147) + '...';
        }

        return (
            <div className="card">
                <div className="row" style={{flexWrap: 'wrap'}}>
                    <div className="col-md-5 wrapthumbnail">
                        <a href={'/post?id=' + data.post_id}>
                            <img className="thumbnail"
                                 src={Images.imagePost(data.image_post)}
                                 // src={Images.demopic.img7}
                                 style={{width: '100%', height: '100%'}}/>
                        </a>
                    </div>
                    <div className="col-md-7">
                        <div className="card-block">
                            <h2 className="card-title">
                                <a href={'/post?id=' + data.post_id}
                                   style={{marginRight: 0, textDecorationColor: 'transparent'}}>
                                    <span className="title-post-feature">{data.title}</span>
                                </a>
                            </h2>
                            {/*<h4 className="card-text">{content}</h4>*/}
                            <div className="content-post-feature" dangerouslySetInnerHTML={{__html: `<span>${data.content}</span>`}}/>
                            <div className="metafooter">
                                <div className="wrapfooter">
								<span className="meta-footer-thumb">
                                    <a href={'/author?id=' + data.author_id}>
                                        <img className="author-thumb"
                                             src={Images.avatar(data.avatar)}
                                             alt="Sal"/>
                                    </a>
								</span>
                                    <span className="author-meta">
								        <span className="post-name">
                                            <a href={'/author?id=' + data.author_id}>
                                                <span>{data.author_name}</span>
                                            </a>
                                        </span>
                                        <br/>
								        <span className="post-date">{dateStr}</span>
								    </span>
                                    <span className="post-read-more">
                                        <a href={'/post?id=' + data.post_id}>
                                        <span title="Read Story">
                                            <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                                <path
                                                    d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"
                                                    fillRule="evenodd"/>
                                            </svg>
                                        </span>
                                        </a>
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

FeturedItem.propTypes = {
    data: PropTypes.object
};
