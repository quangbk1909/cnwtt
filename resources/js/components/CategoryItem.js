import React, {Component} from 'react'
import {Link} from "react-router-dom";

import PropTypes from 'prop-types'

export default class CategoryItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            categoryPost:[]
        };

        this.toggleHover = this.toggleHover.bind(this);
    }

    componentDidMount(){
        axios.get('http:127.0.0.1:8000/api/blog/author/getAuthorByID?id=13')
        .then(response=>{
            this.setState({categoryPost:response.data});
        });
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    };

    render() {
        let item = this.props.data;
        let linkStyle;
        if (this.state.hover) {
            linkStyle = {color: 'black'}
        }
        return (
            <div>
                <Link to={item.link} style={styles.category}>
                    <span
                        style={linkStyle}
                        onMouseOver={this.toggleHover}
                        onMouseOut={this.toggleHover}
                        onMouseUp={this.toggleActive}
                        onMouseDown={this.toggleActive}
                        onFocus={this.toggleFocus}>{item.title.toUpperCase()}</span>
                </Link>
                <table>
                    {
                        this.sate.categoryPost.map(post=>{
                            return (
                                <tr>
                                    <td>{post.user_id}</td>
                                    <td>{post.name}</td>
                                </tr>
                            )
                        })
                    }
                </table>

            </div>
        );
    }
}

const styles = {
    category: {
        textDecorationColor: 'transparent',
        color: 'rgba(0,0,0,.54)',
        fontFamily: 'Lucida Grande'
    }
};

CategoryItem.propTypes = {
    data: PropTypes.object.isRequired
};
