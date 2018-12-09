import React, {Component} from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'


import '../CSS/bootstrap.min.css'
import '../CSS/mediumish.css'

export default class CommentItem extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div className="metafooter">
                    <div className="wrapfooter">
						<span className="meta-footer-thumb">
                            <img className="author-thumb"
                                 src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
                                 alt="Sal"/>
						</span>
                        <span className="author-meta">
						        <span className="post-name">
                                    <span>{this.props.data.author_name}</span>
                                </span>
                                <br/>
						        <span className="post-date">{this.props.data.content}</span>
						    </span>
                    </div>
                </div>
                {
                    this.props.reply.map((item, index) => {
                        return (
                            <div style={{paddingLeft: 50, paddingTop: 5, paddingBottom: 5}}>
                                <div className="metafooter" key={index}>
                                    <div className="wrapfooter">
						            <span className="meta-footer-thumb">
                                        {/*<Link to={'author/'}>*/}
                                        <img className="author-thumb"
                                             src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
                                             alt="Sal"/>
                                        {/*</Link>*/}
						            </span>
                                        <span className="author-meta">
						                <span className="post-name">
                                            {/*<Link to={'/Author/'}>*/}
                                            <span>{item.author_name}</span>
                                            {/*</Link>*/}
                                        </span>
                                        <br/>
						                <span className="post-date">{item.content}</span>
						            </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const styles = {
    container: {
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 15
    },
    commentsSection: {},
    commentsSectionImage: {
        marginTop: "3px"
    },
    commentAdd: {},
    commentContent: {}


};

CommentItem.propTypes = {
    data: PropTypes.object,
    reply: PropTypes.array,
    isParent: PropTypes.bool
};
