import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import store from '../modules/stores/store';
import App from '../components/app/app';
import './index.sass';
import '../img/favicon.png';

document.addEventListener('DOMContentLoaded', () => {
  const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Component store={store} />
      </AppContainer>,
      document.getElementById('root'),
    );
  };

  render(App);

  if (module.hot) {
    module.hot.accept('../components/app/app', () => render(App));
  }
});
