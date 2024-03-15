import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';

const ReservaQuarto = () => {
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

  useEffect(() => {
    // Simulando busca de datas já reservadas
    const reservas = [
      { startDate: new Date('2024-03-15'), endDate: new Date('2024-03-17') },
      { startDate: new Date('2024-03-22'), endDate: new Date('2024-03-23') }
    ];

    setReservas(reservas);
  }, []);

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
    console.log(range)
    return [...disabled, ...range];
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar os dados de reserva para a API
    const reservaData = {
      startDate: dateRange[0].startDate,
      endDate: dateRange[0].endDate,
      observacao: observacao
    };
    console.log('Reserva enviada:', reservaData);
  };

  return (
    <div className="container">
      <h2>Reservar Quarto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Selecione o intervalo de datas:</label>
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
  );
};

export default ReservaQuarto;