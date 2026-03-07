// src/store/actions/reducers/userReducer.js
// Редюсер состояния пользователя: имя и список ID курсов, на которые он записан.
import { ENROLL_COURSE, UNROLL_COURSE } from '../courseActions'; // Проверь путь импорта!

const initialState = {
  name: "Student",
  enrolledCourses: [] // Массив для хранения ID курсов
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ENROLL_COURSE:
      // Защита: не записывать на один и тот же курс дважды
      if (state.enrolledCourses.includes(action.payload)) return state;
      
      return {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.payload]
      };

    case UNROLL_COURSE:
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.filter(id => id !== action.payload)
      };

    default:
      return state;
  }
};