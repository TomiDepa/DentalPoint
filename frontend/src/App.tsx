import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent = () => {
    const location = useLocation();

    // Solo muestro el header y footer en estas rutas
    const showHeaderFooterRoutes = ['', '/home'];
    const showHeaderFooter = showHeaderFooterRoutes.includes(location.pathname);

    return (
        <div className="app">
            {showHeaderFooter && <Header />}

            <div className="main-content">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/usuario" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    {/* Más rutas si querés agregar */}
                </Routes>
            </div>

            {showHeaderFooter && <Footer />}
        </div>
    );
};

export default App;
