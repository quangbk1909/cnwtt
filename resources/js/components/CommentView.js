import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CommentItem from "./CommentItem";

export default class CommentView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

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
        console.log('comments post', comments)

        return (
            <div style={styles.container}>
                <div style={styles.contentWrapper}>
                    <h4>Comment</h4>
                    {
                        comments.map((comment, index) => {
                            return <CommentItem key={index} data={comment.data} reply={comment.reply}/>
                        })
                    }
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
        alignItems: 'center'
    },
    contentWrapper: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column'
    }
};

CommentView.propTypes = {
    comments: PropTypes.array
};
