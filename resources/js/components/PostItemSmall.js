import React, {Component} from 'react'
import PropTypes from "prop-types";
import Images from "../Themes/Images";

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
                    <a href={'/post?id=' + data.id}
                          style={{color: 'black', textDecorationColor: 'transparent'}}>
                        <h6 style={{marginBottom: 0}}>{data.title}</h6>
                    </a>
                    <div className="topic-post-content-small" dangerouslySetInnerHTML={{__html: `<span>${data.content}</span>`}}/>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <a href={'/author?id=' + data.user_id}
                              style={{color: 'black', textDecorationColor: 'transparent'}}>
                            <span style={{
                                color: 'rgba(0,0,0,0.54)',
                                fontSize: 12,
                                marginTop: 0
                            }}>New York Times Magazine</span>
                        </a>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <a href={'/post?id=' + data.id}
                          style={{color: 'black', textDecorationColor: 'transparent'}}>
                        <img
                            src={Images.imagePost(data.image_name)}
                            style={{width: '100%', height: 100}}/>
                    </a>
                </div>
            </div>
        );
    }
}

PostItemSmall.propTypes = {
    data: PropTypes.object
};
