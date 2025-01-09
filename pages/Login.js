import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('role', 'Account-Manager');
      navigate('/');
    } else {
      alert('Ungültige Anmeldedaten');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <div className="mb-3">
        <label className="form-label">Benutzername</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Benutzername"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Passwort</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
        />
      </div>
      <button className="btn btn-primary w-100" onClick={handleLogin}>
        Einloggen
      </button>
    </div>
  );
};

export default Login;
