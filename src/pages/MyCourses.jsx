// src/pages/MyCourses.jsx
// Страница с курсами, куда пользователь уже записался.
// Позволяет отменить запись и менять статус прогресса.

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unrollCourse, updateCourseStatus } from '../store/actions/courseActions';

const STATUS_OPTIONS = [
  { value: 'not_started', label: 'Не начат', color: '#6c757d' },
  { value: 'in_progress', label: 'В процессе', color: '#ffc107' },
  { value: 'completed',   label: 'Завершён',   color: '#28a745' }
];

const MyCourses = () => {
  const enrolledIds     = useSelector(state => state.user.enrolledCourses);
  const courseStatuses  = useSelector(state => state.user.courseStatuses || {});
  const allCourses      = useSelector(state => state.courses.allCourses);
  const dispatch        = useDispatch();

  const myEnrolledCourses = allCourses.filter(course => enrolledIds.includes(course.id));

  return (
    <div style={{ padding: '20px', backgroundColor: '#0f0f0f' }}>
      <h2>Мои записи</h2>

      {myEnrolledCourses.length === 0 ? (
        <p>Вы еще не записались ни на один курс.</p>
      ) : (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {myEnrolledCourses.map(course => {
            const currentStatus = courseStatuses[course.id] || 'not_started';
            const statusInfo = STATUS_OPTIONS.find(opt => opt.value === currentStatus) || STATUS_OPTIONS[0];

            return (
              <div
                key={course.id}
                style={{
                  border: `1px solid ${statusInfo.color}`,
                  padding: '16px',
                  borderRadius: '10px',
                  width: '260px',
                  backgroundColor: currentStatus === 'completed' ? '#161b22' : '#0f0f0f',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s',
                  color: '#c9d1d9'
                }}
              >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>
                  {course.title}
                </h3>

                <div style={{ marginBottom: '12px' }}>
                  <strong>Статус: </strong>
                  <span style={{
                    color: statusInfo.color,
                    fontWeight: 'bold'
                  }}>
                    {statusInfo.label}
                  </span>
                </div>

                <select
                  value={currentStatus}
                  onChange={(e) => dispatch(updateCourseStatus(course.id, e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '12px',
                    borderRadius: '6px',
                    border: '1px solid #30363d',
                    backgroundColor: '#0d1117',
                    color: '#c9d1d9',
                    fontSize: '0.95rem'
                  }}
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => dispatch(unrollCourse(course.id))}
                  style={{
                    backgroundColor: '#f85149',
                    color: '#c9d1d9',
                    border: 'none',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    width: '100%',
                    fontWeight: 'bold',
                    fontFamily: 'monospace'
                  }}
                >
                  Отменить запись
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;