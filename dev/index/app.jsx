
/**
 *     app.js for jChess project
 *     2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jchess.git
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Tal from '../components/tal/tal.jsx';

document.addEventListener('DOMContentLoaded', () => {

    ReactDOM.render(
        <Tal />,
        document.getElementById('root')
    );

});
