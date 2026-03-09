// src/store/actions/reducers/userReducer.js
import { ENROLL_COURSE, UNROLL_COURSE } from '../courseActions'; 

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')) || null,
  enrolledCourses: JSON.parse(localStorage.getItem('myEnrolledCourses')) || []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...state, currentUser: null, enrolledCourses: [] };

    case ENROLL_COURSE: // Используем константу из импорта
      const updatedEnrolled = [...state.enrolledCourses, action.payload];
      localStorage.setItem('myEnrolledCourses', JSON.stringify(updatedEnrolled));
      return { ...state, enrolledCourses: updatedEnrolled };

    // --- ВОТ ЭТОГО БЛОКА НЕ ХВАТАЛО: ---
    case UNROLL_COURSE: 
      const filteredCourses = state.enrolledCourses.filter(id => id !== action.payload);
      localStorage.setItem('myEnrolledCourses', JSON.stringify(filteredCourses));
      return { ...state, enrolledCourses: filteredCourses };
    // ----------------------------------

    default:
      return state;
  }
};