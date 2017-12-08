import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

    changeBookShelf = (value) => {
        this.props.onChangeShelf(this.props.book, value);
    };

    render() {
        const {book} = this.props;
        const thumbnail = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover';
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{backgroundImage: `url(${thumbnail})`}}>
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.changeBookShelf(event.target.value)} value={book.shelf}>
                            <option value="" disabled>Move to...</option>
                            {this.props.bookShelves.map( (bookShelf) => (
                                <option key={bookShelf.filter} value={bookShelf.filter}>{bookShelf.title}</option>
                            ))}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
            </div>
        )
    };
}

Book.propTypes = {
    book : PropTypes.object.isRequired,
    bookShelves : PropTypes.array.isRequired,
    onChangeShelf : PropTypes.func.isRequired
};

export default Book;
