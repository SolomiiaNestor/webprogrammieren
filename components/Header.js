import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { role, setRoleHandler } = useContext(AuthContext);

  const handleRoleChange = (e) => {
    setRoleHandler(e.target.value);
  };

  return (
    <header>
      <h1>Herr Conduit's Projektverwaltung</h1>
      <div>
        <select value={role} onChange={handleRoleChange}>
          <option value="Account-Manager">Account-Manager</option>
          <option value="Developer">Developer</option>
          <option value="User">User</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
