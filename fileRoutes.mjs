import { uploadFile, getOfferFiles, getFileContent } from '../controllers/fileController.mjs'; // Controller-Funktionen für Dateioperationen
import { checkRole } from '../helpers/authHelper.mjs'; // Middleware zur Rollenüberprüfung

async function fileRoutes(fastify) {
  // Route: Datei hochladen (nur für Developer und Account-Manager)
  fastify.post('/upload/:offerId', { preHandler: checkRole(['Developer', 'Account-Manager']) }, async (request, reply) => {
    const offerId = request.params.offerId; // Angebots-ID aus der Route
    const file = await request.file(); // Datei mit Fastify-Multipart erhalten

    if (!file) {
      return reply.status(400).send({ message: 'Keine Datei hochgeladen' }); // Fehler bei fehlender Datei
    }

    try {
      const uploadedFile = await uploadFile(file, offerId); // Datei hochladen und zugehöriges Angebot verknüpfen
      return reply.status(201).send({
        id: uploadedFile.id, // ID der hochgeladenen Datei
        fileName: uploadedFile.fileName, // Name der Datei
        url: uploadedFile.url, // URL der Datei
        offerID: uploadedFile.offerID, // Zugehörige Angebots-ID
      });
    } catch (error) {
      return reply.status(500).send({ message: error.message }); // Fehler beim Hochladen
    }
  });

  // Route: Abrufen aller Dateien für ein Angebot
  fastify.get('/offers/:offerId/files', { preHandler: checkRole(['User', 'Developer', 'Account-Manager']) }, async (request, reply) => {
    const offerId = request.params.offerId; // Angebots-ID aus der Route

    try {
      const fileInfos = await getOfferFiles(offerId); // Liste der Dateien für das Angebot abrufen
      reply.send(fileInfos); // Erfolgreich zurückgeben
    } catch (error) {
      reply.status(404).send({ message: error.message }); // Fehler bei nicht gefundenen Dateien
    }
  });

  // Route: Abrufen des Inhalts einer Datei (nur Textdateien)
  fastify.get('/assets/:fileId.txt', { preHandler: checkRole(['User', 'Developer', 'Account-Manager']) }, async (request, reply) => {
    const fileId = request.params.fileId; // Datei-ID aus der Route

    try {
      const fileContent = await getFileContent(fileId); // Inhalt der Datei abrufen
      reply.type('text/plain').send(fileContent); // Dateiinhalt im Textformat zurückgeben
    } catch (error) {
      reply.status(404).send({ message: error.message }); // Fehler bei nicht gefundener Datei
    }
  });
}

// Exportiere die Routenfunktion
export default fileRoutes;
