import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!token || !usuario || usuario.rol !== 'usuario') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
