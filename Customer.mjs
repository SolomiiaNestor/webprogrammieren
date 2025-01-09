let customerCounter = 1; 

/**
 * Customer Model
 * Stellt einen Kunden mit einer eindeutigen ID, Vorname, Nachname, E-Mail, Status und zugehörigen Angeboten dar.
 */
class Customer {
  /**
   * Konstruktor für den Kunden.
   * @param {string} firstName - Der Vorname des Kunden.
   * @param {string} lastName - Der Nachname des Kunden.
   * @param {string} email - Die E-Mail-Adresse des Kunden.
   * @param {string} status - Der Status des Kunden, Standard ist "active".
   */
  constructor(firstName, lastName, email, status = "active") {
    this.id = customerCounter++; // Setzt die ID des Kunden und erhöht den Zähler
    this.firstName = firstName;  // Setzt den Vornamen des Kunden
    this.lastName = lastName;    // Setzt den Nachnamen des Kunden
    this.email = email;          // Setzt die E-Mail-Adresse des Kunden
    this.status = status;        // Setzt den Status des Kunden (Standard ist "active")
    this.offers = [];            // Initialisiert das Array für zugehörige Angebote
  }
}

// Exportiert die Customer-Klasse
export default Customer;
