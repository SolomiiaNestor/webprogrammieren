import Offer from '../models/Offer.mjs';

const offers = [];  // Array zur Speicherung aller Angebote

/**
 * Funktion zur Änderung des Status eines Angebots.
 * Überprüft, ob der Statuswechsel gültig ist.
 * @param {number} id - Die ID des Angebots
 * @param {string} newStatus - Der neue Status des Angebots
 * @returns {object} - Das aktualisierte Angebot
 * @throws {Error} - Wenn der Statuswechsel ungültig ist
 */
function changeOfferStatus(id, newStatus) {
    const offer = offers.find(o => o.id === id); // Das Angebot anhand der ID suchen
    if (!offer) {
        throw new Error("Offer not found"); // Fehler, wenn das Angebot nicht gefunden wurde
    }

    // Überprüfen, ob der Statuswechsel erlaubt ist
    if (offer.status === 'Draft' && newStatus === 'In Progress') {
        throw new Error("Cannot change to 'In Progress' from 'Draft'.");
    }
    if (offer.status === 'In Progress' && newStatus === 'Draft') {
        throw new Error("Cannot revert to 'Draft' from 'In Progress'.");
    }
    if (offer.status === 'Active' && (newStatus === 'Draft' || newStatus === 'In Progress')) {
        throw new Error("Cannot change to 'Draft' or 'In Progress' from 'Active'.");
    }
    if (offer.status === 'On Ice' && (newStatus === 'Draft' || newStatus === 'In Progress' || newStatus === 'Active')) {
        throw new Error("Cannot change status from 'On Ice' to any other state.");
    }

    offer.status = newStatus; // Wenn der Wechsel gültig ist, den Status ändern
    return offer;
}

/**
 * Funktion zum Hinzufügen eines neuen Angebots.
 * @param {object} offerProps - Die Eigenschaften des Angebots (Kundendaten, Beschreibung, Preis, Status)
 * @returns {object} - Das neu hinzugefügte Angebot
 */
function addOffer(offerProps) {
    const newOffer = new Offer(
        offerProps.customerId,  // Kunden-ID
        offerProps.description, // Beschreibung des Angebots
        offerProps.price,       // Preis des Angebots
        offerProps.status       // Status des Angebots (Standardwert: "Draft")
    );
    offers.push(newOffer); // Das neue Angebot zum Array hinzufügen
    return newOffer;
}

/**
 * Funktion zum Abrufen eines Angebots anhand seiner ID.
 * @param {number} id - Die ID des Angebots
 * @returns {object|null} - Das Angebot, wenn gefunden, andernfalls null
 */
function getOffer(id) {
    console.log('Searching for offer with ID:', id);  // Debugging-Zeile zum Überprüfen der ID-Suche
    console.log(offers);
    let foundOffers = offers.find(offer => offer.id == id);
    console.log(`Gefundene: ${foundOffers}`);
    return offers.find(offer => offer.id === id);  // Das Angebot anhand der ID suchen
}

/**
 * Funktion zum Aktualisieren eines Angebots.
 * @param {number} id - Die ID des Angebots
 * @param {object} updates - Die neuen Werte, die im Angebot aktualisiert werden sollen
 * @returns {object|null} - Das aktualisierte Angebot, wenn erfolgreich, andernfalls null
 */
function updateOffer(id, updates) {
    const offer = getOffer(id); // Das Angebot anhand der ID abrufen
    if (offer) {
        Object.assign(offer, updates); // Die neuen Werte auf das Angebot anwenden
        return offer;
    }
    return null; // Wenn das Angebot nicht gefunden wurde, null zurückgeben
}

/**
 * Funktion zum Löschen eines Angebots anhand seiner ID.
 * @param {number} id - Die ID des Angebots
 * @returns {object|null} - Das gelöschte Angebot, wenn gefunden, andernfalls null
 */
function deleteOffer(id) {
    const index = offers.findIndex(offer => offer.id === id);  // Index des Angebots suchen
    if (index !== -1) {
        return offers.splice(index, 1)[0];  // Das Angebot löschen und zurückgeben
    }
    return null;  // Wenn das Angebot nicht gefunden wurde, null zurückgeben
}

// Funktion zur Transformation der Legacy-Daten
function transformLegacyData(legacyData) {
    // Extrahiere die relevanten Daten aus dem Legacy JSON
    const legacyOffer = legacyData.xOffer;
    // Neues Datenformat erstellen
    return {
    customerId: legacyOffer.customerId,           // Bereits passend zur neuen Struktur
    description: legacyOffer.name || 'No Name',   // Verwende "name" als Beschreibung
    price: legacyOffer.price,                     // Preis beibehalten
    status: mapLegacyStatus(legacyOffer.state),   // Status mappen
    };
}
      
// Hilfsfunktion, um den Status von Legacy-Daten zu mappen
function mapLegacyStatus(legacyStatus) {
// Passe die Status an, falls es Unterschiede gibt
    const statusMapping = {
    'Active': 'Active',
    'On-Ice': 'On Ice',
    'Draft': 'Draft',
    'In Progress': 'In Progress',
    };
      
// Rückgabe des gemappten Status oder Standardwert
    return statusMapping[legacyStatus] || 'Draft';
}
  
  // Export the functions
export {offers};
export { addOffer, getOffer, updateOffer, changeOfferStatus, deleteOffer, transformLegacyData};

