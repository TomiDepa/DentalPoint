import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Función de redirección

    useEffect(() => {
        // Verifica si el usuario ya está logueado mediante el token
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Si hay token, redirige al home
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/usuarios/login', {
            email,
            contraseña
          });
      
          const { token, usuario } = response.data;
      
          localStorage.setItem('token', token);
          localStorage.setItem('usuario', JSON.stringify(usuario));
      
          if (usuario.rol === 'admin') {
            navigate('/admin');
          } else {
            navigate(`/usuario`); // o simplemente '/usuario'
          }
        } catch (error) {
          setError('Error en el login: ' + (error.response?.data?.error || error.message));
        }
      };
    return (
        <div className="register-background">
            <div className="login-container">
                <h1 className="app-title">DentalPoint</h1>
                <div className="register-container">
                    <h2>Iniciar sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="input-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Contraseña" 
                                value={contraseña} 
                                onChange={(e) => setContraseña(e.target.value)} 
                                required 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="eye-icon-button"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button className="botonregistro" type="submit">Iniciar sesión</button>
                        <p>¿No tenés cuenta?</p>
                        <Link to="/register">
                            <button className='clik'>Registrate</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
