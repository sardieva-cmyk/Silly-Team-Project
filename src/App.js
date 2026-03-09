import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Catalog from './pages/Catalog';
import MyCourses from './pages/MyCourses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login'; // Импортируем страницу входа
import About from './pages/About'; // Страница "О проекте"

function App() {
  return (
    <Router>
      <Header />
      <div className="container" style={{ marginTop: '20px' }}> 
        <Routes>
          {/* Главная: каталог всех курсов */}
          <Route path="/" element={<Catalog />} />
          
          {/* Страница входа и выбора роли */}
          <Route path="/login" element={<Login />} />
          
          {/* Личный кабинет студента */}
          <Route path="/my-courses" element={<MyCourses />} />
          
          {/* Детальная информация о курсе */}
          <Route path="/course/:id" element={<CourseDetail />} />
          
          {/* О проекте */}
          <Route path="/about" element={<About />} />
          
          {/* Обработка несуществующих страниц */}
          <Route path="*" element={<h2 style={{textAlign: 'center', marginTop: '50px', color: '#ff6a3d'}}>404: Страница не найдена</h2>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;