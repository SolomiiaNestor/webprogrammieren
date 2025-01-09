import React, { useState, useEffect } from 'react';
import { getOffers } from '../services/api';
import { Link } from 'react-router-dom';

const OfferList = () => {
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
          <li key={offer.id}>
            <Link to={`/offers/${offer.id}`}>{offer.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferList;
