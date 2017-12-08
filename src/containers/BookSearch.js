import React, {Component} from 'react';
import Book from '../components/Book';
import * as BooksAPI from '../utils/BooksAPI';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
const debounce = require('throttle-debounce/debounce');
import Loader from 'react-loader';

class BookSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchResults: [],
            showNoResultsMessage: false,
            loaded : true
        };
        this.doSearch = debounce(400, this.doSearch);//call search only once in given milliseconds
    }

    onInputChange = (e) => {
        let query = e.target.value;
        this.setState({
            query: query,
            showNoResultsMessage: false,
        });
        query = query.trim();
        if (query.length > 2) {
            this.setState({
                loaded: false
            });
            this.doSearch(query);
        } else {
            this.setState({
                searchResults: [],
                loaded: true
            });
        }
    };

    doSearch = (query) => {

       BooksAPI.search(query).then(searchResults => {
            if (searchResults.error) {
                this.setState({
                    searchResults: [],
                    showNoResultsMessage: true,
                    loaded: true
                });
            } else {
                // add attribute shelf to all books from search and take shelf from already selected books
                let searchResultsModified = searchResults.map((book) => {
                    let o = Object.assign({}, book);
                    let result = this.props.books.find((bookInShelf) => bookInShelf.id === book.id);
                    o.shelf = result ? result.shelf : 'none';
                    return o;
                });
                this.setState({
                    searchResults: searchResultsModified,
                    showNoResultsMessage: false,
                    loaded: true
                });
            }
        });
    };

    clearQuery = () => {
        this.setState({
            query: '',
            books: [],
            showNoResultsMessage: false,
            loaded: true
        });
    };

    onChangeShelf = (book, shelf) => {
        this.setState({
            loaded: false
        });
        book.shelf = shelf;
        this.props.onChangeShelf(book, shelf, this.onChangeShelfDone);
    };

    onChangeShelfDone = () => {
        this.setState({
            loaded: true
        });
    };

    render() {
        const {query, searchResults, showNoResultsMessage, loaded} = this.state;
        const {bookShelves} = this.props;
        return (
            <div className="search-books">
                <Loader loaded={loaded} color="#fff"/>
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={query}
                            placeholder="Search by title or author (minimum 3 characters)"
                            onChange={(event) => this.onInputChange(event)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResults.map((book) => (
                            <li key={book.id}>
                                <Book
                                    bookShelves={bookShelves}
                                    onChangeShelf={this.onChangeShelf}
                                    book={book}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
                {showNoResultsMessage && (
                    <div className="search-books-no-results">
                        <h2>Sorry, there are no results for your query <i>'{query}'</i></h2>
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
