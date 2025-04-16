import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate,  Link} from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [repetirContraseña, setRepetirContraseña] = useState('');
    const [dni, setDni] = useState('');
    const [rol, setRol] = useState('usuario');  
    const [categoria, setCategoria] = useState('general');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // Función para verificar si las contraseñas coinciden
    const contraseñasCoinciden = contraseña === repetirContraseña && contraseña.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contraseñasCoinciden) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const newUser = { nombre, apellido, email, contraseña, dni, rol, categoria };

        try {
            const response = await axios.post('http://localhost:5000/api/usuarios', newUser);
            console.log('Usuario registrado:', response.data);
            navigate('/');  // Redirige al Home

        } catch (err) {
            setError('Hubo un error al registrar el usuario.');
            console.error('Error en el registro:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className='register-content'>
        <div className="register-background">
            
            <div className="register-container">
                
                <h2>Registro de Paciente</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-container">
    <input 
        type={showPassword ? "text" : "password"} // Cambiar tipo según showPassword
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

                    <div className="input-container">
                        <input 
                            type="password" 
                            placeholder="Repetir Contraseña" 
                            value={repetirContraseña} 
                            onChange={(e) => setRepetirContraseña(e.target.value)} 
                            required 
                        />
                        
                    </div>
                    {/* Mensaje dinámico si las contraseñas no coinciden */}
                    {!contraseñasCoinciden && repetirContraseña.length > 0 && (
                        <p className="error-message">❌ Las contraseñas no coinciden</p>
                    )}

                    {error && <p className="error-message">{error}</p>}
                    <button className='botonregistro' type="submit" disabled={!contraseñasCoinciden}>Registrar</button>
                    
                    <p>¿Ya tenés cuenta?</p>
<Link to="/login">
  <button className='clik'>Iniciar Sesión</button>
</Link>
                </form>
            </div>
            </div>
            </div>
    );
};

export default Register;
