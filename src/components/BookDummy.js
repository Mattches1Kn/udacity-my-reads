import React, { Component } from 'react';

class BookDummy extends Component {

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover">
                        <div className="bookshelf-no-books">There are no books in this shelf</div>
                    </div>
                </div>
                <div className="book-title"> </div>
                <div className="book-authors"> </div>
            </div>
        )
    };
}

export default BookDummy;
