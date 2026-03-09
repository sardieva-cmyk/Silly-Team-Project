import React from 'react';

// Простой футер с дополнительной информацией о проекте
const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <p style={{ margin: 0 }}>
          © 2026 IT-School. Все права защищены. «Silly Team» – обучающий проект в стиле
          программиста. Поддержка: <a href="mailto:support@it-school.example.com">support@it-school.example.com</a>
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem' }}>
          Версия 1.0.0 | <a href="https://github.com/silly-team/it-school" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#0d1117',
  color: '#8b949e',
  textAlign: 'center',
  borderTop: '1px solid #30363d',
  marginTop: '40px'
};

export default Footer;
