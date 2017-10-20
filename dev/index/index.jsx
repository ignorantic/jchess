import React from 'react';
import ReactDOM from 'react-dom';
import Tal from '../components/app/app.jsx';
import './index.sass';
import '../img/favicon.png';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Tal />,
    document.getElementById('root')
  );
});
