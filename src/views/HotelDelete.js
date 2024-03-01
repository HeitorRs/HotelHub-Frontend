import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './shared/Header';
import Footer from './shared/Footer';
import "./HotelDelete.css"

function HotelDelete() {
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`https://localhost:7074/api/Hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        setError('Erro ao carregar hotel.');
        console.error('Erro ao carregar hotel:', error);
      }
    };

    fetchHotel();
  }, [id]);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://localhost:7074/api/Hotels/delete/${id}`);
      navigate('/');
    } catch (error) {
      setError('Erro ao excluir hotel.');
      console.error('Erro ao excluir hotel:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!hotel) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
  <Header />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div className="card" style={{ padding: '20px', marginBottom: '20px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
      <h2>Excluir Hotel</h2>
      <div>
        <p>Nome: {hotel.nome}</p>
        <p>Cidade: {hotel.cidade}</p>
        <button style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }} onClick={handleConfirmDelete}>Confirmar Exclusão</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  </div>
  <Footer />
</div>
  );
}

export default HotelDelete;