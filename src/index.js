import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';
import ErrorPage from './views/ErrorPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './views/Cadastro';
import Login from './views/Login';
import PrivateRoutes from './PrivateRoutes';
import DetalhesHotel from './views/DetalhesHotel';
import ListaQuartos from './views/ListaQuartos';
import DetalhesQuarto from './views/DetalhesQuarto';
import HotelCadastro from './views/HotelCadastro';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route Component={PrivateRoutes}>
      </Route>
      <Route path='/' Component={App}/>
      <Route path='/Login' Component={Login}/>
      <Route path='/Cadastro' Component={Cadastro}/>
      <Route path='/Hotel/:id' Component={DetalhesHotel}/>
      <Route path='/Quartos/:id' Component={ListaQuartos}/>
      <Route path='/Quartos/quarto/:id' Component={DetalhesQuarto}/>
      <Route path='/Cadastro/Hotel' Component={HotelCadastro}/>
      <Route path='*' Component={ErrorPage} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
