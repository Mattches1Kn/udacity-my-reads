import React from 'react';
import './App.css';
import BookShelf from '../components/BookShelf';
import Loader from 'react-loader';
import {Link} from 'react-router-dom';

class BookShelfList extends React.Component {

    render() {
        const {bookShelves, loaded, books} = this.props;
        return <div className="list-books">
            <Loader loaded={loaded} color="#fff"/>
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {bookShelves.map((shelf) => (
                    <div key={shelf.filter}>
                        <BookShelf
                            bookShelves={bookShelves}
                            onChangeShelf={this.props.onChangeShelf}
                            title={shelf.title}
                            filter={shelf.filter}
                            books={books.filter((book) => (book.shelf === shelf.filter))}
                        />
                    </div>
                ))}
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    }
}

export default BookShelfList;
