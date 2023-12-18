

function Header() {
  return (
    <header className="bg-dark text-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="m-0">HotelHub</h1>
          <a href="/Profile" className="text-light d-flex align-items-center">
            <i className="bi bi-person-fill me-2"></i> Meu Perfil
          </a>
        </div>
    </header>
  );
}

export default Header;