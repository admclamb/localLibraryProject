function findAccountById(accounts, id) {
//   filters through account and gets index of 0 as it requires an object.
  return accounts.filter((account) => account.id === id)[0];
}

function sortAccountsByLastName(accounts) {
//   create copy of accounts array.
  let accountsCopy = [...accounts];
  accountsCopy.sort((accountA, accountB) => {
    let accountALastLower = accountA.name.last.toLowerCase();
    let accountBLastLower = accountB.name.last.toLowerCase();
    return accountALastLower < accountBLastLower ? -1 : 1;
  });
  return accountsCopy;
}

function getTotalNumberOfBorrows(account, books) {
  const { id } = account;
  let borrowAmount = 0;
  for (const book of books) {
    let borrowForBook = book.borrows.reduce((accumulator, borrow) => {
      if (borrow.id === id) accumulator += 1;
      return accumulator;
    }, 0);
    borrowAmount += borrowForBook;
  }
  return borrowAmount;
}

function getBooksPossessedByAccount(account, books, authors) {
  const { id } = account;
  //   Filtering books borrowed
  let booksOut = books.reduce((array, book) => {
    const { borrows } = book;
    const isBorrowing = borrows.some(
      (obj) => obj.id === id && obj.returned === false
    );
    if (isBorrowing) {
      array.push(book);
    }
    return array;
  }, []);
  // Formatting the books borrowed

  booksOut.forEach((book, index) => {
    const { authorId } = book;
    const author = authors.find((element) => element.id === authorId);
    book["author"] = author;
  });
  return booksOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
