import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './shared/Header';
import Footer from './shared/Footer';

const DetalhesHotel = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    axios.get(`https://localhost:7074/api/Hotels/${id}`)
      .then((response) => {
        setHotel(response.data); 
      })
      .catch((error) => {
        console.error('Erro ao buscar os detalhes do hotel:', error);
      });
  }, [id]);

  return (
    <div >
    <Header></Header>
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
          <a href={`/Quarto/${hotel.hotelId}`}>Reservar</a>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
    <Footer></Footer>
    </div>
  );
};

export default DetalhesHotel;

