import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="mb-4">Willkommen zu Herr Conduit's Projektverwaltung</h1>
      <nav className="d-flex justify-content-center">
        <Link to="/login" className="btn btn-primary me-2">
          Login
        </Link>
        <Link to="/offers" className="btn btn-secondary me-2">
          Angebote
        </Link>
        <Link to="/customers" className="btn btn-success">
          Kunden
        </Link>
      </nav>
    </div>
  );
};

export default Home;
