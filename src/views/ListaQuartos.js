import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import '../App.css';
import Header from './shared/Header';
import Footer from './shared/Footer';

const ListaQuartos = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [listaQuartos, setListaQuartos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7074/api/Quartos/${id}`);
        setListaQuartos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setError('Erro ao buscar os dados.');
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      setError('Tempo de carregamento excedido.');
      setLoading(false);
    }, 7000);

    fetchData();

    return () => clearTimeout(timeout);
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <h3>Carregando...</h3>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <h3>{error}</h3>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="d-flex flex-column min-vh-100">
        <h2 className="m-3 d-flex justify-content-center">Quartos</h2>
        <div className="album py-5">
          <div className="container">
            <div className="row">
              {listaQuartos.map((quarto) => (
                <div className="col-md-4 mb-4" key={quarto.quartoId}>
                  <div className="card">
                    <div>
                      {quarto.fotosQuarto.length > 0 && (
                        <img className="card-img-top" src={quarto.fotosQuarto[0].nomeArquivo} alt="Imagem do quarto" />
                      )}
                    </div>
                    <div className="card-body">
                      <p><b>Preço:</b><br />R${quarto.preco}</p>
                      <p className="card-text"><b>Descrição:</b><br />{quarto.descricao}</p>
                      <a href={`/Quartos/quarto/${quarto.quartoId}`}>Ver detalhes do quarto</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListaQuartos;