import React, { Component } from 'react'


class Book extends Component {
  state = {
    value: ''
  }

  // Function triggered after select option change, calls API to update shelf in App.js.
  updateBooks = (book, value) => {
    this.setState({ value })
    this.props.onUpdateBooks(this.props.book, value)
  }

  // update state changes after API call.
  componentDidMount(){
    this.setState({ value: this.props.book.shelf });
  }

  render(){
    const { book } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {/* Check if the book has image*/}
            {book.imageLinks &&
              <div className="book-cover" style={{ width: 128, height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            }
            <div className="book-shelf-changer">
              <select value={this.state.value} onChange={(event) => this.updateBooks(book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
        {/* Check if the book has author*/}
          {book.authors && book.authors.map((author, index) => {
            return <div className="book-authors" key={index}>{author}</div>
          })}

        </div>
      </li>
    )
  }
}

export default Book;
