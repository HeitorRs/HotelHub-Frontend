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

  // Função para dividir as reservas em grupos de 3
  const divideReservas = (reservas) => {
    const grupos = [];
    for (let i = 0; i < reservas.length; i += 3) {
      grupos.push(reservas.slice(i, i + 3));
    }
    return grupos;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <h2 className="m-3 d-flex justify-content-center">Minhas Reservas</h2>
      <div className="album py-5 ">
        <div className="container">
        <div className="row">
          {divideReservas(reservas).map((grupo, index) => (
            <div key={index} className='d-flex'>
              {grupo.map(reserva => (
                <div key={reserva.id} className="col-md-4 mb-4">
                  <ReservaCard reserva={reserva} />
                </div>
              ))}
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
        <h5 className="card-title">{hotel.nome}</h5>
        <p className="card-text">Data de Entrada: {formatarData(dataEntrada)}</p>
        <p className="card-text">Data de Saída: {formatarData(dataSaida)}</p>
        <Link to={`/reserva/${id}`} className="btn btn-primary">Detalhes</Link>
      </div>
    </div>
  );
};

export default ReservasHospede;