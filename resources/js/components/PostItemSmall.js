import React, {Component} from 'react'

import {
    Link
} from 'react-router-dom'

export default class PostItemSmall extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 3,
                    marginBottom: 20
                }}>
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
        );
    }

}
