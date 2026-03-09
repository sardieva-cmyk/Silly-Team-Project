/*
 src/index.js
 Точка входа клиентского приложения.
 Инициализирует корневой ReactDOM, оборачивает <App />
 в Redux Provider для доступа к хранилищу по всему дереву.
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store'; // Он сам найдет index.js внутри папки store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);