import React from 'react'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchedBooks: []
  }

  // Set state of books after API call
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // Set state of searchedBooks after searchBooks called from SearchBook component function
  searchBooks = (query)=> {
    if (query) {
      console.log(this.state.books)
      // API search returns all books match query
      BooksAPI.search(query).then((searchedBooks)=> {
        // Check if exist books matching the query
        if (!searchedBooks.error) {
          // Take all ids from books searched, and filter the state books with those ids
          const IDsSearchedBook = searchedBooks.map(book => book.id);
          const actualBooks = this.state.books.filter(book => {
            return IDsSearchedBook.includes(book.id)
          })
          // Take all ids from books on state, and filter the searched books without those ids
          const IDsBook = actualBooks.map(book => book.id);
          const filterSearchedBooks = searchedBooks.filter(book => {
            return !IDsBook.includes(book.id);
          })

          // Join the books from state that comes in the search, with the rest of the search
          const totalBooks = [...filterSearchedBooks, ...actualBooks];

          this.setState({ searchedBooks: totalBooks })
        } else {
          this.setState({ searchedBooks: [] })
        }
      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  // Change the shelf of the book after updateBooks called from Book component function in list
  updateBooks = (book, shelf)=> {
    let shelfBooks = this.state.books;
    // Update state.books with new shelf of the book changed.
    shelfBooks[shelfBooks.indexOf(book)].shelf = shelf;
    this.setState({
      books: [...shelfBooks]
    })
    // Call update API to store the changes.
    BooksAPI.update(book, shelf)
  }

  // Change the shelf of the book after updateBooks called from Book component in Search.
  updateSearchedBooks = (book, shelf)=> {
    let searchedBooks;
    let shelfBooks = this.state.books;
    // Firstable we add the book to state.books if necessary.
    if(!shelfBooks.includes(book)) {
      this.setState({
        books: [...shelfBooks, book]
      })
    }
    // We call the API to update and update state.searchedBooks.
    BooksAPI.update(book, shelf).then(
      searchedBooks = this.state.searchedBooks.map(searchedBook => {
        if(searchedBook.id === book.id) {
          searchedBook.shelf = shelf
        }
        return searchedBook
      })
    )
    this.setState({ searchedBooks })
  }

  render() {
    return (
      <div className="app">
        {/*Render 2 pages: SearchBook and ListBooks, with their own routers and props.*/}
        <Route exact path="/search" render={()=> (
          <SearchBook
            onSearchBooks={this.searchBooks}
            books={ this.state.searchedBooks }
            onUpdateBooks={this.updateSearchedBooks}
          />
        )}/>
        <Route exact path="/" render={()=> (
          <ListBooks books={this.state.books}
            onUpdateBooks={this.updateBooks}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
