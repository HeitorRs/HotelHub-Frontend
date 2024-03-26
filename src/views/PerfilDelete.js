import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function UserDelete() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).nameid;
  const userType = jwtDecode(token).role;

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7074/user/delete/${userId}/${userType}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.clear();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === "O usuário possui reservas associadas e não pode ser excluído.") {
        setError("Você possui reservas ativas associadas a um ou mais de seus hoteis e não pode excluir seu perfil no momento.");
      } else {
        setError('Erro ao excluir usuário.');
      }
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const handleCancel = () => {
    navigate('/Perfil');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <h1 className="m-3 d-flex justify-content-center">Excluir Perfil</h1>
      <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
        {error && <p className="text-danger">{error}</p>}
        <p>Tem certeza que deseja excluir esta conta?</p>
        <button className="btn btn-primary mt-3" style={{ backgroundColor: 'red', borderColor: 'red'}} onClick={handleDelete}>Confirmar</button>
        <button className="btn btn-primary mt-3" onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default UserDelete;