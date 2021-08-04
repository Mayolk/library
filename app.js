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

console.log(theHobbit);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(theHobbit);

console.log(myLibrary);