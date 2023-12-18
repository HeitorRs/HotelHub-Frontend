import React from 'react';

const Footer= () => {
  return (
    <footer className="bg-dark text-light text-center py-3">
        <div className="container">
          &copy; {new Date().getFullYear()} HotelHub. Todos os direitos reservados.
        </div>
    </footer>
  );
};

export default Footer;