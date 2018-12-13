import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CommentItem from "./CommentItem";
import '../App.css'
import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'

export default class CommentView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputComment: ''
        };
        // this.saveComment = this.saveComment.bind(this);
    }

    componentDidMount() {

    }

    updateInputValue(evt) {
        console.log('evt', evt.target.value);
        this.setState({inputComment: evt.target.value});
    }

    saveComment() {
        this.props.saveComment({
            content: this.state.inputComment
        });
        this.setState({inputComment: ''})
    };

    saveReply(reply) {
        this.props.saveComment(reply)
    }

    onKeyPress(evt) {
        if (evt.key === 'Enter') {
            this.saveComment()
        }
    }

    render() {
        let comments = [];
        this.props.comments.map(item => {
            if (item.parent_id === null) {
                comments.push({
                    data: item,
                    reply: []
                })
            }
        });
        comments = comments.map(cmt => {
            let id = cmt.data.id;
            cmt.reply = this.props.comments.filter(item => item.parent_id === id);
            return cmt
        });
        console.log('comments post', comments);

        return (
            <div style={styles.container}>
                <div style={styles.contentWrapper}>
                    <h4>Comment</h4>
                    {
                        comments.map((comment, index) => {
                            return <CommentItem key={index} data={comment.data} reply={comment.reply}
                                                saveComment={(reply) => this.saveReply(reply)}/>
                        })
                    }
                    <div style={{paddingLeft: 0, paddingTop: 5, paddingBottom: 5, display: 'flex', marginBottom: 30}}>
                        <div style={styles.searchContainer}>
                            <div className="form-inline my-2 my-lg-0 comment-box" style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%'
                            }}>
                                <input
                                    className="comment"
                                    name="textSearch" type="text"
                                    placeholder={`Write comment...`}
                                    style={{fontSize: 13, flex: 1}}
                                    value={this.state.inputComment}
                                    onKeyPress={(evt) => this.onKeyPress(evt)}
                                    onChange={event => this.updateInputValue(event)}/>
                                <span className="search-icon" onClick={() => this.saveComment()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none"
                                         stroke={this.state.inputComment !== '' ? '#444' : '#ced4da'}
                                         strokeWidth="2"
                                         strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13" fill="#ced4da"/>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const styles = {
    container: {
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    },
    contentWrapper: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column'
    },
    searchContainer: {
        marginLeft: 15,
        // display: 'flex',
        borderCollapse: 'collapsed',
        flexDirection: 'row',
        flex: 1,
        width: 200
    }
};

CommentView.propTypes = {
    comments: PropTypes.array,
    saveComment: PropTypes.func
};
