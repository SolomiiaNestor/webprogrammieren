/**
 * File Model
 * Stellt eine Datei mit einer eindeutigen ID, Dateiname, URL und zugehörigem Angebot dar.
 */
class File {
  /**
   * Konstruktor für die Datei.
   * @param {number} id - Die eindeutige ID der Datei.
   * @param {string} fileName - Der Name der Datei.
   * @param {string} url - Die URL der Datei.
   * @param {number} offerID - Die ID des Angebots, mit dem die Datei verknüpft ist.
   */
  constructor(id, fileName, url, offerID) {
    this.id = id; // ID der Datei
    this.fileName = fileName; // Dateiname
    this.url = url; // URL der Datei
    this.offerID = offerID; // ID des zugehörigen Angebots
  }
}

// Exportiere die File-Klasse
export default File;
