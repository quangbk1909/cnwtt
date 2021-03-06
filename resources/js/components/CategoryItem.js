import React, {Component} from 'react'

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
        // axios.get('http:127.0.0.1:8000/api/blog/author/getAuthorByID?id=13')
        // .then(response=>{
        //     this.setState({categoryPost:response.data});
        // });
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
                <a href={`/topic?id=${item.id}`} style={styles.category}>
                    <span
                        style={linkStyle}
                        onMouseOver={this.toggleHover}
                        onMouseOut={this.toggleHover}>{item.name.toUpperCase()}</span>
                </a>
                <table>
                    {
                        this.state.categoryPost.map(post=>{
                            return (
                                <tr>t
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
