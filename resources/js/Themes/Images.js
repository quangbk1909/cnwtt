const Images = {
    demopic: {
        img1: require('../assets/demopic/1.jpg'),
        img2: require('../assets/demopic/2.jpg'),
        img3: require('../assets/demopic/3.jpg'),
        img4: require('../assets/demopic/4.jpg'),
        img5: require('../assets/demopic/5.jpg'),
        img6: require('../assets/demopic/6.jpg'),
        img7: require('../assets/demopic/7.jpg'),
        img8: require('../assets/demopic/8.jpg'),
        img9: require('../assets/demopic/9.jpg'),
        img10: require('../assets/demopic/10.jpg'),
    },
    logo: require('../assets/logo.png'),
    image: (path, name) => require(`../assets/${path}/${name}${name.endsWith('.jpg') || name.endsWith('.png') ? '' : '.jpg'}`)
};

export default Images;
