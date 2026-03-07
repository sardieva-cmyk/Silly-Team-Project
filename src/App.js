// src/App.js
// Основной компонент приложения, точка входа React-части.
// Оборачивает контент в Router, подключает Header и
// определяет маршруты для страниц каталога, моих курсов и деталей.
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Catalog from './pages/Catalog';
import MyCourses from './pages/MyCourses';
import CourseDetail from './pages/CourseDetail';

function App() {
  return (
    <Router>
      <Header />
      <div className="container"> 
        {/* маршруты: каталог, мои курсы, детали и 404 */}
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="*" element={<h2 style={{textAlign: 'center'}}>404</h2>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;