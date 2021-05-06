const BASE_URL = 'https://jsonplaceholder.typicode.com';
const URL_LISTPOST = `${BASE_URL}/posts`;
const URL_ADDPOST = `${BASE_URL}/posts`;

const getDetailUrl = (post) => `${BASE_URL}/posts/${post.id}`;

const getDeleteUrl = (postid) => `${BASE_URL}/posts/${postid}`;

const getUpdateUrl = (postid) => `${BASE_URL}/posts/${postid.id}`;

export { URL_LISTPOST, URL_ADDPOST, getDetailUrl, getDeleteUrl, getUpdateUrl };
