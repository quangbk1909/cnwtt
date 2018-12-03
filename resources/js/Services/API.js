import axios from 'axios'

const get = (url, params, onSuccess, onError) => {
    axios.get(url, params).then((result) => {
        onSuccess(result.data)
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
    get('/api/blog/author/getAuthor', {}, onSuccess, onError)
};

const api = {
    getAllPosts,
    getAllCategories,
    getCurrentAuthor
};

export default api
