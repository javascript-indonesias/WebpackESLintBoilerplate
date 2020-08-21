import {
    URL_LISTPOST,
    URL_ADDPOST,
    getUpdateUrl,
    getDeleteUrl,
} from './config';

function main() {
    /*
        jangan ubah kode di bawah ini ya!
    */

    const showResponseMessage = (
        message = 'Check your internet connection',
    ) => {
        // eslint-disable-next-line no-alert
        alert(message);
    };

    const renderAllPosts = (posts) => {
        const postElement = document.querySelector('#listPost');
        postElement.innerHTML = '';

        if (posts && posts.length > 0) {
            posts.forEach((post) => {
                postElement.innerHTML += /* html */ `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${post.id}) ${post.title}</h5>
                            <p>${post.body}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${post.id}">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
            });

            const buttons = document.querySelectorAll('.button-delete');
            buttons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const postId = event.target.id;
                    // eslint-disable-next-line no-use-before-define
                    removePost(postId);
                });
            });
        } else {
            postElement.innerHTML = '';
        }
    };

    const getPosts = () => {
        // tuliskan kode di sini!
        fetch(URL_LISTPOST, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (resp.status === 200) {
                    return resp.json();
                }
                throw new Error(`Error request ${resp.status}`);
            })
            .then((respJson) => {
                if (respJson) {
                    renderAllPosts(respJson);
                } else {
                    showResponseMessage('Error ambil data');
                }
            })
            .catch((error) => {
                console.log(error);
                showResponseMessage(error);
            });
    };

    const getPostsAsync = async () => {
        // tuliskan kode di sini!
        try {
            const responses = await fetch(URL_LISTPOST, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (responses.status >= 200) {
                const respJson = await responses.json();

                if (respJson) {
                    renderAllPosts(respJson);
                } else {
                    showResponseMessage('Error ambil data');
                }
            } else {
                throw new Error(`Error request ${responses}`);
            }
        } catch (err) {
            console.log(err);
            showResponseMessage(err);
        }
    };

    const insertPost = (post) => {
        // tuliskan kode di sini!
        fetch(URL_ADDPOST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(post),
        })
            .then((response) => {
                if (response.status >= 200) {
                    return response.json();
                }
                throw new Error('Gagal insert data', response.status);
            })
            .then((responseJson) => {
                if (responseJson) {
                    showResponseMessage('Sukses memasukkan data JSON');
                    getPosts();
                } else {
                    throw new Error(
                        'Gagal memasukkan data JSON',
                        responseJson.message,
                    );
                }
            })
            .catch((error) => {
                console.log(error);
                showResponseMessage(error.message);
            });
    };

    const updatePost = async (post) => {
        // tuliskan kode di sini!
        const urlUpdate = getUpdateUrl(post);
        const optionsFetch = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(post),
        };

        try {
            const response = await fetch(urlUpdate, optionsFetch);
            let responseJson = {};
            if (response.status >= 200) {
                responseJson = await response.json();
                if (responseJson) {
                    showResponseMessage('Sukses menambahkan post');
                    getPosts();
                } else {
                    throw new Error('Gagal memperbarui post', response.status);
                }
            } else {
                throw new Error('Gagal memperbarui post', response.status);
            }
        } catch (err) {
            console.log(err);
            showResponseMessage(err.message);
        }
    };

    const removePost = async (postId) => {
        // tuliskan kode di sini!
        const urlDelete = getDeleteUrl(postId);
        const optionReq = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        try {
            const response = await fetch(urlDelete, optionReq);

            if (response.status >= 200) {
                const responseJson = await response.json();

                if (responseJson) {
                    showResponseMessage('Sukses menghapus data');
                    getPostsAsync();
                } else {
                    throw new Error('Gagal menghapus data');
                }
            } else {
                throw new Error('Gagal menghapus data');
            }
        } catch (err) {
            console.log(err);
            showResponseMessage(err.message);
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const inputPostId = document.querySelector('#inputPostId');
        const inputPostTitle = document.querySelector('#inputPostTitle');
        const inputPostBody = document.querySelector('#inputPostBody');
        const inputPostAuthorId = document.querySelector('#inputUserId');
        const buttonSave = document.querySelector('#buttonSave');
        const buttonUpdate = document.querySelector('#buttonUpdate');

        buttonSave.addEventListener('click', function () {
            const post = {
                id: Number.parseInt(inputPostId.value, 10),
                title: inputPostTitle.value,
                body: inputPostBody.value,
                userId: Number.parseInt(inputPostAuthorId.value, 10),
            };
            insertPost(post);
        });

        buttonUpdate.addEventListener('click', function () {
            const post = {
                id: Number.parseInt(inputPostId.value, 10),
                title: inputPostTitle.value,
                body: inputPostBody.value,
                userId: Number.parseInt(inputPostAuthorId.value, 10),
            };
            updatePost(post);
        });

        // Ambil daftar post
        getPosts();
    });
}

export default main;
