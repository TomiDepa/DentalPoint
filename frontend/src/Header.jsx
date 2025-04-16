import React, { useState, useEffect, useRef } from 'react';
import { Menu, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import axios from 'axios';

const Header = () => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controla si el dropdown está abierto
  const [userData, setUserData] = useState(null); // Para almacenar los datos del usuario
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  
  useEffect(() => {
    const fetchData = async (value) => {
      if (value.trim().length < 2) {
        setResultados([]);
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:5000/api/usuarios/buscar?query=${value}`);
        setResultados(response.data);
      } catch (error) {
        console.error("Error al buscar usuarios:", error);
      }
    };
  
    const timer = setTimeout(() => fetchData(query), 300);
    return () => clearTimeout(timer);
  }, [query]);
  
  // Cerrar el menú desplegable cuando se hace clic fuera del área del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResultados([]); // esto oculta las sugerencias
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleUsuarioClick = (id) => {
    setQuery('');
    setResultados([]);
    navigate(`/usuario/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUserData(null);
    navigate('/login');
  };
  

  const handleMenuToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAdmin = () => {
    navigate('/admin'); // Dirige al área de administración
  };

  const handleProfile = () => {
    navigate(`/usuario/${userData.id}`); // Dirige al perfil del usuario
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="./public/logo.png" alt="Logo" className="logo" />
        <span className="header-title">Inicio</span>
      </div>
      <div className="header-center" ref={wrapperRef}>
  <div className="search-container">
    <Search className="search-icon" />
    <input
      type="text"
      className="search-input"
      value={query}
      onChange={handleInputChange}
      placeholder="Buscar por nombre, apellido o DNI"
    />
    {resultados.length > 0 && (
      <ul className={`search-results ${resultados.length > 0 ? 'show' : ''}`}>
        {resultados.map((usuario) => (
          <li
            key={usuario.id}
            className="search-item"
            onClick={() => handleUsuarioClick(usuario.id)}
          >
            <div className="user-result">
              <User className="user-icon" />
              <span className="user-name">
                {usuario.nombre} {usuario.apellido}
              </span>
              <span className="user-dni">DNI: {usuario.dni}</span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>



      <div className="header-right">
        {/* Icono de usuario y menú desplegable */}
        {userData ? (
          <div className="user-icon-container">
            <User className="icon" onClick={handleMenuToggle} />
            {isDropdownOpen && (
              <div className="dropdown-menu">
                
                {userData.rol === 'admin' && (
                  <button onClick={handleAdmin}>Administrar</button> 
                )}
                <button onClick={handleProfile}>Mi perfil</button>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </div>
        ) : (
          <User className="icon" />
        )}
        <Menu className="icon" />
      </div>
    </header>
  );
};

export default Header;
