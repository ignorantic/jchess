import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../app/app';
import '../scss/fonts.scss';
import '../scss/vendors.scss';
import '../img/favicon.png';

document.addEventListener('DOMContentLoaded', () => {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root'),
    );
  };

  render(App);

  if (module.hot) {
    module.hot.accept('../app/app', () => render(App));
  }
});
