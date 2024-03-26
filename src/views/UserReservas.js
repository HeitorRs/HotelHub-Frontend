import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ReservasHospede = () => {
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).nameid;

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`https://localhost:7074/reservas/hospede/${userId}`);
        setReservas(response.data);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      }
    };
    fetchReservas();
  }, [userId]);
 

  return (
    <div className="d-flex flex-column min-vh-100">
      <h2 className="m-3 d-flex justify-content-center">Minhas Reservas</h2>
      {reservas.length === 0 && (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="d-flex flex-column">
          <h3>Você ainda não possui reservas</h3>
          </div>
        </div>
      )}
      <div className="album py-5 ">
        <div className="container w-100">
        <div className="row justify-content-between">
              {reservas.map(reserva => (
                <div key={reserva.id} className="col-md-4 mb-4">
                  <ReservaCard reserva={reserva} />
                </div>
              ))}
            </div>
        </div>
        </div>
      </div>
  );
};

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR');
};

const ReservaCard = ({ reserva }) => {
  const { id, dataEntrada, dataSaida, hotel, preco } = reserva;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-title"><b>Hotel:</b> {hotel.nome}</p>
        <p className="card-text"><b>Data de Entrada:</b> {formatarData(dataEntrada)}</p>
        <p className="card-text"><b>Data de Saída:</b> {formatarData(dataSaida)}</p>
        <p className="card-text"><b>Valor total pago:</b> R${reserva.valorTotal}</p>
        <a href={`/Reserva/Delete/${reserva.reservaId}`} className="btn btn-primary">Cancelar reserva</a>
      </div>
    </div>
  );
};

export default ReservasHospede;