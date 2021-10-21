const axios = window.axios;
axios.defaults.withCredentials = true;

const BASE_API_URL = 'http://localhost:8000';
const options = {
    headers: {"content-type": "application/json"}
};

export default {
    getAllPosts: () =>
        axios.get(`${BASE_API_URL}/posts`, options),
    getMyPosts: () =>
        axios.get(`${BASE_API_URL}/me/posts`, options),
    getPost: (id) =>
        axios.get(`${BASE_API_URL}/posts/${id}/edit`, options),
    showPost: (id) =>
        axios.get(`${BASE_API_URL}/posts/${id}`, options),
    addPost: (post) =>
        axios.post(`${BASE_API_URL}/posts`, post, options),
    updatePost: (post, id) =>
        axios.put(`${BASE_API_URL}/posts/${id}`, post, options),
    deletePost: (id) =>
        axios.delete(`${BASE_API_URL}/posts/${id}`, options),
    getComments: (id) =>
        axios.get(`${BASE_API_URL}/posts/${id}/comments`, options),
    saveComment: (comment, id) =>
        axios.post(`${BASE_API_URL}/posts/${id}/comment`, comment, options),
    deleteComment: (id, comment_id) =>
        axios.delete(`${BASE_API_URL}/posts/${id}/comment/${comment_id}`, options),
}