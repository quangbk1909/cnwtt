import React, {Component} from 'react'
import PropTypes from 'prop-types'


import '../CSS/bootstrap.min.css'
import '../CSS/mediumish.css'
import '../App.css'
import Images from "../Themes/Images";

export default class CommentItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputComment: ''
        }
    }

    updateInputValue(evt) {
        this.setState({inputComment: evt.target.value});
    }

    saveComment() {
        this.props.saveComment({
            parent_id: this.props.data.id,
            content: this.state.inputComment
        });
        this.setState({inputComment: ''})
    }

    onKeyPress(evt) {
        if (evt.key === 'Enter') {
            this.saveComment()
        }
    }


    render() {
        return (
            <div style={styles.container}>
                <div className="metafooter">
                    <div className="wrapfooter">
						<span className="meta-footer-thumb">
                            <img className="author-thumb"
                                 src={Images.avatar(this.props.data.avatar)}
                                 alt="Sal"/>
						</span>
                        <span className="author-meta">
						        <span className="post-name">
                                    <span>{this.props.data.author}</span>
                                </span>
                                <br/>
						        <span className="post-date">{this.props.data.content}</span>
						    </span>
                    </div>
                </div>
                {
                    this.props.reply.map((item, index) => {
                        return (
                            <div style={{paddingLeft: 50, paddingTop: 5, paddingBottom: 5}} key={index}>
                                <div className="metafooter" key={index}>
                                    <div className="wrapfooter">
						            <span className="meta-footer-thumb">
                                        {/*<Link to={'author/'}>*/}
                                        <img className="author-thumb"
                                             src={Images.avatar(item.avatar)}
                                             alt="Sal"/>
                                        {/*</Link>*/}
						            </span>
                                        <span className="author-meta">
						                <span className="post-name">
                                            {/*<Link to={'/Author/'}>*/}
                                            <span>{item.author}</span>
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
                <div style={{paddingLeft: 40, paddingTop: 5, paddingBottom: 5, display: 'flex'}}>
                    <div style={styles.searchContainer}>
                        <div className="comment-box-small" style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                            <input className="comment" name="textSearch" type="text"
                                   placeholder={`Reply ${this.props.data.author}`}
                                   style={{fontSize: 13, flex: 1, paddingTop: 2, paddingBottom: 2}}
                                   value={this.state.inputComment}
                                   onKeyPress={(evt) => this.onKeyPress(evt)}
                                   onChange={event => this.updateInputValue(event)}/>
                            <span className="search-icon" onClick={() => this.saveComment()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke={this.state.inputComment !== '' ? '#444' : '#ced4da'}
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="feather feather-send">
                                    <line x1="22" y1="2" x2="11" y2="13"/>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
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
    commentContent: {},
    searchContainer: {
        marginLeft: 15,
        // display: 'flex',
        borderCollapse: 'collapsed',
        flexDirection: 'row',
        flex: 1,
        width: 200
    }


};

CommentItem.propTypes = {
    data: PropTypes.object,
    reply: PropTypes.array,
    isParent: PropTypes.bool,
    saveComment: PropTypes.func
};
