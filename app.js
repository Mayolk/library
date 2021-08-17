// UI pointers
const bookListUI = document.querySelector('#book-list');
const newBookUI = document.querySelector('#new-book');
const formUI = document.querySelector('#form');
const formButtonsUI = formUI.querySelector('#form-buttons');
const formTitleUI = formUI.querySelector('#title');
const formAuthorUI = formUI.querySelector('#author');
const formPagesUI = formUI.querySelector('#pages');
const formReadUI = formUI.querySelector('#read');

// App variables
let myLibrary = [];

// Event listeners
newBookUI.addEventListener('click', revealForm);
formUI.addEventListener('submit', createBook);
formButtonsUI.addEventListener('mouseup', hideForm);

// Event handlers

function revealForm() {
  formUI.classList.remove('hidden');
  newBookUI.classList.add('hidden');
}

function hideForm(e) {
  e.preventDefault()
  if (e.target.classList.contains('btn')) {
    formUI.classList.add('hidden');
    newBookUI.classList.remove('hidden');
  }
}

function createBook(e) {

  e.preventDefault();

  let newBook = new Book(formTitleUI.value, formAuthorUI.value, formPagesUI.value, formReadUI.querySelector('input[name="read"]:checked').value);

  addBookToLibrary(newBook);
  displayBooks();

}

// constructors

function Book(title, author, noOfPages, isRead) {
  this.title = title,
  this.author = author,
  this.noOfPages = noOfPages,
  this.isRead = isRead,
  this.info = function() {
    let bookStatus;
    this.isRead ? bookStatus = 'already read' : bookStatus= 'not read yet';
    return `${this.title} by ${this.author}, ${this.noOfPages}, ${bookStatus}.`;
  }
}

// Za ukloniti

const theHobbit = new Book('The Hobbit The Hobbit The Hobbit The Hobbit', 'J.R.R. Tolkien', 295, false);
const lotr = new Book('Lord of the Rings', 'J.R.R. Tolkien', 345, true);

addBookToLibrary(theHobbit);
addBookToLibrary(lotr);

// Function calls

displayBooks();

// Functions

// Display information from myLibrary in the UI
function displayBooks() {
  bookListUI.textContent = '';

  myLibrary.forEach( (book) => {
    
    let bookUI = document.createElement('div');
    bookUI.classList.add('book');
    bookUI.setAttribute('data-library-number', myLibrary.indexOf(book))

    for (let key in book) {
      if (key !== 'info') {
        let para = document.createElement('p');
        para.textContent = book[key];
        para.classList.add('book-info');
        // para.classList.add(`book-${key}`);
        bookUI.appendChild(para);
      }
    }

    let para = document.createElement('p');
    para.classList.add('book-remove');
    para.textContent = "x";
    bookUI.appendChild(para);

    bookListUI.appendChild(bookUI);

  });

}

function addBookToLibrary(book) {
  myLibrary.push(book);
}