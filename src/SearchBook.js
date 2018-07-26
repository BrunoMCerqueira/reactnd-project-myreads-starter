import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class SearchBook extends Component {

  state = {
    query: ''
  }

  // Function triggered after input change (Call API in App.js)
  updateQuery = (query) => {

    this.setState({ query: query })
    this.props.onSearchBooks(query)

  }

  render() {
    const { books, onUpdateBooks } = this.props
    const { query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input className='search-contacts' type='text' placeholder='Search by title or author'
              value={query}
              onChange={(event) =>
                this.updateQuery(event.target.value)
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelf books={books} title="" onUpdateBooks={onUpdateBooks}/>
          </ol>
        </div>
      </div>
    )
  }
}


export default SearchBook;
