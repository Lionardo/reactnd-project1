import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Bookshelf from './Bookshelf';

const SearchPage = props =>
  <div className="search-books">
    <div className="search-books-bar">
      <Link to="/" className="close-search">
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          onChange={props.onQueryChange}
          value={props.query}
        />
      </div>
    </div>
    <div className="search-books-results">
      {props.searchedQuery &&
        <Bookshelf
          books={props.books}
          title={`${props.books.length
            ? 'Results for query:'
            : 'No results for query:'} ${props.searchedQuery}`}
        />}
    </div>
  </div>;

SearchPage.propTypes = {
  onQueryChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  searchedQuery: PropTypes.string,
};

export default SearchPage;
