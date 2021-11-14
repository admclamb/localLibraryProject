function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((accumulator, book) => {
//     Uses the index of 0 on borrows as the first item tells if returned.
    if (!book.borrows[0].returned) accumulator++;
    return accumulator;
  }, 0);
}

function getMostCommonGenres(books) {
  const notepad = books.reduce((acc, book) => {
    
    if (acc[book.genre]) {
      acc[book.genre] += 1;
    } else {
      acc[book.genre] = 1;
    }
    return acc;
  }, {});
  let genres = [];
//   adding objects to the final array.
  for (let item in notepad) {
    genres.push({ name: item, count: notepad[item] });
  }
  let sorted = genres.sort((previous, after) => {
    return after.count - previous.count;
  });
  return sorted.slice(0, 5);
}

function getMostPopularBooks(books) {
  let formattedBooks = books.map((element) => {
    return { name: element.title, count: element.borrows.length };
  });
  let sortedBooks = formattedBooks.sort((beforeElement, afterElement) => {
    return afterElement.count - beforeElement.count;
  });
  return sortedBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let formattedAuthors = books.map((element) => {
    let author = authors.find((author) => author.id === element.authorId);
    let name = `${author.name.first} ${author.name.last}`;
    return { name, count: element.borrows.length };
  });
  console.log(formattedAuthors);
  let sortedAuthors = formattedAuthors.sort((beforeElement, afterElement) => {
    return afterElement.count - beforeElement.count;
  });
  return sortedAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
