// src/pages/CourseDetail.jsx
// Показывает подробности одного курса на основе ID из URL.
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CourseDetail = () => {
  const { id } = useParams(); // Получаем ID из URL
  const course = useSelector(state => 
    state.courses.allCourses.find(c => c.id === parseInt(id))
  );

  if (!course) return <h2>Курс не найден</h2>;

  return (
    <div style={{ padding: '40px' }}>
      <Link to="/">← Назад в каталог</Link>
      <h1>{course.title}</h1>
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
        <p><b>О курсе:</b> {course.desc}</p>
        <p><b>Ментор:</b> {course.mentor}</p>
        <p><b>Стоимость:</b> {course.price}</p>
        <p><b>Длительность:</b> 3 месяца интенсивной практики.</p>
      </div>
    </div>
  );
};

export default CourseDetail;