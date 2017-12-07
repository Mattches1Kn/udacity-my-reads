import React, {Component} from 'react';
import Book from './Book';
import * as BooksAPI from './../utils/BooksAPI';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
let debounce = require('throttle-debounce/debounce');

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            books: [],
            showNoResults: false
        };
        this.doSearch = debounce(400, this.doSearch);//call search only once in given milliseconds
    }

    onInputChange = (e) => {
        const query = e.target.value.trim();
        this.setState({
            query: query
        });
        if (query.length > 2) {
            this.doSearch(query);
        }
    };

    doSearch = (query) => {
       BooksAPI.search(query).then(books => {
            if (books.error) {
                this.setState({
                    books: [],
                    showNoResults: true
                });
            } else {
                // add attribute shelf to all books from search and take shelf from already selected books
                let booksModified = books.map((book) => {
                    let o = Object.assign({}, book);
                    let result = this.props.books.find((bookInShelf) => bookInShelf.id === book.id);
                    o.shelf = result ? result.shelf : 'none';
                    return o;
                });
                this.setState({
                    books: booksModified,
                    showNoResults: false
                });
            }
        });
    };

    clearQuery = () => {
        this.setState({
            query: '',
            books: [],
            showNoResults: false
        });
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={this.state.query}
                            placeholder="Search by title or author"
                            onChange={(event) => this.onInputChange(event)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map((book) => (
                            <li key={book.id}>
                                <Book
                                    bookShelves={this.props.bookShelves}
                                    onChangeShelf={this.props.onChangeShelf}
                                    book={book}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
                {this.state.showNoResults && (
                    <div className="search-books-no-results">
                        <h2>Sorry, there are no results for your query <i>'{this.state.query}'</i></h2>
                        <button onClick={this.clearQuery}>Clear Query</button>
                    </div>
                )}
            </div>
        )
    };
}

BookSearch.propTypes = {
    books: PropTypes.array.isRequired,
    bookShelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default BookSearch;