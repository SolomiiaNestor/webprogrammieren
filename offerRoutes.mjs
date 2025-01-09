import { addOffer, getOffer, updateOffer, changeOfferStatus, deleteOffer } from '../controllers/offerController.mjs';// CRUD-Funktionen für Angebote
import { checkRole } from '../helpers/authHelper.mjs';// Middleware zur Rollenprüfung
import { offers } from '../controllers/offerController.mjs'; // Liste der Angebote importieren
import { transformLegacyData } from '../controllers/offerController.mjs';  // Funktion zur Verarbeitung von Legacy-Daten


async function offerRoutes(fastify) {
  // Route: Alle Angebote abrufen
  fastify.get('/offers', async () => {
    return offers;// Gibt die gesamte Angebotsliste zurück
  });

  // Route: Ein spezifisches Angebot abrufen
  fastify.get('/offers/:id', async (request, reply) => {
    const offer = getOffer(parseInt(request.params.id));// ID in Zahl konvertieren und Angebot suchen
    if (!offer) return reply.status(404).send({ message: 'Offer not found' });// Fehler, falls Angebot nicht existiert
    return offer;// Gefundenes Angebot zurückgeben
  });

  // Route: Neues Angebot erstellen
  fastify.post('/offers', { preHandler: checkRole(['Account-Manager', 'Developer']) },  async (request, reply) => {
    const newOffer = addOffer(request.body);// Neues Angebot aus Request-Body erstellen
    return reply.status(201).send(newOffer);
  });

  // Route: Angebot aktualisieren
  fastify.put('/offers/:id', { preHandler: checkRole(['Account-Manager', 'Developer']) }, async (request, reply) => {
    const offer = updateOffer(parseInt(request.params.id), request.body); // Angebot mit neuer ID und Daten aktualisieren
    if (!offer) return reply.status(404).send({ message: 'Offer not found' }); // Fehler bei nicht vorhandenem Angebot
    return offer;
  });

    // Route: Angebotsstatus ändern
    fastify.patch('/offers/:id/status', { preHandler: checkRole(['Account-Manager', 'Developer']) }, async (request, reply) => {
      const { newStatus } = request.body;// Status aus dem Request-Body abrufen
      if (!newStatus) {
        return reply.status(400).send({ message: "Missing new status" });// Fehler bei fehlendem Status
      }
  
      try {
        const updatedOffer = changeOfferStatus(parseInt(request.params.id), newStatus);// Status aktualisieren
        return reply.status(200).send(updatedOffer);// Erfolgreich aktualisiert
      } catch (err) {
        return reply.status(400).send({ message: err.message });// Fehler bei ungültigem Status
      }
    });

    // Route: Angebot löschen
  fastify.delete('/offers/:id', { preHandler: checkRole(['Account-Manager']) }, async (request, reply) => {
    const offer = deleteOffer(parseInt(request.params.id));// Angebot löschen
    if (!offer) return reply.status(404).send({ message: 'Offer not found' });
    return { message: 'Offer deleted' };
  });

 // Route: Legacy-Daten verarbeiten und als neues Angebot hinzufügen
  fastify.post('/offers/legacy', {preHandler: checkRole(['Account-Manager', 'Developer']) }, async (request, reply) => {
    try {
      const legacyData = request.body; // Legacy-Daten aus dem Request-Body lesen
      const transformedOffer = transformLegacyData(legacyData);// Legacy-Daten transformieren

      // Neues Angebot basierend auf den transformierten Daten hinzufügen
      const newOffer = addOffer(transformedOffer);
      return reply.status(201).send(newOffer); // Erfolgreich hinzugefügt
    } catch (error) {
      console.error('Error processing legacy data:', error); // Fehler protokollieren
      return reply.status(400).send({ message: error.message });// Fehler an den Client senden
    }
  });
}

// Export der Routen
export default offerRoutes;
