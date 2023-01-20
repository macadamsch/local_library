function findAccountById(accounts, id) {
  return accounts.find((account)=>
    account.id === id
  )
}

function sortAccountsByLastName(accounts=[]) {
  accounts.sort ((lastName1, lastName2)=>{
    return lastName1.name.last.toLowerCase() < lastName2.name.last.toLowerCase() ? -1 : 1
  })
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  const {id} = account;
  const finalCount = books.reduce((accumulator, currentBook)=>{
    const {borrows} = currentBook;
    borrows.forEach((borrower)=>{
      if (borrower.id === id) {
        accumulator++;
      }
    })
    return accumulator;
  }, 0);
  return finalCount;
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const {id} = account; 
  const result = books.filter((bookObj)=>{
    const {borrows, authorId} = bookObj;
    const isBookBorrowedByAcct = bookObj.borrows.some((acct)=>{
      return acct.id === id && acct.returned === false;
    })
    if (isBookBorrowedByAcct === true) {
      const matchingAuthor = authors.find((authorToMatch)=>{
        return authorToMatch.id === authorId;
      });
      bookObj.author = matchingAuthor;
      return bookObj;
    }
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
