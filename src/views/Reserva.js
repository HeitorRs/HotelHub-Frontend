import React, { useState, useEffect } from 'react';
import { DateRange  } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ReservaQuarto = () => {
  const { hotelId, quartoId } = useParams(); 
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [observacao, setObservacao] = useState('');
  const [reservas, setReservas] = useState([]);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const token = localStorage.getItem('token');
  const userId = jwtDecode(token).nameid;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`https://localhost:7074/reservas/quarto/${quartoId}`);
        const reservasData = response.data.map(reserva => ({
          startDate: new Date(reserva.dataEntrada),
          endDate: new Date(reserva.dataSaida),
          key: 'selection'
        }));
        setReservas(reservasData);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      }
    };
    fetchReservas();
  }, [quartoId]);

  const disabledDates = reservas.reduce((disabled, reserva) => {
    const range = [];
    let currentDate = new Date(reserva.startDate);

    currentDate.setDate(currentDate.getDate() + 1);

    const endDate = new Date(reserva.endDate);

    endDate.setDate(endDate.getDate() + 1);

    while (currentDate <= endDate) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return [...disabled, ...range];
  }, []);

  const formatDateTime = (date) => {
    // Obtém as partes da data
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Retorna a data formatada
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataentrada = formatDateTime(dateRange[0].startDate)
    const datasaida = formatDateTime(dateRange[0].endDate)
    console.log(dataentrada, datasaida)
    try {
      // Lógica para enviar os dados de reserva para a API
      const reservaData = {
        dataentrada: dataentrada,
        datasaida: datasaida,
        observacao: observacao,
        hotelid: hotelId,
        quartoid: quartoId,
        hospedeid: userId
      };

      // Fazer a requisição POST para a API
      const response = await axios.post('https://localhost:7074/Reservar', reservaData);

      navigate(`/MinhasReservas`); // Lidar com a resposta da API
    } catch (error) {
      console.error('Erro ao enviar reserva:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <h2 className="m-3 d-flex justify-content-center">Reservar Quarto</h2>
      <div className="d-flex align-items-center container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selecione o intervalo que deseja se hospedar:</label>
            <DateRange
              editableDateInputs={false}
              ranges={dateRange}
              onChange={(ranges) => setDateRange([ranges.selection])}
              minDate={minDate}
              rangeColors={['#007bff']}
              disabledDates={disabledDates}
            />
          </div>
          <div className="form-group">
            <label>Observação:</label>
            <textarea
              className="form-control"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reservar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservaQuarto;