import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdmDetalhesQuarto = () => {
  const { quartoId } = useParams();
  const [quarto, setQuarto] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7074/quartos/detalhes/${quartoId}`)
      .then((response) => {
        setQuarto(response.data); 
      })
      .catch((error) => {
        console.error('Erro ao buscar os detalhes do quarto:', error);
      });
  }, [quartoId]);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? quarto.fotosQuarto.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex === quarto.fotosQuarto.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
    <h2 className="m-3 d-flex justify-content-center">Detalhes do Quarto</h2>
    <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
      <div className="d-flex flex-column hotel-details w-50 justify-content-center align-items-center">
        {quarto && Object.keys(quarto).length !== 0 ? (
          <>
            <div className="carousel">
              <div className="carousel-inner">
                {quarto.fotosQuarto.map((imagem, index) => (
                  <div className={`carousel-item ${index === activeIndex ? 'active' : ''}`} key={index}>
                    <img className="carousel-image" src={imagem.nomeArquivo} alt={`Imagem ${index + 1}`} />
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
            <div className='m-4'>
            <p><strong>Preço diária:</strong> R${quarto.preco}</p>
            <p><strong>Descrição:</strong> {quarto.descricao}</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/Hotel/Cadastro")}>Editar</button>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdmDetalhesQuarto;