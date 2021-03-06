import React, {Component} from 'react'
import Images from "../Themes/Images";

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'

import PropTypes from 'prop-types';

export default class AuthorPost extends Component {
    render() {
        return (
            <div className="authorpostbox">
                <div className="card">
                    <a href={'/post?id=' + this.props.data.id}>
                        <img className="img-fluid img-thumb" src={Images.imagePost(this.props.data.image_name)}
                             alt=""/>
                    </a>
                    <div className="card-block">
                        <h2 className="card-title">
                            <a href={'/post?id=' + this.props.data.id}>
                                <span>{this.props.data.title}</span>
                            </a>
                        </h2>
                        <div className="author-post-content" dangerouslySetInnerHTML={{__html: `<span>${this.props.data.content}</span>`}}/>
                        <a href={'/post?id=' + this.props.data.id}>Read more</a>
                        {/*<div className="metafooter">*/}
                            {/*<div className="wrapfooter">*/}
                                {/*<span className="meta-footer-thumb">*/}
                                    {/*<a href="">*/}
                                        {/*<img className="author-thumb"*/}
                                             {/*src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"*/}
                                             {/*alt="Sal"/>*/}
                                    {/*</a>*/}
                                {/*</span>*/}
                                {/*<span className="author-meta">*/}
                                    {/*<span className="post-name">*/}
                                        {/*<a href={'/author?id=' + this.props.author.id}>{this.props.author.author_name}</a>*/}
                                    {/*</span>*/}
                                    {/*<br/>*/}
                                    {/*<span className="post-date">22 July 2017</span>*/}
                                    {/*<span className="dot"/>*/}
                                {/*</span>*/}
                                {/*<span className="post-read-more">*/}
                                    {/*<a href={'/post?id=' + this.props.data.id} title="Read Story">*/}
                                        {/*<svg className="svgIcon-use" width="25" height="25"*/}
                                             {/*viewBox="0 0 25 25">*/}
                                            {/*<path*/}
                                                {/*d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"*/}
                                                {/*fillRule="evenodd"/>*/}
                                        {/*</svg>*/}
                                    {/*</a>*/}
                                {/*</span>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

AuthorPost.propTypes = {
    data: PropTypes.object,
    author: PropTypes.object
};
