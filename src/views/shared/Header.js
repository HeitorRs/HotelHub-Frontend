import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();

  // Função para efetuar logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    setRefresh(prevState => !prevState);
  };

  const isAuthenticated = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  return (
    <header className="bg-dark text-light py-3">
      <div className="container-lg d-flex justify-content-between align-items-center header-container">
        <h1 className="m-0 logo">
          <Link className="back" to="/">HotelHub</Link>
        </h1>
        <div className="profile-links">
          {isAuthenticated ? (
            <Link to={"/Perfil"} className="text-light d-flex align-items-center profile-link">
              <i className="bi bi-person-fill me-2"></i> Meu Perfil
            </Link>
          ) : (
            <>
              <Link to="/Login" className="text-light me-3 profile-link">Login</Link>
              <Link to="/Cadastro" className="text-light profile-link">Cadastro</Link>
            </>
          )}
          {isAuthenticated && location.pathname !== '/Login' && (
            <button onClick={handleLogout} className="btn btn-link text-light">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;