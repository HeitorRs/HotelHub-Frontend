import React from 'react';
import { useNavigate } from 'react-router-dom';

function Perfil() {
    const navigate = useNavigate();

    // Função para limpar o localStorage e deslogar o usuário
    const logout = () => {
        localStorage.clear();
        navigate('/');
  };

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      <p>Aqui estão os detalhes do perfil do usuário.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Perfil;