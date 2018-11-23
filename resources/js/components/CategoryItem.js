import React, {Component} from 'react'
import {Link} from "react-router-dom";

import PropTypes from 'prop-types'

export default class CategoryItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };

        this.toggleHover = this.toggleHover.bind(this);
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
