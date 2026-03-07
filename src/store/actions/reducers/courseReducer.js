// src/store/actions/reducers/courseReducer.js
// Редюсер, хранящий каталог всех доступных курсов.
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
    // Здесь мы просто возвращаем стейт, так как список курсов обычно не меняется юзером
    default:
      return state;
  }
};