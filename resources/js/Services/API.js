import axios from 'axios'

const get = (url, params, onSuccess, onError) => {
    axios.defaults.baseURL = 'http://localhost:8000';
    axios.get(url, params).then((result) => {
        onSuccess(result.data);
        console.log('api', result)
    }).catch((error) => {
        onError(error)
    })
};

const getAllPosts = (onSuccess, onError) => {
    axios.get('/api/blog/post/allPost').then((result) => {
        onSuccess(result.data)
    }).catch((error) => {
        onError(error)
    })
};

const getAllCategories = (onSuccess, onError) => {
    get('/api/blog/category/allCate', {}, onSuccess, onError)
};

const getCurrentAuthor = (onSuccess, onError) => {
    get('/api/blog/author/getCurrentAuthor', {}, onSuccess, onError)
};

const getPostByCategory = (name, onSuccess, onError) => {
    get(`/api/blog/category/categoryPost?name=$name`, {
        params: {
            name: 'Sức khoẻ'
        }
    }, onSuccess, onError)
};

const getAuthorById = (id, onSuccess, onError) => {
    get('api/blog/author/getAuthorByID?id=31', {}, onSuccess, onError)
};

const api = {
    getAllPosts,
    getAllCategories,
    getCurrentAuthor,
    getPostByCategory,
    getAuthorById
};

export default api
