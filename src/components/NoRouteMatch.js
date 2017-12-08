import React from 'react';
import '../containers/App.css';
import {Link} from 'react-router-dom';

function NoRouteMatch()  {

    return (
        <div>
            <div className="list-books-title">
                <h1>404 : Ups, this page doesn't exist!</h1>
                <Link to="/" >Back</Link>
            </div>

        </div>
    );
}

export default NoRouteMatch;
