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
    get('api/blog/author/getAuthorByID/31', {}, onSuccess, onError)
};

const getCmt = async (postId) => {
    axios.defaults.baseURL = 'http://localhost:8000';
    let results = await axios.get('/api/blog/post/postComment/' + postId);
    console.log('comments', results);
    let comments = results.data;
    for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        let userId = comment.user_id;
        let result = await axios.get('/api/blog/author/getAuthorByID/' + userId);
        let user = result.data;
        comments[i].author_name = result.data.author_name;
        comments[i].avatar = result.data.avatar;
    }
    return comments;
};

const saveComment = (postId, comment, onSuccess, onError) => {
    let query = comment.parent_id ? `parent_id=${comment.parent_id}&content=${comment.content}` : `content=${comment.content}`;
    let url = `/api/blog/post/saveComment/${postId}?${query}`;
    console.log('url', url);
    get(url, {}, onSuccess, onError)
};

const search = (keyword, onSuccess, onError) => {
    let url = '/api/blog/searchList?textSearch=' + keyword;
    get(url, {}, onSuccess, onError)
};

const api = {
    getAllPosts,
    getAllCategories,
    getCurrentAuthor,
    getPostByCategory,
    getAuthorById,
    getCmt,
    saveComment,
    search
};

export default api
