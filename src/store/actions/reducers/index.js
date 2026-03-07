import { createStore } from 'redux';
import rootReducer from './reducers'; // Подхватит index.js из папки reducers

// Создаем хранилище
const store = createStore(
  rootReducer,
  // Эта строка нужна, чтобы ты мог дебажить проект через расширение Redux DevTools в браузере
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;