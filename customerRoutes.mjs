import { addCustomer, getCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController.mjs'; // CRUD-Funktionen für Kunden
import { customers } from '../controllers/customerController.mjs';

async function customerRoutes(fastify) {
  // Route: Alle Kunden abrufen
  fastify.get('/customers', async () => {
    return customers; // Gibt alle Kunden zurück
  });

  // Route: Ein spezifischen Kunden anhand der ID abrufen
  fastify.get('/customers/:id', async (request, reply) => {
    const customer = getCustomer(parseInt(request.params.id)); // Kundendaten anhand der ID abrufen
    if (!customer) return reply.status(404).send({ message: 'Customer not found' }); // Fehler, wenn der Kunde nicht gefunden wird
    return customer; // Gefundenen Kunden zurückgeben
  });

  // Route: Neuen Kunden erstellen
  fastify.post('/customers', async (request, reply) => {
    const newCustomer = addCustomer(request.body); // Neuen Kunden aus den Request-Daten erstellen
    return reply.status(201).send(newCustomer); // Erfolgreich erstellten Kunden zurückgeben
  });

  // Route: Kunden aktualisieren
  fastify.put('/customers/:id', async (request, reply) => {
    const customer = updateCustomer(parseInt(request.params.id), request.body); // Kunden anhand der ID und neuen Daten aktualisieren
    if (!customer) return reply.status(404).send({ message: 'Customer not found' }); // Fehler, wenn der Kunde nicht gefunden wird
    return customer; // Aktualisierten Kunden zurückgeben
  });

  // Route: Kunden löschen
  fastify.delete('/customers/:id', async (request, reply) => {
    const customer = deleteCustomer(parseInt(request.params.id)); // Kunden anhand der ID löschen
    if (!customer) return reply.status(404).send({ message: 'Customer not found' }); // Fehler, wenn der Kunde nicht gefunden wird
    return { message: 'Customer deleted' }; // Erfolgreich gelöscht
  });
}

// Exportiert die Routenfunktion
export default customerRoutes;
