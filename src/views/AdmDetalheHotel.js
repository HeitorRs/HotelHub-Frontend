import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DetalhesHotel.css';

const AdmDetalheHotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [unauthorized, setUnauthorized] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.get(`https://localhost:7074/api/Hotels/${id}`, config)
      .then((response) => {
        setHotel(response.data); 
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setUnauthorized(true);
        } else {
          console.error('Erro ao buscar os detalhes do hotel:', error);
        }
      });
  }, [id]);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? hotel.fotosHotel.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex === hotel.fotosHotel.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
    <h2 className="m-3 d-flex justify-content-center">Detalhes do Hotel</h2>
    <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
      <div className="hotel-details">
        {hotel && Object.keys(hotel).length !== 0 ? (
          <>
            <h3 className='m-3 d-flex justify-content-center'>{hotel.nome}</h3>
            <div className="carousel">
              <div className="carousel-inner">
                {hotel.fotosHotel.map((imagem, index) => (
                  <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
                    <img className="carousel-image" src={imagem.nomeArquivo} alt={`Imagem ${index + 1} do ${hotel.nome}`} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" onClick={handlePrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Próximo</span>
              </button>
            </div>
            <p><strong>Cidade:</strong> {hotel.cidade}</p>
            <p><strong>Descrição:</strong> {hotel.descricao}</p>
            <a href={`/HotelAdm/Quartos/${hotel.hotelId}`} className="btn btn-primary">Ver Quartos</a><br></br>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/Hotel/Cadastro")}>Editar</button>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdmDetalheHotel;