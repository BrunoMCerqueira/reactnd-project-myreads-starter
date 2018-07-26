import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {

  // Function to filter books for shelf categories.
  categoryBooks = (books, shelf) => {
    return books.filter((book) => book.shelf === shelf)
  }


  render(){
    const { books, onUpdateBooks } = this.props;
    let currentBooks, readBooks, wantBooks;
      // Books split using categoryBooks function
      currentBooks = this.categoryBooks(books, "currentlyReading")
      wantBooks = this.categoryBooks(books, "wantToRead")
      readBooks = this.categoryBooks(books, "read")

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/* Component bookshelf render 3 times with appropriate props. */}
            <BookShelf title="Currently Reading" books={currentBooks} onUpdateBooks={onUpdateBooks}/>
            <BookShelf title="Want to Read" books={wantBooks} onUpdateBooks={onUpdateBooks}/>
            <BookShelf title="Read" books={readBooks} onUpdateBooks={onUpdateBooks}/>
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
