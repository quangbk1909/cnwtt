import React, {Component} from 'react'
import {Link} from "react-router-dom";

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'

export default class TopicPage extends Component {

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.contentWrapper}>
                    <section style={styles.mainContent}>
                        <p style={{color: 'black', fontWeight: '600'}}>FEATURED</p>
                        <div>
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <Link to={'/post/1'}>
                                    <a>
                                        <img src={'https://miro.medium.com/max/1360/1*lwA85Zar22pq4lHmjgS9iw.jpeg'}
                                             style={{width: '100%', height: 400}}/>
                                    </a>
                                </Link>


                                <h2>
                                    <Link to={'/post/1'} style={{color: 'black', textDecorationColor: 'transparent'}}>
                                        <span>My Uncomfortable Evening Playing ‘Secret Hitler’</span>
                                    </Link>
                                </h2>
                                <p>The popular party game is heavy on guilt, judgment, and blind allegiance</p>
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
                        </div>
                        <div className="section-title" style={{marginTop: 50}}>
                            <h5>
                                <span>Latest</span>
                            </h5>
                        </div>
                        <div style={{width: '100%'}}>
                            {
                                [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1].map((item, index) => {
                                    return (
                                        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flex: 3,
                                                marginBottom: 20
                                            }} key={index}>
                                                <Link to={'/post/1'}
                                                      style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                    <h6 style={{marginBottom: 0}}>Letter of Recommendation:
                                                        Nail-Biting</h6>
                                                </Link>
                                                <p style={{color: 'rgba(0,0,0,0.54)', marginBottom: 0}}>It’s meditative,
                                                    deeply
                                                    human and far less gross than commonly imagined</p>
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    <Link to={'/author/1'}
                                                          style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                        <span style={{
                                                            color: 'rgba(0,0,0,0.54)',
                                                            fontSize: 12,
                                                            marginTop: 0
                                                        }}>New York Times Magazine   </span>
                                                    </Link>
                                                    <span className="dot"/>
                                                    <span
                                                        style={{
                                                            color: 'rgba(0,0,0,0.54)',
                                                            fontSize: 12
                                                        }}>4 min read</span>
                                                </div>
                                            </div>
                                            <div style={{flex: 1}}>
                                                <Link to={'/post/1'}
                                                      style={{color: 'black', textDecorationColor: 'transparent'}}>
                                                    <img
                                                        src={'https://miro.medium.com/max/320/1*R_148RUf_824I3KD58sZDw.jpeg'}
                                                        style={{width: '100%', height: 100}}/>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                    <section style={styles.rightContent}>
                        <h3>Culture</h3>
                        High, low, and sideways.
                        <div className="section-title" style={{marginTop: 50}}>
                            <h6>
                                <span>RELATED TOPICS</span>
                            </h6>
                        </div>
                        {
                            ['Food', 'Tech', 'Heath', 'More'].map((item, index) => {
                                return (
                                    <Link to={'/'} style={{
                                        textDecorationColor: 'transparent',
                                        color: 'rgba(0,0,0,0.54)',
                                        fontSize: 14,
                                        marginBottom: 5
                                    }}><span key={index}>{item.toUpperCase()}</span></Link>
                                )
                            })
                        }

                        <div className="section-title" style={{marginTop: 50}}>
                            <h6>
                                <span>POPULAR TOPICS</span>
                            </h6>
                        </div>

                        {
                            [1, 2, 3, 5].map((item, index) => {
                                return (
                                    <Link to={'/post/1'} style={{color: 'black', textDecorationColor: 'transparent'}}>
                                        <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
                                            <div style={{display: 'flex', flexDirection: 'column', flex: 4}}>
                                                <span style={{fontWeight: '600'}}>Relax, Ladies. Don’t Be So Uptight. You Know You Want It</span>
                                                <span
                                                    style={{
                                                        fontSize: 13,
                                                        color: 'rgba(0,0,0,0.84)'
                                                    }}>10 minute read</span>
                                            </div>
                                            <div style={{flex: 1}}>
                                                <a>
                                                    <img
                                                        src={'https://miro.medium.com/max/110/1*QjBLlFPJ4vZAlWfa0G_eng.jpeg'}
                                                        style={{width: 50, height: 50}}/>
                                                </a>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </section>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    contentWrapper: {
        display: 'flex',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainContent: {
        display: 'flex',
        width: '60%',
        flexDirection: 'column'
    },
    rightContent: {
        display: 'flex',
        width: '30%',
        flexDirection: 'column'
    }
};
