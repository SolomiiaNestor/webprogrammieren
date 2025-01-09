import React from 'react';

const CustomerList = ({ customers }) => {
  return (
    <div>
      <h2>Liste der Kunden</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
