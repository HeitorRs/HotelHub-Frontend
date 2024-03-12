import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./HotelCadastro.css"
import { jwtDecode } from 'jwt-decode';

function HotelCadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cidade: '',
    fotos: '',
    admhotelId: 1
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');
  const userType = jwtDecode(token).role;
  

  useEffect(() => {
    if (userType !== 'AdmHotel') {
      navigate('*'); 
    }
  }, [navigate]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleAddPhoto = () => {
    if (photoUrl.trim() !== '') {
      setPhotoUrls([...photoUrls, photoUrl]);
      setPhotoUrl('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se algum dos campos está vazio
    if (!formData.nome || !formData.descricao || !formData.cidade || photoUrls.length === 0) {
      setErrorMessage('Por favor, preencha todos os campos e adicione no mínimo 1 imagem.');
      return;
    }

    try {
      const fotos = photoUrls.join(',');
      const userId = jwtDecode(token).nameid;

      const requestData = {
        nome: formData.nome,
        descricao: formData.descricao,
        cidade: formData.cidade,
        admhotelId: userId,
        fotos: fotos
      };

        const response = await fetch('https://localhost:7074/api/Hotels', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData) // Converter objeto para JSON
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados.');
      }

      // Se a resposta for bem-sucedida, redirecione para a página principal
      navigate('/'); // Redireciona para a página principal
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title">Cadastro de Hotel</h1>
      <div className="container">
        <div className="card">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="form">
            <label>Nome:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />

            <label>Descrição:</label>
            <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />

            <label>Cidade:</label>
            <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />

            <label>Fotos(URL):</label>
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
            <button type="button" onClick={handleAddPhoto}>Adicionar Foto</button>
            <p>Total de fotos adicionadas: {photoUrls.length}</p>

            <button type="submit">Cadastrar Hotel</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HotelCadastro;