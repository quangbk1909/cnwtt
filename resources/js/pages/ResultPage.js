import React, {Component} from 'react'
import {withRouter} from 'react-router'
import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'
import PostItemLarge from "../components/PostItemLarge";
import PostItemSmall from "../components/PostItemSmall";
import AuthorItem from "../components/AuthorItem";
import API from '../Services/API'
import ProgressBar from "react-progress-bar-plus";

class ResultPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: props.location.search.substr(6, props.location.search.length),
            posts: [],
            authors: [],
            percent: 0,
            loading: false
        }
    }

    componentDidMount() {
        this.search();
        console.log('component did mount')
    }

    search() {
        this.setState({loading: true});
        API.search(this.state.keyword).then((posts) => {
            this.setState({posts, percent: 100, loading: false});
        })
    }

    render() {
        console.log('loading', this.state.loading)
        return (
            <div>
                {
                    this.state.loading &&
                    <ProgressBar
                        percent={this.state.percent}
                        autoIncrement
                        spinner="right"
                    />
                }
                <div style={styles.container}>
                    <div style={styles.contentWrapper}>
                        <div style={styles.row}>
                            <header style={styles.heading}>
                                <div>
                                    <input placeholder={this.state.keyword} style={styles.textInput}
                                           onChange={event => {
                                               this.setState({keyword: event.target.value});
                                           }}
                                           onKeyPress={(event) => {
                                               if (event.key === 'Enter') {
                                                   let keyword = this.state.keyword;
                                                   let search = 'text=' + this.state.keyword;
                                                   if (keyword !== '' && ('?' + search) !== this.props.location.search) {
                                                       this.props.history.push({
                                                           pathname: '/search',
                                                           search: 'text=' + this.state.keyword
                                                       });
                                                       this.search()
                                                   }
                                               }
                                           }}
                                           value={this.state.keyword}/>
                                </div>
                            </header>
                        </div>

                        <div style={{display: 'flex', width: '100%'}}>
                            <section style={{display: 'flex', flex: 3, flexDirection: 'column'}}>
                                <span style={styles.title}>STORIES</span>
                                {
                                    this.state.posts.map((item, index) => {
                                        return index === 0 ? <PostItemLarge key={index} data={item}/> : <PostItemSmall key={index} data={item} />
                                    })
                                }
                                {
                                    this.state.posts.length === 0 &&
                                    <span style={{fontSize: 13}}>Oops! Post not found</span>
                                }
                            </section>
                            <section style={{display: 'flex', flex: 1, marginLeft: 30, flexDirection: 'column'}}>
                                <span style={styles.title}>AUTHOR</span>
                                {
                                    this.state.authors.map((item, index) => {
                                        return <AuthorItem key={index}/>
                                    })
                                }
                                {
                                    this.state.authors.length === 0 &&
                                    <span style={{fontSize: 13}}>Oops! Author not found</span>
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ResultPage)

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
