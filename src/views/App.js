import Header from './shared/Header';
import Footer from './shared/Footer';
import Body from './Body';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
