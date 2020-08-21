# Webpack ESLint Boilerplate Project

Boilerplate sederhana untuk aplikasi web berbasis JavaScript di bagian front end. Boilerplate ini menggunakan Webpack, Babel, ESLint, dan Prettier. Project ini dibuat berdasarkan Traversy Media tutorial  [VSCode ESLint, Prettier & Airbnb Style Guide Setup](https://www.youtube.com/watch?v=SydnKbGc7W8) and [ESLint Gist Setup](https://gist.github.com/bradtraversy/aab26d1e8983d9f8d79be1a9ca894ab4), dan berbasis pada kerangka project yang diperoleh dari hasil belajar pelatihan online Dicoding Course.

## Setup

Pastikan di perangkat anda telah terpasang Node JS dan package manager NPM. Kemudian lakukan clone atau download repository ini dengan Git. Perintah yang digunakan yaitu :

```sh
// Clone the repository
git clone -b master -o github --depth 1 --single-branch https://github.com/javascript-indonesias/ESLintBoilerplates.git
```

Setelah proses clone selesai, jalankan perintah NPM berikut.

```sh
npm install
```

## Setup Default Formatter dan Autofix On Save

Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) plugin dari VS Code Marketplace. Lalu tambahkan snippets setelan ini pada file VS Code Settings ***settings.json***.

```sh
    "editor.formatOnSave": true,
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
```

Snippet tersebut memberikan fungsi auto format dan auto fix pada kode JavaScript yang ditulis, jika ditemukan error pada ESLint. Kalian bisa mengubah konfigurasi ini sesuai dengan kebutuhan kalian. Kalian dapat melihat referensi konfigurasi ESLint pada link berikut [ESLint settings here](https://github.com/microsoft/vscode-eslint/issues/833).

## Kustomisasi Lainnya

Beberapa rules dan ESLint parser dapat diubah setelannya pada file  **eslintrc.json**. Untuk referensi ESLint lebih lengkap dan dokumentasinya, kalian dapat melihat pada halaman berikut ini  [https://eslint.org/docs/rules/](https://eslint.org/docs/rules/). Dan jangan lupa, pemrograman dengan VS Code semakin seru dengan  menggunakan [Mayukai Theme](https://marketplace.visualstudio.com/items?itemName=GulajavaMinistudio.mayukaithemevsc) dan [Iosevka Mayukai Font](https://github.com/Iosevka-Mayukai/Iosevka-Mayukai). Selamat mencoba.
