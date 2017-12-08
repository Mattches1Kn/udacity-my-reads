import React from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import BookShelfList from './BookShelfList';
import BookSearch from './BookSearch';
import NoRouteMatch from '../components/NoRouteMatch';


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
        const {books,loaded} = this.state;
        return (
            <div className="app">
                <Switch>
                    <Route exact path="/" render={() => (
                        <BookShelfList loaded={loaded} onChangeShelf={this.changeShelf} bookShelves={bookShelves} books={books}/>
                    )}/>
                    <Route exact path="/search" render={({history}) => (
                        <BookSearch
                            bookShelves={bookShelves}
                            books={books}
                            onChangeShelf={this.changeShelf}
                        />
                    )}/>
                    <Route component={NoRouteMatch}/>
                </Switch>
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
