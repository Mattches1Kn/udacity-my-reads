import React from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import {Route, Link} from 'react-router-dom';
import './App.css';
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';
import Loader from 'react-loader';

class App extends React.Component {

    state = {
        books: [],
        loaded : false
    };

    refreshShelves = () => {
        BooksAPI.getAll().then(books => {
            if (books.error) {
                this.setState({
                    loaded: true
                });
            } else {
                this.setState({
                    books: books,
                    loaded: true
                })
            }
        });
    };

    componentDidMount() {
        this.refreshShelves();
    };

    changeShelf = (book, newShelf, doneCallback) => {
        this.setState({
            loaded: false//will be set to true in refreshShelves
        });
        BooksAPI.update(book, newShelf).then(data => {
                this.refreshShelves();
                if (doneCallback) {
                    doneCallback();
                }
            }
        );
    };

    render() {
        const {bookShelves} = this.props;
        const {books, loaded} = this.state;
        return (
            <div className="app">

                <Route exact path="/" render={() => (

                    <div className="list-books">
                        <Loader loaded={loaded} color="#fff"/>
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            {bookShelves.map((shelf) => (
                                <div key={shelf.filter}>
                                    <BookShelf
                                        bookShelves={bookShelves}
                                        onChangeShelf={this.changeShelf}
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
                )}/>
                <Route exact path="/search" render={({history}) => (
                    <BookSearch
                        bookShelves={bookShelves}
                        books={books}
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
