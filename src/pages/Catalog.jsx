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
    <div style={{ padding: '20px', backgroundColor: '#0f0f0f', color: '#c9d1d9' }}>
      <h2>Все курсы программирования</h2>
      <p style={{ fontStyle: 'italic', color: '#8b949e' }}>
        Добро пожаловать в нашу виртуальную IT‑школу! Здесь вы можете просматривать доступные курсы и
        записываться на обучение. Проект создан как учебный демо-сайт для команды Silly Team.
      </p>

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
                  style={{ ...buttonStyle, backgroundColor: '#f85149' }}
                >
                  Удалить 
                </button>
              ) : (
                <button 
                  disabled={isEnrolled}
                  onClick={() => dispatch(enrollCourse(course.id))}
                  style={{ 
                    ...buttonStyle, 
                    backgroundColor: isEnrolled ? '#444c56' : '#238636',
                    cursor: isEnrolled ? 'not-allowed' : 'pointer',
                    color: '#c9d1d9'
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
const adminFormStyle = { background: '#111827', padding: '15px', borderRadius: '10px', marginBottom: '30px', border: '2px dashed #4e5d6c', color: '#c9d1d9' };
const inputStyle = { padding: '8px', marginRight: '10px', borderRadius: '5px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: '#c9d1d9' };
const addButtonStyle = { padding: '8px 15px', backgroundColor: '#238636', color: '#c9d1d9', border: 'none', borderRadius: '5px', cursor: 'pointer', fontFamily: 'monospace' };
const cardStyle = { border: '1px solid #30363d', padding: '20px', borderRadius: '10px', width: '250px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#161b22', color: '#c9d1d9' };
const buttonStyle = { border: 'none', padding: '10px 15px', color: 'white', borderRadius: '5px', width: '100%', fontWeight: 'bold', fontFamily: 'monospace' };

export default Catalog;