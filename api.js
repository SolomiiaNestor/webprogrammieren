import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Hier die Backend-URL einfügen

// Funktion, um Kunden abzurufen
export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Kunden:', error);
    throw error;
  }
};

// Funktion, um Angebote abzurufen (Beispiel)
export const getOffers = async () => {
  try {
    const response = await axios.get(`${API_URL}/offers`);
    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Angebote:', error);
    throw error;
  }
};

// Funktion, um eine Datei hochzuladen (Beispiel)
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fehler beim Hochladen der Datei:', error);
    throw error;
  }
};
