const content = document.getElementById('content');
const listHeader = {
    read: document.getElementById('read'),
    title: document.getElementById('title'),
    author: document.getElementById('author'),
    pages: document.getElementById('pages'),
    id: document.getElementById('id'),
};
const popup = {
    showBtn: document.getElementById('show'),
    overlay: document.getElementById('overlay'),
    closeBtn: document.getElementById('close'),
    addBtn: document.getElementById('add'),
    input: {
        title: document.getElementById('book-title'),
        author: document.getElementById('book-author'),
        pages: document.getElementById('book-pages'),
        checkbox: document.getElementById('book-read'),
    },
};

let idCounter = 0;
let myLibrary = [];
let sortBy = ['id', 'desc'];

// book -constructor- class
