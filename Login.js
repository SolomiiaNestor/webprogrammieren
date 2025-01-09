import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Hier könnte eine echte API-Abfrage zur Authentifizierung erfolgen
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('role', 'Account-Manager');
      navigate('/');
    } else {
      alert('Ungültige Anmeldedaten');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Benutzername"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Passwort"
      />
      <button onClick={handleLogin}>Einloggen</button>
    </div>
  );
};

export default Login;
