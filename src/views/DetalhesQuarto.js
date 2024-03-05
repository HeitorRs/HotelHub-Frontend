import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './shared/Header';
import Footer from './shared/Footer';

const DetalhesQuarto = () => {
  const { id } = useParams();
  const [quarto, setQuarto] = useState({});

  useEffect(() => {
    axios.get(`https://localhost:7074/api/Quartos/quarto/${id}`)
      .then((response) => {
        setQuarto(response.data); 
      })
      .catch((error) => {
        console.error('Erro ao buscar os detalhes do quarto:', error);
      });
  }, [id]);

  return (
    <div class="d-flex flex-column min-vh-100">
      <h2>Detalhes do Quarto</h2>
      {quarto && Object.keys(quarto).length !== 0 ? (
        <>
          <h3>{quarto.preco}</h3>
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                      {quarto.fotosQuarto.map((imagem, index) => (
                        <div className='carousel-item active d-flex justify-content-center'>
                          <img class="d-block" key={index} src={imagem.nomeArquivo} alt={`Imagem ${index + 1} do ${quarto.nome}`} />
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
          <p>Cidade: {quarto.cidade}</p>
          <p>Descrição: {quarto.descricao}</p>
          <a href={`/Quartos/${quarto.quartoId}`}>Reservar</a>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default DetalhesQuarto;
