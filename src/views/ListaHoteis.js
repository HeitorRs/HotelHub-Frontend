import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';

const Body = () => {
  const [listaHoteis, setListaHoteis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroCidade, setFiltroCidade] = useState('');
  const [hoteisFiltrados, setHoteisFiltrados] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('https://localhost:7074/api/Hotels', {
      headers: {
        'Authorization': `Bearer ${token}` // Inclua o token no cabeçalho de autorização
      }
    })
      .then((response) => {
        setListaHoteis(response.data);
        setHoteisFiltrados(response.data);
        setLoading(false); // Marca o carregamento como concluído
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
        setLoading(false); // Marca o carregamento como concluído mesmo em caso de erro
      });
  }, []);

  // Função para filtrar os hotéis por cidade
  const filtrarPorCidade = () => {
    if (filtroCidade.trim() === '') {
      // Se o filtro de cidade estiver vazio, exibe todos os hotéis
      setHoteisFiltrados(listaHoteis);
    } else {
      // Caso contrário, filtra os hotéis pela cidade especificada
      const hoteisFiltrados = listaHoteis.filter(hotel => hotel.cidade.toLowerCase() === filtroCidade.toLowerCase());
      setHoteisFiltrados(hoteisFiltrados);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <h2 className="m-3 d-flex justify-content-center">Hotéis</h2>
      <div className="d-flex justify-content-center">
      <div className="input-group mb-3" style={{ maxWidth: "300px" }}>
      <input type="text" className="form-control" placeholder="Digite o nome da cidade" value={filtroCidade} onChange={(e) => setFiltroCidade(e.target.value)} />
      <div className="input-group-append"> 
        <button className="btn btn-primary" onClick={filtrarPorCidade}>Filtrar</button>
      </div>
      </div>
      </div>
      {loading && (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <h3>Carregando...</h3>
        </div>
      )}

      {/* Renderiza a lista de hotéis somente se não estiver carregando */}
      {!loading && hoteisFiltrados.length > 0 && (
        <>
          <div className="album py-5">
            <div className="container">
              <div className="row justify-content-between">
                {hoteisFiltrados.map((hotel) => (
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
                        <a className="btn btn-primary mt-3" href={`/hotel/${hotel.hotelId}`}>Ver mais</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {!loading && hoteisFiltrados.length === 0 && (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <h3>Nenhum hotel encontrado</h3>
        </div>
      )}
    </div>
  );
};

export default Body;