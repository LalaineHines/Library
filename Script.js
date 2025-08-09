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
const rmvAll = function removeAllCheckedClasses (id) {
    document.querySelectorAll('#content label + button').forEach((btn) => {
        if (btn.id !== id) btn.className = '';
    });
};

// Display library if something changed
const displayLibrary = function displayLibraryOnPage () {
    // Update localStorage
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    localStorage.setItem('#content hr:not(:first-of-type)').forEach(
        (hr) => hr.remove(),
    );

    // Loop through myLibrary and display each book
    myLibrary.forEach((book) => {
        const div = document.createElement('div');
        div.classList.add('book');
        div.id = book.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = book.read;
        const pTitle = document.createElement('p');
        pTitle.textContent = book.title;
        const pAuthor = document.createElement('p');
        pAuthor.textContent = book.author;
        const pPages = document.createElement('p');
        pPages.textContent = book.pages;
        const btnDel = document.createElement('button');
        btnDel.textContent = 'Delete';

        div.append(checkbox, pTitle, pAuthor, pPages, btnDel);
        const hr = document.createElement('hr');
        content.append(div, hr);
    });

    // Checkbox listener
    const readCheckbox = [...document.querySelectorAll('.book input')];
    readCheckbox.forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            myLibrary = myLibrary.map((book) => {
                if (book.id === Number(e.target.parentNode.id)) {
                    book.read = e.target.checked;
                }
                return book;
            });
            sortLibrary();
            displayLibrary();
        });
    });

    // Delete book button listener
    const deleteBtn = [...document.querySelectorAll('.book button')];
    deleteBtn.forEach((btn) => btn.addEventListener('click', (e) => {
        myLibrary = myLibrary.filter(
            (book) => book.id !== Number(e.target.parentElement.id),
        );
        displayLibrary();
    }));
};

// Sort list header
Object.values(listHeader).forEach((header) => {
    header.addEventListener('click', (e) => {
        rmvAll(e.target.id);
        if (!e.target.classList.value) {
            e.target.className = 'checked-1';
            sortBy = [e.target.id, 'desc'];
        } else if (e.target.className === 'checked-1') {
            e.target.className = 'checked-2';
            sortBy = [e.target.id, 'asc'];
        } else if (e.target.className === 'checked-2') {
            e.target.className = 'checked-1';
            sortBy = [e.target.id, 'desc'];
        }
        sortLibrary();
        displayLibrary();
    });
});

// Add new book to library