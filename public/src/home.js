const { findAuthorById } = require("./books");

function getTotalBooksCount(books=[]) {
  return books.length;
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let results = [];
  books.forEach((bookObj)=>{
      let isBookBorrowed = bookObj.borrows.every((borrowObj)=>{
        return borrowObj.returned
      })
      isBookBorrowed === false ? results.push(bookObj) : null
    })
    return results.length
  }

function getMostCommonGenres(books) {
  let results = [];
  books.forEach((bookObj)=>{  // look at each book
    const {genre} = bookObj;
    let found = results.find((obj)=>{
      return obj.name === genre;    //check if results array contains an object with the same genre (property name === genre)
    })
    if (found === undefined) {      //if found is undefined we create a new object and put it into results
        let newObj = {
          name: genre,
          count: 1
        };
        results.push(newObj);
      }else {
        found.count += 1;
      }
    })
    sortByCount(results);
  return results.slice(0,5)
}

function getMostPopularBooks(books) {
  let result = []
  books.forEach((bookObj)=>{
    const { title, borrows } = bookObj;
    let obj = {
      name: title,
      count: borrows.length
    }
    result.push(obj);
  })
  sortByCount(result);
  return result.slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  const result = [];
  books.forEach((book)=>{
    const {borrows, authorId} = book;
    const matchingAuthor = helperFindAuthorById(authors, authorId);
    const {name: {first, last}} = matchingAuthor;
    const formattedName = helperJoinFirstAndLastNames(first, last);
    let obj = {
      name: formattedName, 
      count: borrows.length
    };
    result.push(obj);
  })
  sortByCount(result);
  return result.slice(0,5)
}

//helper functions
function helperFindAuthorById(authors=[], id) {
  return authors.find((author)=>
    author.id === id
  )
}

function sortByCount(resultToSort) {
  resultToSort.sort((objA, objB)=>{
    return objB.count - objA.count;
})
}

function helperJoinFirstAndLastNames(first, last) {
  return `${first} ${last}`;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
