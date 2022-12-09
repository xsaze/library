function Card(){};

Card.prototype.isRead = function () {
    console.log('This is read.');
}

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    library.push(this)
}

let library = [];

function showPopup() {
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("plus-btn").classList.remove("add-btn");
    setTimeout(function() {document.getElementById("plus-btn").classList.add("add-btn")}, 0);
    document.getElementById("form").reset();
    
}

function hidePopup() {
    document.getElementById("popup").classList.add("hidden");
}

const createBookFromInput = () => {
    const title = document.getElementById("title-input").value;
    const author = document.getElementById("author-input").value;
    const pages = document.getElementById("pages-input").value;
    const isRead = document.getElementById("isRead-input").checked;
    return new Book (title,author,pages,isRead);
}

const createAddBookButton = () => {
    const cardContainer = document.createElement('div');
    const addBtn = document.createElement('div');

    cardContainer.classList.add("card-container");
    cardContainer.setAttribute('id','btn');
    addBtn.classList.add('add-btn');

    addBtn.onclick = showPopup;
    addBtn.textContent = '+';
    addBtn.setAttribute('id', 'plus-btn');
    
    

    cardContainer.appendChild(addBtn);
    document.getElementById('container').appendChild(cardContainer);
    
}

const removeBookCard = (title) => {
    library = library.filter(book => book.title != title);
}

const createBookCard = (book) => {
    const cardContainer = document.createElement('div');
    const card = document.createElement('div');
    const bookTitle = document.createElement('div');
    const bookAuthor = document.createElement('div');
    const bookPages = document.createElement('div');
    const readBtn = document.createElement('div');
    const removeBtn = document.createElement('div');
    const removeBtnIcon = document.createElement('span');

    cardContainer.classList.add("card-container");
    card.classList.add("card");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookPages.classList.add("book-pages");
    readBtn.classList.add("read-btn");
    removeBtn.classList.add("remove-btn");
    removeBtnIcon.classList.add("material-symbols-outlined")
    //ADD ONCLICK FUNCTIONS
    removeBtnIcon.addEventListener('click', function() {
        removeBookCard(book.title);
        updateBooksContainer();
    });

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    removeBtnIcon.textContent = 'delete';
    
    if (book.isRead) {
        readBtn.textContent = 'Read'
    } else {readBtn.textContent = 'Not read'};
    readBtn.onclick = isReadToggle;


    removeBtn.appendChild(removeBtnIcon);
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    cardContainer.appendChild(card);
    cardContainer.appendChild(readBtn);
    cardContainer.appendChild(removeBtn);
    document.getElementById("container").appendChild(cardContainer);
}

const resetBooksContainer = () => {
    document.getElementById("container").innerHTML = '';
}

const updateBooksContainer = () => {
    resetBooksContainer();
    for (let book of library) {
        createBookCard(book)
    }
    createAddBookButton();
}

const addBook = () => {
    createBookFromInput();
    updateBooksContainer();
    hidePopup();
}

const isReadToggle = (e) => {
    const title = e.target.parentNode.firstChild.firstChild.textContent;
    const book = library.find((book) => book.title === title);
    book.isRead = !book.isRead;
    updateBooksContainer();
    

    
}