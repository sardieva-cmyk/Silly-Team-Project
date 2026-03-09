// src/store/actions/courseActions.js
// Действия для управления подписками на курсы и их статусами

// Типы действий (Constants)
export const ENROLL_COURSE       = 'ENROLL_COURSE';
export const UNROLL_COURSE       = 'UNROLL_COURSE';
export const UPDATE_COURSE_STATUS = 'UPDATE_COURSE_STATUS';

// Action Creators (Создатели действий)
export const enrollCourse = (courseId) => ({
  type: ENROLL_COURSE,
  payload: courseId
});

export const unrollCourse = (courseId) => ({
  type: UNROLL_COURSE,
  payload: courseId
});

export const updateCourseStatus = (courseId, status) => ({
  type: UPDATE_COURSE_STATUS,
  payload: { courseId, status }
});