import axios from 'axios'
import Config from "../config/Config";

const get = (url, params, onSuccess, onError) => {
    axios.defaults.baseURL = Config.env.dev;
    console.log('url', process.env);
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

const getAllPostByVote = (onSuccess, onError) => {
    get('/api/blog/post/allPostByVote', {}, onSuccess, onError)
};

const getAllPostsRandom = (onSuccess, onError) => {
    get('/api/blog/post/allPostByRandom', {}, onSuccess, onError)
}

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
    let results = await axios.get('api/blog/post/getComment/' + postId);
    console.log('comments', results);
    // for (let i = 0; i < comments.length; i++) {
    //     let comment = comments[i];
    //     let userId = comment.user_id;
    //     let result = await axios.get('/api/blog/author/getAuthorByID/' + userId);
    //     let user = result.data;
    //     comments[i].author_name = result.data.author_name;
    //     comments[i].avatar = result.data.avatar;
    // }
    return results.data;
};

const saveComment = (postId, comment, onSuccess, onError) => {
    let query = comment.parent_id ? `parent_id=${comment.parent_id}&content=${comment.content}` : `content=${comment.content}`;
    let url = `/api/blog/post/saveComment/${postId}?${query}`;
    console.log('url', url);
    get(url, {}, onSuccess, onError)
};

const search = async (keyword) => {
    let url = '/api/blog/searchList?textSearch=' + keyword;
    axios.defaults.baseURL = 'http://localhost:8000';
    let results = await axios.get(url);
    let posts = results.data;
    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let userId = post.user_id;
        let result = await axios.get('/api/blog/author/getAuthorByID/' + userId)
        let user = result.data;
        posts[i].author_name = user.author_name;
        posts[i].avatar = user.avatar;
    }
    return posts;
};

const getRecommendItems = (onSuccess, onError) => {
    get('/api/blog/post/recommendItem', {}, onSuccess, onError);
};

const getPopularPost = (id, onSuccess, onError) => {
    get('/api/blog/category/categoryPostPopular/' + id, {}, onSuccess, onError)
};

const getNewestPost = (id, onSuccess, onError) => {
    get('/api/blog/category/categoryPostFromNewest/' + id, {}, onSuccess, onError)
};

const api = {
    getAllPosts,
    getAllCategories,
    getCurrentAuthor,
    getPostByCategory,
    getAuthorById,
    getCmt,
    saveComment,
    search,
    getAllPostByVote,
    getAllPostsRandom,
    getRecommendItems,
    getPopularPost,
    getNewestPost,
    get
};

export default api
