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
      const response = await axios.post('https://localhost:7074/api/Hospedes/Login', {
        email: formData.email,
        senha: formData.senha
      });
      // Limpar o erro caso a autenticação seja bem-sucedida
      setError('');
      console.log(response.data.token)
      // Aqui você pode armazenar o token retornado no localStorage
      localStorage.setItem('token', response.data.token);
      // Redirecionar para a página principal
      window.location.href = '/';
    } catch (error) {
      // Tratar o erro caso o email ou senha sejam incorretos
      setError('Email ou Senha incorretos');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
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
  );
};

export default HospedeLogin;