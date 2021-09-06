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
bookListUI.addEventListener('mouseup', updateReadStatus);

// Event handlers

function revealForm() {
  formUI.classList.remove('hidden');
  newBookUI.classList.add('hidden');
  formUI.reset();
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

  let newBook = new Book(formTitleUI.value, formAuthorUI.value, parseInt(formPagesUI.value), formReadUI.querySelector('input[name="read"]:checked').value);

  addBookToLibrary(newBook);
  displayBooks();

}

function removeBook(e) {
  let removeID;
  if (e.target.classList.contains('svg-remove')) {
    removeID = e.target.getAttribute('data-library-index');
  } else if (e.target.parentElement.classList.contains('svg-remove')) {
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

function updateReadStatus(e) {
  let updateID;
  if (e.target.classList.contains('svg-update')) {
    updateID = e.target.getAttribute('data-library-index');
  } else if (e.target.parentElement.classList.contains('svg-update')) {
    updateID = e.target.parentElement.getAttribute('data-library-index');
  } else {
    updateID = -1;
  }

  if (updateID >= 0) {

    myLibrary = JSON.parse(localStorage.getItem('bookStorage'));

    if (myLibrary[updateID].isRead === 'true') {
      myLibrary[updateID].isRead = 'false';
    } else {
      myLibrary[updateID].isRead = 'true';
    }

    localStorage.setItem('bookStorage', JSON.stringify(myLibrary));
    displayBooks();
  }
}


// Class

class Book {

  constructor(title, author, noOfPages, isRead) {
    this.title = title,
    this.author = author,
    this.noOfPages = noOfPages,
    this.isRead = isRead
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  info () {
    let bookStatus;
    this.isRead.toString() === "true" ? bookStatus = 'already read' : bookStatus= 'not read yet';
    return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${bookStatus}.`;
  }

}

// Constructor & proto method

// function Book(title, author, noOfPages, isRead) {
//   this.title = title,
//   this.author = author,
//   this.noOfPages = noOfPages,
//   this.isRead = isRead
// }

// Book.prototype.info = function() {
//   let bookStatus;
//   this.isRead.toString() === "true" ? bookStatus = 'already read' : bookStatus= 'not read yet';
//   return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${bookStatus}.`;
// };

// Function calls

displayBooks();


// Functions

function displayBooks() {

  if (localStorage.getItem('bookStorage')) {
    
    bookListUI.textContent = '';

    let tempArray = JSON.parse(localStorage.getItem('bookStorage'));

    // Each object (book) in myLibrary gets Book.prototype
    myLibrary = tempArray.map( (currentBook) => {
      let tempBook = Object.create(Book.prototype);
      return Object.assign(tempBook, currentBook);
    });

    myLibrary.forEach( (book) => {
      
      let bookUI = document.createElement('div');
      bookUI.classList.add('book');

      for (let key in book) {
        if (book.hasOwnProperty(key)) {
          let para = document.createElement('p');
          para.textContent = book[key];
          para.classList.add('book-info');
          if (key === 'isRead') {
            let toggleReadUI = document.createElement('span');
            toggleReadUI.classList.add('toggle-read');
            toggleReadUI.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-update" data-library-index="${myLibrary.indexOf(book)}">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            `;
            para.appendChild(toggleReadUI);
          }
          bookUI.appendChild(para);
        }
      }

      let removeUI = document.createElement('span');
      removeUI.classList.add('book-remove');
      removeUI.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-remove" data-library-index="${myLibrary.indexOf(book)}">
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
