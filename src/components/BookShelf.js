import React, { Component } from 'react';
import Book from './Book';
import BookDummy from './BookDummy';
import PropTypes from 'prop-types';

class BookShelf extends Component {

    render() {
        let {books, filter, title, bookShelves, onChangeShelf} = this.props;
        return (
            <div className="bookshelf" key={filter}>
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map( (book) => (
                            <li key={book.id}>
                                <Book
                                    bookShelves={bookShelves}
                                    onChangeShelf={onChangeShelf}
                                    book={book}
                                />
                            </li>
                        ))}
                        {books.length === 0 && (
                            <li key="0">
                                <BookDummy/>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    books : PropTypes.array.isRequired,
    title : PropTypes.string.isRequired,
    filter : PropTypes.string.isRequired,
    bookShelves : PropTypes.array.isRequired,
    onChangeShelf : PropTypes.func.isRequired
}

export default BookShelf;
