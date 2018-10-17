import React, {Component} from 'react'

export default class HomePage extends Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.top}>
                    <h1 style={{fontSize: 40}}>Medium</h1>
                    <p style={{fontSize: 20, fontWeight: '300', color:'#292b2c'}}>Bootstrap theme, medium style, simply perfect for bloggers</p>
                </div>

                <section className="featured-post" >
                    <div className="section-title">
                        <h2 >
                            <span>Featured</span>
                        </h2>
                    </div>
                </section>
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
    featuredPost: {
    },
    sectionTitle: {
        borderBottom: 1,
        borderColor: 'rgba(0,0,0,.15)',
        fontWeight: '700',
        fontSize: 24
    },
    sectionTitleContainer: {
    }
};
