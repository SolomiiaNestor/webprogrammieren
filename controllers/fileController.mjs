import fs from 'fs/promises'; // Importiert die Dateisystem-API mit Promises für asynchrone Dateioperationen
import path from 'path'; // Importiert die Path-Bibliothek für die Arbeit mit Dateipfaden
import { v4 as uuidv4 } from 'uuid'; // Importiert die UUID-Funktion, um eindeutige IDs zu generieren
import File from '../models/File.mjs';  // Importiert das File-Modell
import fastify from 'fastify';

const __filename = new URL(import.meta.url).pathname; // Aktuellen Dateipfad abrufen
let __dirname = path.dirname(__filename); // Bestimmt das Verzeichnis des aktuellen Skripts

if (__dirname.startsWith('/C:')) {
  __dirname = __dirname.slice(1); // Entfernt den führenden "/" von Windows-Dateipfaden
}

const uploadDir = path.resolve(__dirname, '../assets'); // Bestimmt das Verzeichnis, in dem die hochgeladenen Dateien gespeichert werden

fs.mkdir(uploadDir, { recursive: true }).catch(console.error); // Mit { recursive: true } wird das Verzeichnis und alle fehlenden Verzeichnisse erstellt

// Maps zur Speicherung der Datei- und Angebotsdaten
//const files = {}; // Ein Objekt, das Informationen zu allen hochgeladenen Dateien speichert
//const offers = {}; // Ein Objekt, das Angebots-IDs mit den dazugehörigen Datei-IDs verknüpft
let files = {}; // Ein Objekt, das Informationen zu allen hochgeladenen Dateien speichert
let offers = {}; // Ein Objekt, das Angebots-IDs mit den dazugehörigen Datei-IDs verknüpft

// Funktion zum Laden der gespeicherten Dateiinformationen beim Start
const dataFilePath = `${uploadDir}/dateien.json`;
const loadFileData = async () => {
  try {
      const data = await fs.readFile(dataFilePath, 'utf8');
    const parsedData = JSON.parse(data);
    files = parsedData.files || {};
    offers = parsedData.offers || {};
  } catch (err) {
    console.error('Fehler beim Laden der Dateiinformationen:', err);
  }
};
// Funktion zum Speichern der Dateiinformationen
const saveFileData = async () => {
  try {
    const data = JSON.stringify({ files, offers }, null, 2);
    await fs.writeFile(dataFilePath, data);
  } catch (err) {
    console.error('Fehler beim Speichern der Dateiinformationen:', err);
  }
};

// Funktion zum Hochladen einer Datei
export const uploadFile = async (file, offerId) => {
  // Überprüft, ob die Datei im richtigen Format vorliegt (nur Textdateien sind erlaubt)
  if (file.mimetype !== 'text/plain') {
    throw new Error('Nur .txt-Dateien sind erlaubt.'); // Fehler werfen, wenn die Datei nicht vom Typ "text/plain" ist
  }

  const fileId = uuidv4();  // Generiert eine eindeutige ID für die Datei
  const filePath = path.join(uploadDir, `${fileId}.txt`); // Pfad, unter dem die Datei gespeichert werden soll

  // Debugging
  console.log(filePath); 
  console.log('data:');
  console.log(file.data);

  // Wandelt die Datei in einen Buffer um, der dann gespeichert werden kann
  const fileData = await file.toBuffer(); 

  await fs.writeFile(filePath, fileData);  // Speichert die Datei auf dem Server

  // Erstellt ein File-Objekt mit den relevanten Informationen (ID, Name, URL und Angebots-ID)
  const fileInfo = new File(fileId, file.filename, `http://localhost:8080/assets/${fileId}.txt`, offerId);

  
  // Verknüpft die Datei mit dem Angebot
  if (!offers[offerId]) {
    offers[offerId] = []; 
  }
  offers[offerId].push(fileId); // Fügt die Datei-ID zur Liste der Dateien des Angebots hinzu

  // Speichert die Dateiinformationen im 'files'-Objekt
  files[fileId] = fileInfo;
  await saveFileData();
  return fileInfo; // Rückgabe der Datei-Informationen nach dem Hochladen
};

// Funktion zum Abrufen aller Dateien für ein bestimmtes Angebot
export const getOfferFiles = async (offerId) => {
  if (!offers[offerId]) {
    throw new Error('Keine Dateien für dieses Angebot gefunden.'); // Fehler werfen, wenn keine Dateien für das Angebot existieren
  }

  // Mappe die Datei-IDs auf die entsprechenden File-Objekte und gibt diese zurück
  return offers[offerId].map(fileId => files[fileId]);
};

// Funktion zum Abrufen des Inhalts einer Datei
export const getFileContent = async (fileId) => {
  // Überprüfen, ob die angeforderte Datei existiert
  if (!files[fileId]) {
    throw new Error('Datei nicht gefunden.'); // Fehler werfen, wenn die Datei nicht gefunden wird
  }

  // Bestimmt den Pfad der Datei und ließt deren Inhalt
  const filePath = path.join(uploadDir, `${fileId}.txt`);
  return await fs.readFile(filePath, 'utf-8'); // Datei im UTF-8-Format lesen und den Inhalt zurückgeben
};
await loadFileData();