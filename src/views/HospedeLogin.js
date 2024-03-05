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
      setError('Email ou senha incorretos.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default HospedeLogin;