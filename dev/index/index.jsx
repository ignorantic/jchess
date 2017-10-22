import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app/app.jsx';
import './index.sass';
import '../img/favicon.png';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
