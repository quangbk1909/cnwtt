import React, {Component} from 'react'
import {Link} from "react-router-dom";

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'

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
                        <section style={{display: 'flex', flex: 2, flexDirection: 'column'}}>
                            <span>STORIES</span>
                            {
                                [1, 2, 3].map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                    <span className="meta-footer-thumb">
                                        <Link to={'/author/1'}>
								            <a>
                                                <img className="author-thumb"
                                                     src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x"
                                                     alt="Sal"/>
                                            </a>
                                        </Link>
								    </span>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                        <span style={{display: 'flex', flexDirection: 'column'}}>
								            <span className="post-name">
                                                <Link to={'/Author/1'}>
                                                    <h6 style={{marginBottom: 0}}>Than Thai</h6>
                                                </Link>
                                            </span>
                                            <div>
                                                <span style={{marginTop: 0}}>20/10</span>
                                                <span className="dot"/>
                                                <span>6 min read</span>
                                            </div>
								        </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                        <section style={{display: 'flex', flex: 1}}>

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
    }
};
