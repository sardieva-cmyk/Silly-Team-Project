import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    const user = { 
      name: role === 'admin' ? 'Админ (Silly Team)' : 'Студент', 
      role: role 
    };
    dispatch({ type: 'LOGIN', payload: user }); // Этот экшен уже прописан в твоем userReducer
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: '#c9d1d9' }}>
      <h1>Добро пожаловать в IT-School</h1>
      <p>Выберите, как войти в систему:</p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button className="btn-enroll" onClick={() => handleLogin('student')}>Войти как Студент</button>
        <button className="btn-enroll admin" onClick={() => handleLogin('admin')}>Войти как Админ</button>
      </div>
    </div>
  );
};
export default Login;