import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { legacy_createStore as createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import reportWebVitals from './reportWebVitals';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
