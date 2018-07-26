import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {


  render(){
    const { books, onUpdateBooks } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books && books.map((book, i) => (
              <Book key={i} book={book} onUpdateBooks={onUpdateBooks}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default BookShelf;
