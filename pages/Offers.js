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
    <div className="container mt-5">
      <h2 className="mb-4">Liste der Angebote</h2>
      <div className="row">
        {offers.map((offer) => (
          <div className="col-md-4 mb-3" key={offer.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{offer.name}</h5>
                <p className="card-text">{offer.description}</p>
                <p className="card-text">Preis: {offer.price}€</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
