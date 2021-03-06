function findAuthorById(authors, id) {
  return authors.find((element) => element.id === id);
}

function findBookById(books, id) {
  return books.find((element) => element.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let booksOut = [];
  let booksIn = [];
  books.forEach((object) => {
//     Checks an the first item of an array to see if user returned.
    let isReturned = object.borrows[0].returned;
    isReturned ? booksIn.push(object) : booksOut.push(object);
  });
  return [booksOut, booksIn];
}

function getBorrowersForBook(book, accounts) {
  let { borrows } = book;
  let borrowers = accounts.filter((element) => {
//    See if id in borrows.
    return borrows.map((object) => object.id).includes(element.id);
  });
  let borrowersFormatted = borrowers.map((element) => {
    const { id } = element;
//    Finds an object of the user based on element id
    const userFound = borrows.find((item) => item.id === id);
    element["returned"] = userFound.returned;
    return element;
  });
  return borrowersFormatted;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
