import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { jwtDecode } from 'jwt-decode';

const AdmHoteis = () => {
  const [listaHoteis, setListaHoteis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = jwtDecode(token).nameid;

    axios.get(`https://localhost:7074/Hotels/Adm/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Inclua o token no cabeçalho de autorização
      }
    })
      .then((response) => {
        setListaHoteis(response.data);
        setLoading(false); // Marca o carregamento como concluído
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false); // Marca o carregamento como concluído mesmo em caso de erro
      });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Mostra o texto "Carregando..." enquanto os dados estão sendo carregados */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <h3>Carregando...</h3>
        </div>
      )}

      {/* Renderiza a lista de hotéis somente se não estiver carregando */}
      {!loading && listaHoteis.length > 0 && (
        <>
          <h2 className="m-3 d-flex justify-content-center">Meus Hotéis</h2>
          <div className="d-flex justify-content-center">
          <button className="btn btn-primary mt-3" onClick={() => navigate("/Hotel/Cadastro")}>Cadastrar novo hotel</button>
          </div>
          <div className="album py-5">
            <div className="container">
              {/* Centraliza os cards na página */}
              <div className="row justify-content-between">
                {listaHoteis.map((hotel) => (
                  <div className="col-md-4 mb-4" key={hotel.hotelId}>
                    {/* Adiciona a classe mb-4 para criar um espaço entre os cards */}
                    <div className="card mb-4">
                      <h5 className="card-title">{hotel.nome}</h5>
                      <div>
                        {hotel.fotosHotel.length > 0 && (
                          <img className="card-img-top" src={hotel.fotosHotel[0].nomeArquivo} alt={`Imagem principal do ${hotel.nome}`} />
                        )}
                      </div>
                      <div className="card-body">
                        <p><b>Cidade:</b><br />{hotel.cidade}</p>
                        <a className="btn btn-primary mt-3" href={`/DetalheAdm/Hotel/${hotel.hotelId}`}>Ver mais</a><br></br>
                        <button className="btn btn-primary mt-3" style={{background:"red", borderColor:"red"}} onClick={() => navigate(`/Hotel/Delete/${hotel.hotelId}`)}>Excluir</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {listaHoteis.length === 0 && (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="d-flex flex-column">
          <h3>Você ainda não possui hoteis cadastrados</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/Hotel/Cadastro")}>Cadastrar novo hotel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmHoteis;