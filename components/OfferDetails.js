import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOfferDetails } from '../services/api';
import Comments from './Comments';
import FileUpload from './FileUpload';

const OfferDetails = () => {
  const { offerId } = useParams(); // Holt die offerId aus der URL
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      const data = await getOfferDetails(offerId); // Holt die Details des Angebots mit der ID
      setOffer(data);
    };
    fetchOfferDetails();
  }, [offerId]);

  if (!offer) return <div>Loading...</div>;

  return (
    <div>
      <h2>{offer.name}</h2>
      <p>{offer.description}</p>
      <p>Preis: {offer.price}€</p>
      <FileUpload offerId={offerId} />
      <Comments offerId={offerId} />
    </div>
  );
};

export default OfferDetails;
