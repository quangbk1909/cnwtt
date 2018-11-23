import React, {Component} from 'react'
import FeturedItem from "../components/FeturedItem";

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'
import Images from "../Themes/Images";
import StoryItem from "../components/StoryItem";

import {
    Link
} from 'react-router-dom'
import CategoryItem from "../components/CategoryItem";

import api from '../Services/API'

const featuredItems = [
    {
        imageSource: Images.demopic.img7,
        title: 'The beauty of this world is in your heart',
        shortDescription: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        author: {
            avatar: '',
            name: 'Than Thai',
            createdDate: new Date()
        }
    },
    {
        imageSource: Images.demopic.img7,
        title: 'The beauty of this world is in your heart',
        shortDescription: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        author: {
            avatar: '',
            name: 'Than Thai',
            createdDate: new Date()
        }
    },
    {
        imageSource: Images.demopic.img7,
        title: 'The beauty of this world is in your heart',
        shortDescription: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        author: {
            avatar: '',
            name: 'Than Thai',
            createdDate: new Date()
        }
    },
    {
        imageSource: Images.demopic.img7,
        title: 'The beauty of this world is in your heart',
        shortDescription: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        author: {
            avatar: '',
            name: 'Than Thai',
            createdDate: new Date()
        }
    },
    {
        imageSource: Images.demopic.img7,
        title: 'The beauty of this world is in your heart',
        shortDescription: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
        author: {
            avatar: '',
            name: 'Than Thai',
            createdDate: new Date()
        }
    }
];

const sampleData = [
    {
        "id": 10,
        "title": "title3",
        "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "status": 1,
        "vote_numbers": 0,
        "visibility": 0,
        "image_path": "assets/img/img_post/",
        "image_name": "img_3",
        "user_id": 31,
        "created_at": "2018-07-18 17:05:28",
        "updated_at": "2018-07-18 17:06:02"
    }
];

const categories = [
    {
        title: 'Tech',
        link: '/topic/tech'
    },
    {
        title: 'Startup',
        link: '/topic/start-ups'
    },
    {
        title: 'Design',
        link: '/topic/design'
    },
    {
        title: 'Culture',
        link: '/topic/culture'
    },
    {
        title: 'Health',
        link: '/topic/health'
    },
    {
        title: 'Popular',
        link: '/topic/popular'
    },
    {
        title: 'Self',
        link: '/topic/self'
    },
    {
        title: 'Collections',
        link: '/topic/collections'
    },
    {
        title: 'Programming',
        link: '/topic/programming'
    }
];

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            featuredItems: []
        }
    }


    componentDidMount() {
        api.getAllPosts((result) => {
            this.setState({featuredItems: result})
            // console.log('result', result)
        }, (error) => {

        })
    }

    render() {
        return (
            <div style={styles.container}>

                <nav style={styles.categories}>
                    {
                        categories.map((item, index) => {
                            return (
                                <CategoryItem data={item} key={index}/>
                            )
                        })
                    }
                </nav>

                <div style={{height: 30}}/>

                <div style={{width: '80%', alignSelf: 'center'}}>
                    <div style={styles.top}>
                        <h1 className="sitetitle">Mediumish</h1>
                        <p style={{fontSize: 20, fontWeight: '300', color: '#292b2c'}}>Bootstrap theme, medium style,
                            simply perfect for bloggers</p>
                    </div>

                    <section className="featured-post">
                        <div className="section-title">
                            <h2>
                                <span>Featured</span>
                            </h2>
                        </div>

                        <div className="card-columns listfeaturedtag">
                            {
                                this.state.featuredItems.map((item, index) => {
                                    return <FeturedItem data={item} key={index}/>
                                })
                            }
                        </div>
                    </section>

                    <section className="featured-post">
                        <div className="section-title">
                            <h2>
                                <span>All Stories</span>
                            </h2>
                        </div>

                        <div className="card-columns listrecent">
                        {
                                this.state.featuredItems.map((item, index) => {
                                    return <StoryItem data={item} key={index}/>
                                })
                            }
                        </div>
                    </section>

                    <div className="footer">
                        <p className="pull-left">
                            Group 12
                        </p>
                        <div className="clearfix">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        paddingTop: 0,
        marginTop: 0,
    },
    extremeHeroContainer: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column'
    },
    top: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    featuredPost: {},
    sectionTitle: {
        borderBottom: 1,
        borderColor: 'rgba(0,0,0,.15)',
        fontWeight: '700',
        fontSize: 24
    },
    sectionTitleContainer: {},
    categories: {
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        zIndex:100,
        marginTop: -22,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 50,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    category: {
        textDecorationColor: 'transparent',
        color: 'rgba(0,0,0,.54)',
        fontFamily: 'Lucida Grande'
    }
};
