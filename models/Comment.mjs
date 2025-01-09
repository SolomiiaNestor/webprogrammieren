/**
 * Comment Model
 * Stellt einen Kommentar mit einer eindeutigen ID, Inhalt und der zugehörigen Angebots-ID dar.
 */
export default class Comment {
  /**
   * Konstruktor für den Kommentar.
   * @param {number} id - Die eindeutige ID des Kommentars.
   * @param {string} content - Der Inhalt des Kommentars.
   * @param {number} offerId - Die ID des Angebots, zu dem der Kommentar gehört.
   */
  constructor(id, content, offerId) {
    this.id = id; // Setzt die ID des Kommentars
    this.content = content; // Setzt den Inhalt des Kommentars
    this.offerId = offerId; // Verknüpft den Kommentar mit der Angebots-ID
  }
}
