import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function UserProfile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).nameid; // Obtém o ID do usuário do token
  const userType = jwtDecode(token).role;

  // Função para carregar os detalhes do usuário ao carregar a página
  useEffect(() => {
    // Função para fazer uma solicitação GET para obter os detalhes do usuário usando o ID
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7074/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Erro ao obter os detalhes do usuário');
        }
        const userData = await response.json();
        setUserDetails(userData);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchUserDetails();
  }, [token, userId]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <h1 className="m-3 d-flex justify-content-center">Meu Perfil</h1>
      <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
        <div className="d-flex flex-column min-vh-10 justify-content-center align-items-center">
          <div className="card p-4">
            <p><b>Nome:</b> {userDetails.nome}</p>
            <p><b>Sobrenome:</b> {userDetails.sobrenome}</p>
            <p><b>Email:</b> {userDetails.email}</p>
            <p><b>Tipo de conta:</b> {userType}</p>
            {userType === 'Hospede' && (
              <div className="d-flex flex-column">
                <button className="btn btn-primary mt-3" onClick={() => navigate('/Perfil/Edit')}>Editar Perfil</button>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/MinhasReservas')}>Ver minhas Reservas</button>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/comentarios')}>Ver meus Comentários</button>
                <button className="btn btn-primary mt-3" style={{ backgroundColor: 'red', borderColor: 'red'}} onClick={() => navigate('/Perfil/Delete')}>Excluir conta</button>
              </div>
            )}
            {userType === 'AdmHotel' && (
              <div className="d-flex flex-column">
                <button className="btn btn-primary mt-3" onClick={() => navigate('/editar')}>Editar Perfil</button>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/MeusHoteis')}>Ver meus Hoteis</button>
                <button className="btn btn-primary mt-3" style={{ backgroundColor: 'red', borderColor: 'red'}} onClick={() => navigate('/Perfil/Delete')}>Excluir conta</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;