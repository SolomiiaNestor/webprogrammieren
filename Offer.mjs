let offerCounter = 1; // Zähler für einzigartige Angebot-IDs

/**
 * Offer Model
 * Definiert ein Angebot mit einer einzigartigen ID, Beschreibung, Preis, Status und dem zugehörigen Kunden.
 */
class Offer {
  /**
   * Konstruktor für das Angebot.
   * @param {number} customerId - Die ID des zugehörigen Kunden.
   * @param {string} description - Die Beschreibung des Angebots.
   * @param {number} price - Der Preis des Angebots.
   * @param {string} status - Der Status des Angebots, Standard ist "Draft".
   */
  constructor(customerId, description, price, status = "Draft") {
    this.id = offerCounter++; // Setzt die ID des Angebots und erhöht den Zähler für das nächste Angebot
    this.customerId = customerId; // Setzt die Kunden-ID des Angebots
    this.description = description; // Setzt die Beschreibung des Angebots
    this.price = price; // Setzt den Preis des Angebots
    this.status = status; // Setzt den Status des Angebots (Standard ist "Draft")
  }
}

// Exportiert die Offer-Klasse als Standard-Export
export default Offer;
