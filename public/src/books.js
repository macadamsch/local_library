function findAuthorById(authors=[], id) {
  return authors.find((author)=>
    author.id === id
  )
}

function findBookById(books=[], id) {
  return books.find((book)=>
    book.id === id
  )
}

function partitionBooksByBorrowedStatus(books=[]) {
  let borrowed = [];
  let returned = [];
  books.forEach((bookObj)=>{
    let isBookBorrowed = bookObj.borrows.every((borrowObj)=>{
      return borrowObj.returned
    })
    isBookBorrowed === true ? returned.push(bookObj) : borrowed.push(bookObj);
  })
  return [borrowed, returned]
}
                

function getBorrowersForBook(book={}, accounts=[]) {
  const {borrows} = book;
  const result = borrows.map((borrowedBook)=>{
    const foundAcct = accounts.find((acct)=>{
      return acct.id === borrowedBook.id;
    });
    foundAcct.returned = borrowedBook.returned;
    return foundAcct;
  })
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
