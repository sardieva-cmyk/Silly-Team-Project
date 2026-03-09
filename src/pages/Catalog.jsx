import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enrollCourse } from '../store/actions/courseActions';

const Catalog = () => {
  const allCourses = useSelector(state => state.courses.allCourses);
  const enrolledIds = useSelector(state => state.user.enrolledCourses);
  const user = useSelector(state => state.user.currentUser); // Получаем юзера и его роль
  const dispatch = useDispatch();

  // Состояние для формы нового курса (для админа)
  const [newCourse, setNewCourse] = useState({ title: '', mentor: '' });

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.mentor) {
      dispatch({ type: 'ADD_COURSE', payload: newCourse });
      setNewCourse({ title: '', mentor: '' });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Все курсы программирования</h2>

      {/* Блок добавления курса — виден только Админу */}
      {user?.role === 'admin' && (
        <div style={adminFormStyle}>
          <h3>Панель администратора: Добавить курс</h3>
          <input 
            placeholder="Название курса" 
            value={newCourse.title}
            onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
            style={inputStyle}
          />
          <input 
            placeholder="Преподаватель" 
            value={newCourse.mentor}
            onChange={(e) => setNewCourse({...newCourse, mentor: e.target.value})}
            style={inputStyle}
          />
          <button onClick={handleAddCourse} style={addButtonStyle}>Создать курс</button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {allCourses.map(course => {
          const isEnrolled = enrolledIds.includes(course.id);

          return (
            <div key={course.id} style={cardStyle}>
              <h3>{course.title}</h3>
              <p>Преподаватель: {course.mentor}</p>
              
              {/* Если Админ — кнопка Удалить, если Студент — Записаться */}
              {user?.role === 'admin' ? (
                <button 
                  onClick={() => dispatch({ type: 'DELETE_COURSE', payload: course.id })}
                  style={{ ...buttonStyle, backgroundColor: '#e74c3c' }}
                >
                  Удалить 
                </button>
              ) : (
                <button 
                  disabled={isEnrolled}
                  onClick={() => dispatch(enrollCourse(course.id))}
                  style={{ 
                    ...buttonStyle, 
                    backgroundColor: isEnrolled ? '#bdc3c7' : '#2ecc71',
                    cursor: isEnrolled ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isEnrolled ? 'Вы уже записаны' : 'Записаться'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Стили
const adminFormStyle = { background: '#f9f9f9', padding: '15px', borderRadius: '10px', marginBottom: '30px', border: '2px dashed #2c3e50' };
const inputStyle = { padding: '8px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const addButtonStyle = { padding: '8px 15px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const cardStyle = { border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '250px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const buttonStyle = { border: 'none', padding: '10px 15px', color: 'white', borderRadius: '5px', width: '100%', fontWeight: 'bold' };

export default Catalog;