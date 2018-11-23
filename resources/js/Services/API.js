import axios from 'axios'

const getAllPosts = (onSuccess, onError) => {
    axios.get('/api/blog/post/allPost').then((result) => {
        onSuccess(result.data)
    }).catch((error) => {
        onError(error)
    })
};

const api = {
    getAllPosts
};

export default api
