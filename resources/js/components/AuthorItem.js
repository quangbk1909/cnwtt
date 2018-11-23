import React, {Component} from 'react'
import Images from "../Themes/Images";
import Colors from "../Themes/Colors";

import {
    Link
} from 'react-router-dom'


export default class AuthorItem extends Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={styles.container}>
                <img style={styles.avatar} src={Images.demopic.img10} alt=""/>
                <div>
                    <Link to={'/author/1'} style={styles.authorNameWrapper}>
                        <h3 style={styles.authorName}>Android developer</h3>
                    </Link>
                    <span style={styles.authorDescription}>News and announcements for developers from the Android team.</span>
                </div>
            </div>
        );
    }

}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row'
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
