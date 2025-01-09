import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Willkommen zu Herr Conduit's Projektverwaltung</h1>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/offers">Angebote</Link>
        <Link to="/customers">Kunden</Link>
      </nav>
    </div>
  );
};

export default Home;
