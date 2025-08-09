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
const Book = class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = idCounter;
        idCounter += 1;
    }
};

// Checks if all the values of one type are the same
const checkAllTheSame = function checkAllTheSame () {
    let allTheSame = true;
    myLibrary.reduce((previous, current) => {
        if (previous === 'init') return current[sortBy[0]];
        if (current[sortBy[0]] !== previous) allTheSame = false;
        return current[sortBy[0]];
    }, 'init');
    return allTheSame;
};

// Sort myLibrary
const sortLibrary = function sortLibrary () {
    if (checkAllTheSame()) return;
    if (sortBy[0] === 'id') {
        myLibrary.sort((a, b) => b.id - a.id);
    } else if (sortBy[0] === 'pages') {
        myLibrary.sort((a, b) => a.pages - b.pages);
    } else if (sortBy[0] === 'author') {
        myLibrary.sort((a, b) => (
            (a.author.toLowerCase() > b.author.toLowerCase()) ? 1 : -1
        ));
    } else if (sortBy[0] === 'titles') {
        myLibrary.sort((a, b) => (
            (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1
        ));
    } else if (sortBy[0] === 'read') {
        myLibrary.sort((a, b) => ((a.read < b.read) ? -1 : 1));
    }
    if (sortBy[1] === 'desc') myLibrary.reverse();
};

// Remove all check classes
