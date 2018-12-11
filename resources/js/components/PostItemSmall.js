import React, {Component} from 'react'

import {
    Link
} from 'react-router-dom'
import PropTypes from "prop-types";
import PostItemLarge from "./PostItemLarge";

export default class PostItemSmall extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {data} = this.props;
        let content = data.content.length < 100 ? data.content : (data.content.substr(0, 100) + '...');
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
                        <h6 style={{marginBottom: 0}}>{data.title}</h6>
                    </Link>
                    <p style={{color: 'rgba(0,0,0,0.54)', marginBottom: 0}}>{content}</p>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Link to={'/author/1'}
                              style={{color: 'black', textDecorationColor: 'transparent'}}>
                            <span style={{
                                color: 'rgba(0,0,0,0.54)',
                                fontSize: 12,
                                marginTop: 0
                            }}>New York Times Magazine</span>
                        </Link>
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

PostItemSmall.propTypes = {
    data: PropTypes.object
};
