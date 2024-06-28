import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import { legacy_createStore as createstore, applyMiddleware, compose } from 'redux';
import {thunk} from "redux-thunk"
import reducers from './reducers';

// Thunk Middleware: redux-thunk is a middleware that allows you to write action creators that return a function instead of an action. This is useful for handling asynchronous operations.
// compose: A utility function that allows you to compose multiple store enhancers.
const store = createstore(reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();