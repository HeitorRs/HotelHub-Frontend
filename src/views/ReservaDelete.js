import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReservaDelete() {
  const [reserva, setReserva] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`https://localhost:7074/Reservas/${id}`);
        setReserva(response.data);
      } catch (error) {
        setError('Erro ao carregar reserva.');
        console.error('Erro ao carregar reserva:', error);
      }
    };

    fetchReserva();
  }, [id]);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://localhost:7074/Reserva/Delete/${id}`);
      navigate('/MinhasReservas');
    } catch (error) {
      setError('Erro ao excluir reserva.');
      console.error('Erro ao excluir reserva:', error);
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const handleCancel = () => {
    navigate('/Minhasreservas');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!reserva) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <h1 className="m-3 d-flex justify-content-center">Cancelar reseva</h1>
      <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
      {error && <p className="text-center" style={{ color: 'red' }}>{error}</p>}
      <div className="card p-4">
      <div>
        <p><b>Nome:</b> {reserva.hotel.nome}</p>
        <p><b>Data de Entrada:</b> {formatarData(reserva.dataEntrada)}</p>
        <p><b>Data de Saída:</b> {formatarData(reserva.dataSaida)}</p>
        <button style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }} onClick={handleConfirmDelete}>Confirmar Exclusão</button>
        <button onClick={handleCancel}>Cancelar</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ReservaDelete;