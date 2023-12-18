import React, {useState, useEffect} from "react";
import axios from "axios";
import '../App.css'

const Body= () => {
  const [listaHoteis, setListaHoteis] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7074/api/Hotels')
      .then((response) => {
        setListaHoteis(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <h2 className="m-3 d-flex justify-content-center">Hotéis</h2>
      <div className="album py-5">
        <div className="container">
          <div className="row">
            {listaHoteis.map((hotel) => (
              <div className="col-md-4 mb-4" key={hotel.hotelId}>
                <div className="card">
                  <h5 className="card-title">{hotel.nome}</h5>
                  <div>
                    {hotel.fotosHotel.length > 0 && (
                      <img className="card-img-top" src={hotel.fotosHotel[0].nomeArquivo} alt={`Imagem principal do ${hotel.nome}`} />
                    )}
                  </div>
                  <div className="card-body">
                    <p><b>Cidade:</b><br />{hotel.cidade}</p>
                    <p className="card-text"><b>Descrição:</b><br />{hotel.descricao}</p>
                    <a href={`/hotel/${hotel.hotelId}`}>Ver Detalhes</a>
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

export default Body;
