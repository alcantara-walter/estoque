import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import React from 'react';

// Pages
import Login from './components/pages/Auth/Login'
import Registrar from './components/pages/Auth/Registrar'
import Message from './components/layout/Message';
import Menu from './components/pages/Auth/Menu';
import AdicionarItem from './components/pages/Menu/AdicionarItems';
import RemoverItem from './components/pages/Menu/RemoverItems';
import Total from './components/pages/Menu/Total';
import Saida from './components/pages/Menu/Saida';
import Entrada from './components/pages/Menu/Entrada';
import NotFound from './components/pages/NotFound/404'

// Layout
import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'

// Rota Protegida
import ProtectedRoutes from './components/layout/ProtectedRoutes';

// Context
import { UserProvider } from './context/UserContext';

function App() {

  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message/>
        <Container>
          <Routes>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />

            <Route path="/login" element={isAuthenticated ? <Navigate to="/menu" replace /> : <Login />} />
            <Route path="/registrar" element={isAuthenticated ? <Navigate to="/menu" replace /> : <Registrar />} />

            <Route path="/menu" element={
              <ProtectedRoutes>
                <Menu />
              </ProtectedRoutes>
            } />
            <Route path="/adicionar-item" element={
              <ProtectedRoutes>
                <AdicionarItem />
              </ProtectedRoutes>
            } />
            <Route path="/remover-item" element={
              <ProtectedRoutes>
                <RemoverItem />
              </ProtectedRoutes>
            } />
            <Route path="/saida" element={
              <ProtectedRoutes>
                <Saida />
              </ProtectedRoutes>
            } />
            <Route path="/entrada" element={
              <ProtectedRoutes>
                <Entrada />
              </ProtectedRoutes>
            } />
            <Route path="/estoque" element={
              <ProtectedRoutes>
                <Total />
              </ProtectedRoutes>
            } />
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  );
}

export default App;
