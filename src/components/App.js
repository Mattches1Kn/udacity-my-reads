import React from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import {Route, Link} from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';

class App extends React.Component {

    state = {
        books: []
    };

    refreshShelves = () => {
        BooksAPI.getAll().then(books => {
            if (books.error) {
                //
            } else {
                this.setState({
                    books: books
                })
            }
        });
    };

    componentDidMount() {
        this.refreshShelves();
    };

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(
            this.refreshShelves()
        );
    };

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            {this.props.bookShelves.map((shelf) => (
                                <div key={shelf.filter}>
                                    <BookShelf
                                        bookShelves={this.props.bookShelves}
                                        onChangeShelf={this.changeShelf}
                                        title={shelf.title}
                                        filter={shelf.filter}
                                        books={this.state.books.filter((book) => (book.shelf === shelf.filter))}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>
                <Route exact path="/search" render={({history}) => (
                    <BookSearch
                        bookShelves={this.props.bookShelves}
                        books={this.state.books}
                        onChangeShelf={this.changeShelf}
                        />
                )}/>
            </div>
        )
    }
}

App.defaultProps = {
    bookShelves : [
        {
            filter: 'currentlyReading',
            title: 'Currently Reading'
        },
        {
            filter: 'wantToRead',
            title: 'Want to read'
        },
        {
            filter: 'read',
            title: 'Read'
        }
    ]
};

export default App
