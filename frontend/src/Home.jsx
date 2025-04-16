import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, FileText, DollarSign } from 'lucide-react';
import Header from './Header'; // Asegurate que este path sea correcto
import './home.css';

const Home = () => {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      setNombre(usuario.nombre);
    }
  }, []);

  return (
    <>
      <Header /> {/* Agregamos el Header arriba de todo */}
      <div className="home-container">
        <div className="home-image">
          <img src="./consul.jpg" alt="Consultorio dental" />
        </div>

        <div className="home-content">
          <h1>Bienvenido, {nombre}</h1>
          <p>Brindando sonrisas saludables con la mejor atención profesional.</p>

          <div className="card">
            <CalendarDays size={40} />
            <Link to="/agendar-turno">Agendar turno</Link>
          </div>

          <div className="card">
            <FileText size={40} />
            <Link to="/historia-clinica">Historia clínica</Link>
          </div>

          <div className="card">
            <DollarSign size={40} />
            <Link to="/historial-pago">Historial de pago</Link>
          </div>
        </div>
        <div className='fondox'></div>
      </div>
    </>
  );
};

export default Home;
