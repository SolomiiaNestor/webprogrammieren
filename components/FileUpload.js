import React, { useState } from 'react';
import { uploadFile } from '../services/api';

const FileUpload = ({ offerId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('offerId', offerId);

    try {
      await uploadFile(formData);
      alert('Datei erfolgreich hochgeladen');
    } catch (error) {
      alert('Fehler beim Hochladen der Datei');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Datei hochladen</button>
    </div>
  );
};

export default FileUpload;
