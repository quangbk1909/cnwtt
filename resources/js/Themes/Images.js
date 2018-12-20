const Images = {
    demopic: {
        //img1: require('../assets/demopic/1.jpg'),
        //img2: require('../assets/demopic/2.jpg'),
        //img3: require('../assets/demopic/3.jpg'),
        //img4: require('../assets/demopic/4.jpg'),
        //img5: require('../assets/demopic/5.jpg'),
        //img6: require('../assets/demopic/6.jpg'),
        //img7: require('../assets/demopic/7.jpg'),
        //img8: require('../assets/demopic/8.jpg'),
        //img9: require('../assets/demopic/9.jpg'),
        //img10: require('../assets/demopic/10.jpg'),
    },
    logo: require('../assets/logo.png'),
    imagePost: (name) => {
        if (name) {
            return require(`../assets/img_post/${name}`)
        }
        return require(`../assets/demopic/2.jpg`)
        // return require('../assets/img_post/5841bf6aa33713a80c91162a5468aaef948f64f7.jpg')
        // return this.demopic.img7
    },
    avatar: (link) => {
        console.log('link', '../' + link);
        return require('../' + link)
        // return require('../assets/img/31')
    }
};

export default Images;
