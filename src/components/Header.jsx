import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  // Получаем данные о пользователе и количестве курсов из Store
  const user = useSelector(state => state.user.currentUser);
  const count = useSelector(state => state.user.enrolledCourses.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login'); // Перенаправляем на логин после выхода
  };

  return (
    <header style={headerStyle}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h1>IT-School</h1>
      </Link>
      
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>Каталог</Link>
        <Link to="/about" style={linkStyle}>О проекте</Link>
        
        {/* Студент видит "Мои курсы", Админ — нет (ему они не нужны для обучения) */}
        {user?.role === 'student' && (
          <Link to="/my-courses" style={linkStyle}>
            Мои курсы <span style={badgeStyle}>{count}</span>
          </Link>
        )}

        {/* Секция профиля */}
        <div style={{ marginLeft: '30px', borderLeft: '1px solid #555', paddingLeft: '20px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '14px' }}>
                {user.name} <b style={{ color: '#2ecc71' }}>({user.role})</b>
              </span>
              <button onClick={handleLogout} style={logoutButtonStyle}>Выйти</button>
            </div>
          ) : (
            <Link to="/login" style={loginLinkStyle}>Войти</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

// Стили
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', background: '#0d1117', color: '#c9d1d9' };
const linkStyle = { color: '#58a6ff', marginLeft: '20px', textDecoration: 'none', fontWeight: 'bold' };
const badgeStyle = { background: '#f85149', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' };
const logoutButtonStyle = { background: 'transparent', border: '1px solid #f85149', color: '#f85149', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const loginLinkStyle = { ...linkStyle, color: '#2ea043' };

export default Header;