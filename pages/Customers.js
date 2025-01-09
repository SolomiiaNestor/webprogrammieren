import React, { useEffect, useState } from 'react';
import { getCustomers } from '../services/api';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  // Kunden beim Laden der Seite abrufen
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Kunden:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Wenn keine Kunden vorhanden sind, zeige eine Nachricht an
  if (customers.length === 0) {
    return <p className="text-center">Keine Kunden gefunden.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Liste der Kunden</h2>
      <ul className="list-group">
        {customers.map((customer) => (
          <li key={customer.id} className="list-group-item">
            {customer.firstName} {customer.lastName} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
