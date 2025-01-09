import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importiere deine Seiten
import Home from './pages/Home';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Offers from './pages/Offers';
import FileUploadPage from './pages/FileUploadPage';

function App() {
  return (
    <Router>
      <div className="container my-4">
        <h1 className="text-center mb-4">Herr Conduit's Projektverwaltung</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/file-upload" element={<FileUploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
