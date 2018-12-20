import React, {Component} from 'react'
import Images from "../Themes/Images";
import Colors from "../Themes/Colors";
import PropTypes from 'prop-types'


export default class AuthorItem extends Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={styles.container}>
                <img style={styles.avatar} src={Images.avatar(this.props.data.avatar)} alt=""/>
                <div>
                    <a href={'/author?id=' + this.props.data.user_id} style={styles.authorNameWrapper}>
                        <h3 style={styles.authorName}>{this.props.data.author_name}</h3>
                    </a>
                    <span style={styles.authorDescription}>{this.props.data.description}</span>
                </div>
            </div>
        );
    }

}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginRight: 15
    },
    authorBox: {
        display: 'flex',
        flexDirection: 'column'
    },
    authorNameWrapper: {
       color: Colors.text.black,
        textDecorationColor: Colors.transparent
    },
    authorName: {
        fontFamily: 'Lucida Grande',
        fontSize: 24
    },
    authorDescription: {
        fontFamily: 'Lucida Grande',
        fontSize: 14,
        marginTop: 10,
        color: Colors.text.black64
    }
};

AuthorItem.propTypes = {
    data: PropTypes.object
};
