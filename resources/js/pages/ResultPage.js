import React, {Component} from 'react'
import {Link} from "react-router-dom";

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'
import PostItemLarge from "../components/PostItemLarge";
import PostItemSmall from "../components/PostItemSmall";
import AuthorItem from "../components/AuthorItem";

export default class ResultPage extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.contentWrapper}>
                    <div style={styles.row}>
                        <header style={styles.heading}>
                            <form>
                                <input placeholder={'android'} style={styles.textInput}/>
                            </form>
                        </header>
                    </div>

                    <div style={{display: 'flex', width: '100%'}}>
                        <section style={{display: 'flex', flex: 3, flexDirection: 'column'}}>
                            <span style={styles.title}>STORIES</span>
                            {
                                [1, 2, 3].map((item, index) => {
                                    return index === 0 ? <PostItemLarge key={index}/> : <PostItemSmall key={index}/>
                                })
                            }
                        </section>
                        <section style={{display: 'flex', flex: 1, marginLeft: 30, flexDirection: 'column'}}>
                            <span style={styles.title}>AUTHOR</span>
                            {
                                [1,2,3].map((item, index) => {
                                    return <AuthorItem key={index}/>
                                })
                            }
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        paddingRight: 20,
        paddingLeft: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItem: 'center',
        display: 'flex'
    },
    contentWrapper: {
        width: '80%',
    },
    row: {
        marginRight: -20,
        marginLeft: -20,
        paddingBottom: 40
    },
    heading: {
        color: 'rgba(0, 0, 0, .84)',
        fontSize: 18,
        letterSpacing: 0,
        position: 'relative'
    },
    textInput: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.15)',
        outline: 0,
        width: '100%',
        fontWeight: '300',
        fontStyle: 'normal',
        fontSize: 52
    },
    title: {
        marginBottom: 10
    }
};
