import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enrollCourse } from '../store/actions/courseActions';

const Catalog = () => {
  const allCourses = useSelector(state => state.courses.allCourses);
  const enrolledIds = useSelector(state => state.user.enrolledCourses);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Все курсы программирования</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {allCourses.map(course => {
          // Проверяем, записан ли юзер на конкретный курс
          const isEnrolled = enrolledIds.includes(course.id);

          return (
            <div key={course.id} style={cardStyle}>
              <h3>{course.title}</h3>
              <p>Преподаватель: {course.mentor}</p>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

const cardStyle = { border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '250px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const buttonStyle = { border: 'none', padding: '10px 15px', color: 'white', borderRadius: '5px', width: '100%', fontWeight: 'bold' };

export default Catalog;