import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import reduxThunk from 'redux-thunk';

import App from './components/App';
// import Welcome from './components/Welcome';
import ErrorPage from './components/ErrorPage';
import MarvelCharacters from './components/Marwel';

import reducers from './reducers';

// ========================================================
// Store Instantiation
// ========================================================

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const history = createBrowserHistory();
// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Switch>
            <Route exact path='/' component={MarvelCharacters} />
            <Route component={ErrorPage} />
          </Switch>
        </App>
      </Router>
    </Provider>
    , MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    module.hot.accept('./components/App', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      })
    );
  }
}

// ========================================================
// Go!
// ========================================================
render();
