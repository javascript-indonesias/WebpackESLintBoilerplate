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
                removePosts(postId);
            });
        });
    };

    const getPosts = () => {
        // tuliskan kode di sini!
        const reqXhr = new XMLHttpRequest();
        reqXhr.addEventListener('load', (event) => {
            const { status, responseText } = event.target;
            const responseJson = JSON.parse(responseText);

            if (status === 200) {
                renderAllPosts(responseJson);
            } else {
                console.log('Error posts data', status);
                showResponseMessage('Error posts data');
            }
        });

        reqXhr.addEventListener('error', (event) => {
            console.log(event.target);
            showResponseMessage('Gagal mengambil data');
        });

        reqXhr.addEventListener('abort', (event) => {
            console.log(event.target);
            showResponseMessage('Request aborted');
        });

        reqXhr.responseType = 'text';
        reqXhr.open('GET', URL_LISTPOST);
        reqXhr.setRequestHeader('Content-Type', 'application/json');
        reqXhr.send();
    };

    const insertPosts = (post) => {
        // tuliskan kode di sini!
        const insertReq = new XMLHttpRequest();

        insertReq.addEventListener('load', (event) => {
            const { status, responseText } = event.target;
            const responseJson = JSON.parse(responseText);

            if (status === 200 && !responseJson.error) {
                getPosts();
            }

            showResponseMessage(responseJson.message);
        });

        insertReq.addEventListener('error', (event) => {
            console.log(event.target);
            showResponseMessage('Gagal memasukkan data');
        });

        insertReq.addEventListener('abort', (event) => {
            console.log(event.target);
            showResponseMessage('Request dibatalkan');
        });

        insertReq.responseType = 'text';
        insertReq.open('POST', URL_ADDPOST);

        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        insertReq.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8',
        );

        // Mengirimkan request dan menyisipkan JSON.stringify(post) pada body
        insertReq.send(JSON.stringify(post));
    };

    const updatePosts = (post) => {
        // tuliskan kode di sini!
        const urlUpdate = getUpdateUrl(post);

        const reqUpdate = new XMLHttpRequest();
        reqUpdate.addEventListener('load', (event) => {
            console.log(event.target);

            const { status, responseText } = event.target;
            const responseJson = JSON.parse(responseText);

            if (status === 200 && !responseJson.error) {
                getPosts();
            } else {
                console.log('Error ambil post', status);
            }

            showResponseMessage(responseJson.message);
        });

        reqUpdate.addEventListener('error', (event) => {
            console.log(event.target, 'Gagal mengirim data');
            showResponseMessage('Gagal mengirim data');
        });

        reqUpdate.addEventListener('abort', (event) => {
            console.log(event.target);
            showResponseMessage('Request dibatalkan');
        });

        reqUpdate.responseType = 'text';
        reqUpdate.open('PUT', urlUpdate);

        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        reqUpdate.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8',
        );

        // Mengirimkan request dan menyisipkan JSON.stringify(post) pada body
        reqUpdate.send(JSON.stringify(post));
    };

    const removePosts = (postId) => {
        // tuliskan kode di sini!
        const reqXhr = new XMLHttpRequest();

        reqXhr.addEventListener('load', (event) => {
            const { status, responseText } = event.target;
            const responseJson = JSON.parse(responseText);

            if (status === 200 && !responseJson.error) {
                getPosts();
            }

            showResponseMessage(responseJson.message);
        });

        reqXhr.addEventListener('error', (event) => {
            console.log(event.target);
            showResponseMessage('Gagal menghapus data');
        });

        reqXhr.addEventListener('abort', (event) => {
            console.log(event.target);
            showResponseMessage('Permintaan hapus dibatalkan');
        });

        reqXhr.responseType = 'text';
        reqXhr.open('DELETE', getDeleteUrl(postId));
        reqXhr.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8',
        );

        reqXhr.send();
    };

    document.addEventListener('DOMContentLoaded', () => {
        const inputPostId = document.querySelector('#inputPostId');
        const inputPostTitle = document.querySelector('#inputPostTitle');
        const inputPostBody = document.querySelector('#inputPostBody');
        const inputPostAuthorId = document.querySelector('#inputUserId');
        const buttonSave = document.querySelector('#buttonSave');
        const buttonUpdate = document.querySelector('#buttonUpdate');

        buttonSave.addEventListener('click', () => {
            const post = {
                id: Number.parseInt(inputPostId.value, 10),
                title: inputPostTitle.value,
                body: inputPostBody.value,
                userId: Number.parseInt(inputPostAuthorId.value, 10),
            };
            insertPosts(post);
        });

        buttonUpdate.addEventListener('click', () => {
            const post = {
                id: Number.parseInt(inputPostId.value, 10),
                title: inputPostTitle.value,
                body: inputPostBody.value,
                userId: Number.parseInt(inputPostAuthorId.value, 10),
            };

            updatePosts(post);
        });

        // Ambil daftar post
        getPosts();
    });
}

export default main;
