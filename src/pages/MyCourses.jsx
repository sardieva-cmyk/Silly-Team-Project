import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unrollCourse } from '../store/actions/courseActions';

const MyCourses = () => {
  // Берем ID записанных курсов и полный список курсов
  const enrolledIds = useSelector(state => state.user.enrolledCourses);
  const allCourses = useSelector(state => state.courses.allCourses);
  const dispatch = useDispatch();

  // Фильтруем: оставляем только то, на что юзер записался
  const myEnrolledCourses = allCourses.filter(course => enrolledIds.includes(course.id));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Мои записи</h2>
      {myEnrolledCourses.length === 0 ? (
        <p>Вы еще не записались ни на один курс.</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {myEnrolledCourses.map(course => (
            <div key={course.id} style={{ border: '1px solid #28a745', padding: '15px', borderRadius: '8px', width: '200px' }}>
              <h3>{course.title}</h3>
              <button 
                onClick={() => dispatch(unrollCourse(course.id))}
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
              >
                Отменить запись
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;