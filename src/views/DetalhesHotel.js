import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom'; // Importar o componente Redirect
import axios from 'axios';
import Header from './shared/Header';
import Footer from './shared/Footer';

const DetalhesHotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [unauthorized, setUnauthorized] = useState(false); // Estado para controlar se a resposta da API foi um 401

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
          setUnauthorized(true); // Se a resposta for 401, definir unauthorized como true
        } else {
          console.error('Erro ao buscar os detalhes do hotel:', error);
        }
      });
  }, [id]);

  if (unauthorized) {
    return <Navigate to="/Login" />; // Redirecionar para a tela de login se unauthorized for true
  }

  return (
      <div class="d-flex flex-column min-vh-100">
        <h2>Detalhes do Hotel</h2>
        {hotel && Object.keys(hotel).length !== 0 ? (
          <>
            <h3>{hotel.nome}</h3>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                {hotel.fotosHotel.map((imagem, index) => (
                  <div className='carousel-item active d-flex justify-content-center'>
                    <img class="d-block" key={index} src={imagem.nomeArquivo} alt={`Imagem ${index + 1} do ${hotel.nome}`} />
                  </div>
                ))}
              </div>
              <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Anterior</span>
              </a>
              <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Próximo</span>
              </a>
            </div>
            <p>Cidade: {hotel.cidade}</p>
            <p>Descrição: {hotel.descricao}</p>
            <a href={`/Quartos/${hotel.hotelId}`}>Ver Quartos</a>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
  );
};

export default DetalhesHotel;

