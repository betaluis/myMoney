

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import './index.css';

function appHeight() {
  const doc = document.documentElement
  doc.style.setProperty('--vh', (window.innerHeight*.01) + 'px');
}

window.addEventListener('resize', appHeight);
appHeight();

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>, 
  document.getElementById('root')
);