import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function QuartoCadastro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    hotelId: 0,
    descricao: '',
    preco: '',
    fotos: ''
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

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
    if (!formData.descricao || !formData.preco || photoUrls.length === 0) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (isNaN(parseFloat(formData.preco))) {
        setErrorMessage('Por favor, insira um valor numérico para o preço.');
        return;
      }

    try {
      const fotos = photoUrls.join(',');

      const requestData = {
        hotelId: id,
        descricao: formData.descricao,
        preco: formData.preco,
        fotos: fotos
      };

      const response = await fetch('https://localhost:7074/Quarto/Cadastro', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados.');
      }
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title">Cadastro de Quarto</h1>
      <div className="container">
        <div className="card">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="form">
            <label>Descrição:</label>
            <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
            <label>Preço:</label>
            <input type="text" name="preco" value={formData.preco} onChange={handleChange} />
            <label>Fotos(URL):</label>
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
            <button type="button" onClick={handleAddPhoto}>Adicionar Foto</button>
            <p>Total de fotos adicionadas: {photoUrls.length}</p>

            <button type="submit">Cadastrar Quarto</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuartoCadastro;