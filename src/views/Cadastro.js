import {useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Cadastro = () => {
  const [Nome, setName] = useState("");
  const [Sobrenome, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [Senha, setPassword] = useState("");
  const [TipoUsuario, setTipoUsuario] = useState(0);
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (Nome && Sobrenome && Email && Senha) {
      try {
        const response = await axios.post("https://localhost:7074/user/cadastro", {
          nome: Nome,
          sobrenome: Sobrenome,
          email: Email,
          senha: Senha,
          tipo: TipoUsuario
        });

        if (response.status === 200) {
          const token = response.data.token; 
          localStorage.setItem('token', token);

          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const role = decodedToken.role;
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);
          
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
        setError('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } else {
      setError('Todos os campos são obrigatórios.');
    }
    navigate("/")
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card">
        <h3 className="text-center">Cadastro</h3>
        {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
        <div className="card-body">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome:</label>
              <input type="text" id="nome" className="form-control" value={Nome} onChange={(e) => setName(e.target.value)} required />
              {formSubmitted && !Nome && <p className="text-danger">Campo obrigatório</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">Sobrenome:</label>
              <input type="text" id="surname" className="form-control" value={Sobrenome} onChange={(e) => setSurname(e.target.value)} required />
              {formSubmitted && !Sobrenome && <p className="text-danger">Campo obrigatório</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" id="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} required />
              {formSubmitted && !Email && <p className="text-danger">Campo obrigatório</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">Senha:</label>
              <input type="password" id="senha" className="form-control" value={Senha} onChange={(e) => setPassword(e.target.value)} required />
              {formSubmitted && !Senha && <p className="text-danger">Campo obrigatório</p>}
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="tipoUsuario" onChange={() => setTipoUsuario(1)} />
              <label className="form-check-label" htmlFor="tipoUsuario">Criar conta como Gerente de Hotel (AdmHotel)</label>
            </div>
            <div className="row justify-content-center">
              <div className="col-4">
                <button type="submit" className="btn btn-primary">Cadastrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;