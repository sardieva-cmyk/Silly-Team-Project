// src/store/actions/reducers/userReducer.js
import { ENROLL_COURSE, UNROLL_COURSE } from '../courseActions';

// Новое действие — добавим его позже в courseActions.js
export const UPDATE_COURSE_STATUS = 'UPDATE_COURSE_STATUS';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  enrolledCourses: JSON.parse(localStorage.getItem('myEnrolledCourses')) || [],
  courseStatuses: JSON.parse(localStorage.getItem('courseStatuses')) || {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('myEnrolledCourses');
      localStorage.removeItem('courseStatuses');
      return {
        ...state,
        currentUser: null,
        enrolledCourses: [],
        courseStatuses: {}
      };

    case ENROLL_COURSE: {
      const courseId = action.payload;

      // Защита от дублирования (на всякий случай)
      if (state.enrolledCourses.includes(courseId)) {
        return state;
      }

      const updatedEnrolled = [...state.enrolledCourses, courseId];
      const updatedStatuses = {
        ...state.courseStatuses,
        [courseId]: 'not_started'   // статус по умолчанию
      };

      localStorage.setItem('myEnrolledCourses', JSON.stringify(updatedEnrolled));
      localStorage.setItem('courseStatuses', JSON.stringify(updatedStatuses));

      return {
        ...state,
        enrolledCourses: updatedEnrolled,
        courseStatuses: updatedStatuses
      };
    }

    case UNROLL_COURSE: {
      const courseId = action.payload;

      const filteredCourses = state.enrolledCourses.filter(id => id !== courseId);

      // Удаляем статус этого курса
      const { [courseId]: removed, ...remainingStatuses } = state.courseStatuses;

      localStorage.setItem('myEnrolledCourses', JSON.stringify(filteredCourses));
      localStorage.setItem('courseStatuses', JSON.stringify(remainingStatuses));

      return {
        ...state,
        enrolledCourses: filteredCourses,
        courseStatuses: remainingStatuses
      };
    }

    case UPDATE_COURSE_STATUS: {
      const { courseId, status } = action.payload;

      // Проверяем, что курс действительно записан
      if (!state.enrolledCourses.includes(courseId)) {
        return state;
      }

      const updatedStatuses = {
        ...state.courseStatuses,
        [courseId]: status
      };

      localStorage.setItem('courseStatuses', JSON.stringify(updatedStatuses));

      return {
        ...state,
        courseStatuses: updatedStatuses
      };
    }

    default:
      return state;
  }
};