import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // Exemplo simples de verificação

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
