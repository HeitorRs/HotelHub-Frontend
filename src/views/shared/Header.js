import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

function Header() {
  const isAuthenticated = localStorage.getItem('token');

  const userId = localStorage.getItem("userId")

  return (
    <header className="bg-dark text-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="m-0"><Link className="back" to="/">HotelHub</Link></h1>
          <div>
            {isAuthenticated ? (
              <a href={`/Perfil/${userId}`} className="text-light d-flex align-items-center">
                <i className="bi bi-person-fill me-2"></i> Meu Perfil
              </a>
            ) : (
              <>
                <a href="/Login" className="text-light me-3">Login</a>
                <a href="/Cadastro" className="text-light">Cadastro</a>
              </>
            )}
          </div>
        </div>
    </header>
  );
}

export default Header;