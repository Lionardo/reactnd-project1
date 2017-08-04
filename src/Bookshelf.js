import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = ({books, title}) =>
  <div className="bookshelf">
    {title &&
      <h2 className="bookshelf-title">
        {title}
      </h2>}
    <div className="bookshelf-books">
      {books.length
        ? <ol className="books-grid">
            {books.map((book, index) =>
              <li
                key={
                  index /* should use book.id when https://github.com/udacity/reactnd-issues/issues/75 is fixed */
                }
              >
                <Book {...book} />
              </li>,
            )}
          </ol>
        : <p>There is currently no books in this shelf</p>}
    </div>
  </div>;

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default Bookshelf;
