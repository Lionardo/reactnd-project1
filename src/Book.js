import React from 'react';
import PropTypes from 'prop-types';

const Book = (props, {handleMoveBook, shelves}) =>
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${props.imageLinks &&
            props.imageLinks.smallThumbnail})`,
        }}
      />
      <div className="book-shelf-changer">
        <select
          onChange={e => {
            handleMoveBook(e, props);
          }}
          value={props.shelf}
        >
          <option disabled>Move to...</option>
          {Object.entries(shelves).map(([shelf, title]) =>
            <option
              key={shelf}
              value={shelf}
              defaultValue={shelf === props.shelf}
            >
              {shelf === props.shelf && '✔ '}
              {title}
            </option>,
          )}
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">
      {props.title}
    </div>
    {props.authors &&
      <div className="book-authors">
        {props.authors.map(author =>
          <div key={author}>
            {author}
          </div>,
        )}
      </div>}
  </div>;
Book.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.string.isRequired),
  imageLinks: PropTypes.object,
  shelf: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
Book.contextTypes = {
  handleMoveBook: PropTypes.func.isRequired,
  shelves: PropTypes.object.isRequired,
};

export default Book;
