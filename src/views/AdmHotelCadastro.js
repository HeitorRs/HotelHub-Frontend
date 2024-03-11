import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
  const navigate = useNavigate();
  const [Nome, setName] = useState("");
  const [Sobrenome, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [Senha, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Nome,
      Sobrenome,
      Email,
      Senha
    };
    try {
      const response = await axios.post("https://localhost:7074/api/AdmHotels", data);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setError('Erro ao cadastrar.Verifique os dados e tente novamente.');
    }
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
              <input type="text" id="nome" className="form-control" value={Nome} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">Sobrenome:</label>
              <input type="text" id="surname" className="form-control" value={Sobrenome} onChange={(e) => setSurname(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" id="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">Senha:</label>
              <input type="password" id="senha" className="form-control" value={Senha} onChange={(e) => setPassword(e.target.value)} />
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