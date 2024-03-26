import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function PerfilEdit({}) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).nameid;
  const userType = jwtDecode(token).role;
  const navigate = useNavigate();


  const handleEdit = async () => {
    try {
      await axios.put(`https://localhost:7074/user/edit`, {
        id: userId,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        tipo: userType
      });
      navigate("/Perfil")
    } catch (error) {
      setError('Erro ao editar usuário.');
      console.error('Erro ao editar usuário:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
    <h2 className="m-3 d-flex justify-content-center">Editar Perfil</h2>
    <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
      <div className="card">
        <h4 className="text-center">Preencha os campos que deseja editar</h4>
        {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
        <div className="card-body"></div>
        <div className="mb-3">
            <label>Nome:</label>
            <input className="form-control" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="mb-3">
            <label>Sobrenome:</label>
            <input className="form-control" type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </div>
        <div className="mb-3">
            <label>Email:</label>
            <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="row justify-content-center">
              <div className="col-4">
            <button className="btn btn-primary" onClick={handleEdit}>Salvar</button>
            </div>
        </div>
        {error && <div>{error}</div>}
        </div>
        </div>
    </div>
  );
}

export default PerfilEdit;