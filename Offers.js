import React, { useEffect, useState } from 'react';
import { getOffers } from '../services/api';

const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      const data = await getOffers();
      setOffers(data);
    };
    fetchOffers();
  }, []);

  return (
    <div>
      <h2>Liste der Angebote</h2>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>{offer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Offers;