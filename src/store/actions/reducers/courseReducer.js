const initialState = {
  allCourses: [
    { id: 1, title: "React Developer", mentor: "Abdurakhim", price: "200$", desc: "Mastering hooks and Redux" },
    { id: 2, title: "Backend Python", mentor: "Salim", price: "180$", desc: "Django and FastAPI" },
    { id: 3, title: "UI/UX Design", mentor: "Karina", price: "150$", desc: "Figma and User Flow" },
    { id: 4, title: "Mobile Dev", mentor: "Amirkhan", price: "220$", desc: "React Native and Flutter" }
  ]
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    // 1. Создание (Create)
    case 'ADD_COURSE':
      const newCourse = { 
        ...action.payload, 
        id: Date.now(), // Генерируем уникальный ID
        price: action.payload.price || "0$", // Значения по умолчанию, если их нет в форме
        desc: action.payload.desc || "Описание скоро появится"
      };
      return { 
        ...state, 
        allCourses: [...state.allCourses, newCourse] 
      };

    // 2. Удаление (Delete)
    case 'DELETE_COURSE':
      return { 
        ...state, 
        allCourses: state.allCourses.filter(c => c.id !== action.payload) 
      };

    // 3. Редактирование (Update) - добавим на будущее
    case 'UPDATE_COURSE':
      return {
        ...state,
        allCourses: state.allCourses.map(c => 
          c.id === action.payload.id ? { ...c, ...action.payload } : c
        )
      };

    // DEFAULT ВСЕГДА В КОНЦЕ
    default:
      return state;
  }
};