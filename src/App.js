import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Library from './Library';
import SearchPage from './SearchPage';
import shelves from './shelves.json';

class BooksApp extends React.Component {
  static childContextTypes = {
    handleMoveBook: PropTypes.func,
    shelves: PropTypes.object,
  };
  state = {
    booksLoaded: false,
    books: [],
    query: '',
    searchedBooks: [],
    searchedQuery: '',
    lastRespondedCall: '',
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books, booksLoaded: true});
    });
  }
  getChildContext() {
    return {handleMoveBook: this.handleMoveBook, shelves};
  }
  queryChange = e => {
    const query = e.target.value;
    const time = new Date();
    this.setState({ query });
    BooksAPI.search(query, 20).then(books => {
      this.setState(state => {
        if (time > state.lastRespondedCall) {
          const searchedBooks = (Array.isArray(books)
            ? books
            : []).map(searchedBook => {
              const bookInLibrary = state.books.find(
                ({ id }) => id === searchedBook.id,
              );
              const shelf = bookInLibrary ? bookInLibrary.shelf : 'none';
              return {
                ...searchedBook,
                shelf,
              };
            });
          return {
            lastRespondedCall: time,
            searchedBooks,
            searchedQuery: query,
          };
        } else {
          return {};
        }
      });
    });
  };
  handleMoveBook = (e, book) => {
    const shelf = e.target.value;
    BooksAPI.update(book, shelf);
    this.setState(state => {
      const index = state.books.findIndex(({ id }) => book.id === id);
      const books =
        index === -1
          ? [...state.books, { ...book, shelf }]
          : [...state.books.slice(0, index),
          {
            ...state.books[index],
            shelf,
          },
          ...state.books.slice(index + 1),
          ];
      const searchedBookIndex = state.searchedBooks.findIndex(
        ({ id }) => book.id === id,
      );
      const searchedBooks =
        searchedBookIndex === -1
          ? state.searchedBooks
          : [...state.searchedBooks.slice(0, searchedBookIndex),
          {
            ...state.searchedBooks[searchedBookIndex],
            shelf,
          },
          ...state.searchedBooks.slice(searchedBookIndex + 1),
          ];
      return {
        books,
        searchedBooks,
      };
    });
  };

  render() {
    const {
      booksLoaded,
      books,
      searchedBooks,
      searchedQuery,
      query,
    } = this.state;
    if (booksLoaded)
      return (
        <div className="app">
          <Route
            path="/search"
            render={() =>
              <SearchPage
                books={searchedBooks}
                onQueryChange={this.queryChange}
                query={query}
                searchedQuery={searchedQuery}
              />}
          />
          <Route exact path="/" render={() => <Library books={books} />} />
        </div>
      );
    return <div className="loader">Loading...</div>;
  }
}

export default BooksApp;
