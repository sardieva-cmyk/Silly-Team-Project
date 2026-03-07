import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const count = useSelector(state => state.user.enrolledCourses.length);

  return (
    <header style={headerStyle}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h1>IT-School</h1>
      </Link>
      <nav>
        <Link to="/" style={linkStyle}>Каталог</Link>
        <Link to="/my-courses" style={linkStyle}>
          Мои курсы <span style={badgeStyle}>{count}</span>
        </Link>
      </nav>
    </header>
  );
};

// Простые стили для наглядности
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', background: '#2c3e50', color: 'white' };
const linkStyle = { color: 'white', marginLeft: '20px', textDecoration: 'none', fontWeight: 'bold' };
const badgeStyle = { background: '#e74c3c', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' };

export default Header;