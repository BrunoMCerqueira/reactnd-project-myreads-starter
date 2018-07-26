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
      // API search returns all books match query
      BooksAPI.search(query).then((books)=> {
        // Check if exist books matching the query
        if (!books.error) {
          // API getAll returns books with shelf != none
          BooksAPI.getAll(books).then((searchedBooks) => {
            /**
            * Join the noneBooks (shelf = none) with the return from API getAll
            * to have all books with shelf prop.
            */
            const IDsSearchedBook = searchedBooks.map(searchedBook => searchedBook.id);
            books.forEach((book) => book.shelf = 'none');
            const noneBooks = books.filter(book => !IDsSearchedBook.includes(book.id));
            const totalBooks = [...noneBooks, ...searchedBooks];
            return totalBooks;
          }).then((totalBooks => {
            this.setState({ searchedBooks: totalBooks })
          }))
        } else {
          this.setState({ searchedBooks: [] })
        }
      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  // Change the shelf of the book after updateBooks called from Book component function
  updateBooks = (book, shelf)=> {
    BooksAPI.update(book, shelf).then(
    BooksAPI.getAll().then((books) => {
        this.setState({ books })
      }))
    }

  render() {
    return (
      <div className="app">
        {/*Render 2 pages: SearchBook and ListBooks, with their own routers and props.*/}
        <Route exact path="/search" render={()=> (
          <SearchBook
            onSearchBooks={this.searchBooks}
            books={ this.state.searchedBooks }
            onUpdateBooks={this.updateBooks}
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
