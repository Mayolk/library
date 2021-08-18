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
bookListUI.addEventListener('mouseup', removeBook);

// Event handlers

function revealForm() {
  formUI.classList.remove('hidden');
  newBookUI.classList.add('hidden');
  // formUI.reset();
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

function removeBook(e) {
  let removeID;
  if (e.target.classList.contains('svg')) {
    removeID = e.target.getAttribute('data-library-index');
  } else if (e.target.parentElement.classList.contains('svg')) {
    removeID = e.target.parentElement.getAttribute('data-library-index');
  } else {
    removeID = -1;
  }

  if (removeID >= 0) {

    myLibrary = JSON.parse(localStorage.getItem('bookStorage'));
    myLibrary.splice(removeID, 1);
    localStorage.setItem('bookStorage', JSON.stringify(myLibrary));
    displayBooks();
  }
}


// constructors

function Book(title, author, noOfPages, isRead) {
  this.title = title,
  this.author = author,
  this.noOfPages = noOfPages,
  this.isRead = isRead
}

Book.prototype.info = function() {
  let bookStatus;
  this.isRead ? bookStatus = 'already read' : bookStatus= 'not read yet';
  return `${this.title} by ${this.author}, ${this.noOfPages}, ${bookStatus}.`;
};

// izbaciti funkciju iz konstruktora i stavti je u prototip

// dodati funkciju objektima kada ih vadimo iz JSON-a:
// Object.createPrototype(Book), nešto tako


// For testing (later for removal)

const hobbit = new Book('The Hobbit', 'JRR Tolkien', 300, true);
console.log(hobbit);


// Function calls

displayBooks();


// Functions

// Display information from myLibrary in the UI
function displayBooks() {

  if (localStorage.getItem('bookStorage')) {
    
  bookListUI.textContent = '';

  myLibrary = JSON.parse(localStorage.getItem('bookStorage'));
  myLibrary.forEach( (book) => {

    book.__proto__ = Object.create(Book.prototype);
    
    let bookUI = document.createElement('div');
    bookUI.classList.add('book');

    for (let key in book) {
      if (key !== 'info') {
        let para = document.createElement('p');
        para.textContent = book[key];
        para.classList.add('book-info');
        bookUI.appendChild(para);
      }
    }

    let removeUI = document.createElement('div');
    removeUI.classList.add('book-remove');
    removeUI.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg" data-library-index="${myLibrary.indexOf(book)}">
      <path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
    </svg>
    `;
    bookUI.appendChild(removeUI);

    bookListUI.appendChild(bookUI);

  });
  }
}

function addBookToLibrary(book) {

  if (localStorage.getItem('bookStorage')) {
    myLibrary = JSON.parse(localStorage.getItem('bookStorage'));
  }
  myLibrary.push(book);
  localStorage.setItem('bookStorage', JSON.stringify(myLibrary));
}