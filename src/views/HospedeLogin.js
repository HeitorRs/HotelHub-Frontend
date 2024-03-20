import React, { useState } from 'react';
import axios from 'axios';

const HospedeLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7074/user/login', {
        email: formData.email,
        senha: formData.senha
      });
      setError('');
      console.log(response.data.token)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('role', response.data.tipo);
      window.location.href = '/';
    } catch (error) {
      setError('Email ou Senha incorretos');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
    <h2 className="m-3 d-flex justify-content-center">Bem Vindo!</h2>
    <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
      <div className="card">
        <h2 className="text-center">Login</h2>
        {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">Senha:</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="row justify-content-center">
              <div className="col-4">
                <button type="submit" className="btn btn-primary">Entrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HospedeLogin;