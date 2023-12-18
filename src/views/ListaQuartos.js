import React, {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import '../App.css'

const ListaQuartos= () => {
  const { id } = useParams();
  const [listaQuartos, setListaQuartos] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7074/api/Quartos/${id}`)
      .then((response) => {
        setListaQuartos(response.data);
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
            {listaQuartos.map((quarto) => (
              <div className="col-md-4 mb-4" key={quarto.quartoId}>
                <div className="card">
                  <div>
                    {quarto.fotosQuarto.length > 0 && (
                      <img className="card-img-top" src={quarto.fotosQuarto[0].nomeArquivo}/>
                    )}
                  </div>
                  <div className="card-body">
                    <p><b>Diária:</b>{quarto.preco}</p>
                    <p className="card-text"><b>Descrição:</b><br />{quarto.descricao}</p>
                    <a href={`/hotel/${quarto.quartoId}`}>Reservar</a>
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