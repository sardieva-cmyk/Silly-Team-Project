// src/store/actions/courseActions.js
// Действия для управления подписками на курсы:
// регистрация (enroll) и отписка (unroll).

// Типы действий (Constants)
export const ENROLL_COURSE = 'ENROLL_COURSE';
export const UNROLL_COURSE = 'UNROLL_COURSE';

// Action Creators (Создатели действий)
export const enrollCourse = (courseId) => ({
  type: ENROLL_COURSE,
  payload: courseId
});

export const unrollCourse = (courseId) => ({
  type: UNROLL_COURSE,
  payload: courseId
});