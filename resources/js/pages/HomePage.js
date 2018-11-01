import React, {Component} from 'react'
import FeturedItem from "../components/FeturedItem";

import '../CSS/mediumish.css'
import '../CSS/bootstrap.min.css'
import Images from "../Themes/Images";
import StoryItem from "../components/StoryItem";

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

export default class HomePage extends Component {
    render() {
        return (
            <div style={styles.container}>

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
                                featuredItems.map((item, index) => {
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
                                featuredItems.map((item, index) => {
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
        backgroundColor: 'white',
        paddingTop: 20,
        marginTop: 20
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
    sectionTitleContainer: {}
};
