import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  render(){
    const { books } = this.props;
    let currentBooks, wantBooks, readBooks;
    if (books) {
      currentBooks = books.filter((book) => book.shelf = "Currently Reading");
      wantBooks = books.filter((book) => book.shelf = "Want to Read");
      readBooks = books.filter((book) => book.shelf = "Read");
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <p>{  }</p>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently Reading" books={currentBooks}/>
            <BookShelf title="Want to Read" books={currentBooks}/>
            <BookShelf title="Read" books={currentBooks}/>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

    )
  }
}

export default ListBooks;
