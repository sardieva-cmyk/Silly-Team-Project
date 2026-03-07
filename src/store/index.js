// src/store/index.js
// Собирает rootReducer и создаёт Redux store.
// Подключает devtools для удобной отладки.
import { createStore, combineReducers } from 'redux';
// Импортируем редюсеры по твоему пути из папки actions
import { userReducer } from './actions/reducers/userReducer';
import { courseReducer } from './actions/reducers/courseReducer';

const rootReducer = combineReducers({
  user: userReducer,
  courses: courseReducer
});

const store = createStore(
  rootReducer,
  // Для работы расширения в браузере
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;