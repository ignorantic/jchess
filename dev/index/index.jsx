import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/app/app';
import store from '../modules/stores/store';
import './index.sass';
import '../img/favicon.png';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root'),
  );
});
