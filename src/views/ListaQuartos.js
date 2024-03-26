import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../App.css';
import { jwtDecode } from "jwt-decode";

const ListaQuartos = () => {
  const { hotelId } = useParams();
  const [loading, setLoading] = useState(true);
  const [listaQuartos, setListaQuartos] = useState([]);
  const [error, setError] = useState(null);
  const userType = jwtDecode(localStorage.getItem("token")).role
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7074/quartos/${hotelId}`);
        setListaQuartos(response.data);
        clearTimeout(timeout);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setError('Este hotel não possui quartos cadastrados no momento :(');
        clearTimeout(timeout)
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      setError('Tempo de carregamento excedido.');
      setLoading(false);
    }, 7000);

    fetchData();

    return () => clearTimeout(timeout);
  }, [hotelId]);

  if (loading) {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <h3>Carregando...</h3>
        </div>
    );
  }

  if (error) {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="d-flex flex-column">
          <h3>{error}</h3>
          {userType === 'AdmHotel' && (
                <button className="btn btn-primary mt-3" onClick={() => navigate(`/Quarto/Cadastro/${hotelId}`)}>Cadastrar primeiro quarto</button>
              
            )}
          </div>
        </div>
    );
  }

  return (
      <div className="d-flex flex-column min-vh-100">
        <h2 className="m-3 d-flex justify-content-center">Quartos</h2>
        <div className="album py-5">
          <div className="container w-100">
            <div className="row justify-content-between">
              {listaQuartos.map((quarto) => (
                <div className="col-md-4 mb-4" key={quarto.quartoId}>
                  <div className="card mb-4">
                    <div>
                      {quarto.fotosQuarto.length > 0 && (
                        <img className="card-img-top" src={quarto.fotosQuarto[0].nomeArquivo} alt="Imagem do quarto" />
                      )}
                    </div>
                    <div className="card-body">
                      <p><b>Preço diária:</b><br></br>R${quarto.preco}</p>
                      <a className="btn btn-primary mt-3" href={`/Quartos/${hotelId}/quarto/${quarto.quartoId}`}>Ver mais</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ListaQuartos;