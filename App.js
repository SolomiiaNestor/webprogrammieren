// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Korrekte Import-Pfade zu den Seiten im 'pages'-Ordner
import Home from './pages/Home';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Offers from './pages/Offers';
import FileUploadPage from './pages/FileUploadPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/file-upload" element={<FileUploadPage />} />
      </Routes>
    </Router>
  );
};

export default App;
