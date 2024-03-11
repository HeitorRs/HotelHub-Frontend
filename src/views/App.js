import Header from './shared/Header';
import Footer from './shared/Footer';
import ListaHoteis from './ListaHoteis';
import ErrorPage from './ErrorPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HospedeCadastro from './HospedeCadastro';
import DetalhesHotel from './DetalhesHotel';
import ListaQuartos from './ListaQuartos';
import DetalhesQuarto from './DetalhesQuarto';
import HotelCadastro from './HotelCadastro';
import HotelDelete from './HotelDelete';
import HospedeLogin from './HospedeLogin';
import PrivateRoute from './PrivateRoute';
import HospedePerfil from './HospedePerfil';
import AdmHotelCadastro from './AdmHotelCadastro'

function App() {
  return (
  <div class="h-100 w-100">
  <BrowserRouter>
  <Header></Header>
    <Routes>
      <Route path='/' element={<PrivateRoute><ListaHoteis/></PrivateRoute>}/>
      <Route path='/CadastroHospede' element={<HospedeCadastro/>}/>
      <Route path='/CadastroAdmHotel' element={<AdmHotelCadastro/>}/>
      <Route path='/Hotel/:id' element={<PrivateRoute><DetalhesHotel/></PrivateRoute>}/>
      <Route path='/Quartos/:id' element={<PrivateRoute><ListaQuartos/></PrivateRoute>}/>
      <Route path='/Quartos/quarto/:id' element={<PrivateRoute><DetalhesQuarto/></PrivateRoute>}/>
      <Route path='/Cadastro/Hotel' element={<PrivateRoute><HotelCadastro/></PrivateRoute>}/>
      <Route path='/Delete/Hotel/:id' element={<PrivateRoute><HotelDelete/></PrivateRoute>}/>
      <Route path='/Perfil/:id' element={<PrivateRoute><HospedePerfil/></PrivateRoute>}/>
      <Route path='/Login' element={<HospedeLogin/>}/>
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
    <Footer></Footer>
  </BrowserRouter>
  </div>
  );
}

export default App;
