import React from 'react'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  }

  // Set state of books after API call
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }).catch(function(e) {
      console.log(e)
    })
  }

  // Set state of searchedBooks after searchBooks called from SearchBook component function
  searchBooks = (query)=> {
    if (query) {
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
    // Extracting, updating and inserting book in the shelfbooks
    const shelfBooks = this.state.books.filter(shelfBook => shelfBook.id !== book.id);
    book.shelf = shelf
    shelfBooks[shelfBooks.length] = book;
    // Update state.books with the book updated.
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
    // We update state.searchedBooks.
    searchedBooks = this.state.searchedBooks.map(searchedBook => {
      if(searchedBook.id === book.id) {
        searchedBook.shelf = shelf
      }
      return searchedBook
    })
    this.setState({ searchedBooks })
    // We call the API update.
    BooksAPI.update(book, shelf)
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
