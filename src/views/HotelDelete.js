import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./HotelDelete.css"

function HotelDelete() {
  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:7074/api/Hotels/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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
      const token = localStorage.getItem('token');
      await axios.delete(`https://localhost:7074/api/Hotels/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Este hotel não pode ser excluído porque existem reservas associadas a ele.');
      } else {
        setError('Erro ao excluir hotel.');
        console.error('Erro ao excluir hotel:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!hotel) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <h1 className="m-3 d-flex justify-content-center">Excluir hotel</h1>
      <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
        {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
        <div className="card p-4">
          <div>
            <p><b>Nome:</b> {hotel.nome}</p>
            <p><b>Cidade:</b> {hotel.cidade}</p>
            <button style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }} onClick={handleConfirmDelete}>Confirmar Exclusão</button>
            <button onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDelete;