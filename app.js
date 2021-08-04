// UI pointers
const bookListUI = document.querySelector('#book-list');

let myLibrary = [];

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

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

addBookToLibrary(theHobbit);

displayBooks();


console.log(myLibrary);

// Display information from myLibrary in the UI
function displayBooks() {

  myLibrary.forEach( (book) => {
    
    let bookUI = document.createElement('div');
    bookUI.classList.add('book');

    for (let key in book) {
      if (key !== 'info') {
        let para = document.createElement('p');
        para.textContent = book[key];
        bookUI.appendChild(para);
      }
    }

    bookListUI.appendChild(bookUI);

  });

}


function addBookToLibrary(book) {
  myLibrary.push(book);
}