import React, { useState } from 'react';
import Header from './shared/Header';
import Footer from './shared/Footer';
import "./HotelCadastro.css"

function HotelCadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cidade: '',
    fotos: '',
    admhotelId: 1
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCount, setPhotoCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleAddPhoto = () => {
    if (photoUrl.trim() !== '') {
      setFormData({
        ...formData,
        fotos: formData.fotos !== '' ? `${formData.fotos},${photoUrl}` : photoUrl
      });
      setPhotoUrl('');
      setPhotoCount(photoCount + 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se algum dos campos está vazio
    if (!formData.nome || !formData.descricao || !formData.cidade) {
      setErrorMessage('Por favor, preencha todos os campos e adicione no mínimo 1 imagem.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7074/api/Hotels?nome=${formData.nome}&descricao=${formData.descricao}&cidade=${formData.cidade}&admhotelId=${formData.admhotelId}&fotos=${formData.fotos}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados.');
      }

      // Se a resposta for bem-sucedida, redirecione para a página principal
      window.location.href = '/'; // Redireciona para a página principal
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  };

  return (
    <div className="wrapper">
      <Header />
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
            <p>Total de fotos adicionadas: {photoCount}</p>

            <button type="submit">Cadastrar Hotel</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HotelCadastro;