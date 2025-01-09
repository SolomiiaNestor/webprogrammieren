import { addComment, getCommentsForOffer, getCommentById, updateComment, deleteComment } from '../controllers/commentController.mjs'; // Importiere Kommentar-Controller-Funktionen
import { getOffer } from '../controllers/offerController.mjs'; // Importiere Angebot-Controller
import { checkRole } from '../helpers/authHelper.mjs'; // Middleware zur Rollenüberprüfung

async function commentRoutes(fastify) {

  // Route zum Hinzufügen eines Kommentars zu einem Angebot
  fastify.post('/offers/:offerId/comments', { preHandler: checkRole(['Developer', 'Account-Manager', 'User']) }, async (request, reply) => {
    const offerId = parseInt(request.params.offerId, 10); // Angebots-ID aus der URL
    const { content } = request.body; // Kommentarinhalt aus dem Body

    const offer = getOffer(offerId);

    if (isNaN(offerId)) {
      return reply.status(400).send({ message: 'Invalid offerId format' });
    }

    if (!offer) { // Wenn das Angebot nicht gefunden wurde
      return reply.status(404).send({ message: 'Offer not found' });
    }

    if (offer.status === 'Draft') { // Wenn das Angebot den Status 'Draft' hat
      return reply.status(400).send({ message: "Cannot add comments to an offer in 'Draft' status" });
    }

    if (!content) { // Wenn der Kommentarinhalt fehlt
      return reply.status(400).send({ message: 'Content is required for the comment' });
    }

    const newComment = addComment(content, offerId); // Kommentar hinzufügen
    return reply.status(201).send(newComment); // Erfolgreiche Antwort mit neuem Kommentar
  });

  // Route zum Abrufen aller Kommentare für ein Angebot
  fastify.get('/offers/:offerId/comments', { preHandler: checkRole(['Developer', 'Account-Manager', 'User']) }, async (request, reply) => {
    const offerId = request.params.offerId; // Angebots-ID aus der URL
    const commentsForOffer = getCommentsForOffer(offerId); // Kommentare für das Angebot abrufen
    return reply.send(commentsForOffer); // Erfolgreiche Antwort mit Kommentaren
  });

  // Route zum Abrufen eines spezifischen Kommentars anhand der Kommentar-ID
  fastify.get('/offers/:offerId/comments/:commentId', { preHandler: checkRole(['Developer', 'Account-Manager', 'User']) }, async (request, reply) => {
    const offerId = request.params.offerId; // Angebots-ID aus der URL
    const commentId = request.params.commentId; // Kommentar-ID aus der URL

    const comment = getCommentById(offerId, commentId); // Spezifischen Kommentar abrufen

    if (!comment) { // Wenn der Kommentar nicht gefunden wurde
      return reply.status(404).send({ message: 'Comment not found' });
    }

    return reply.send(comment); // Erfolgreiche Antwort mit dem Kommentar
  });

  // Route zum Aktualisieren eines Kommentars
  fastify.put('/comments/:commentId', { preHandler: checkRole(['Developer', 'Account-Manager']) }, async (request, reply) => {
    const commentId = request.params.commentId; // Kommentar-ID aus der URL
    const { content } = request.body; // Neuer Kommentarinhalt aus dem Body

    if (!content) { // Wenn der Kommentarinhalt fehlt
      return reply.status(400).send({ message: 'Content is required for the comment' });
    }

    const updatedComment = updateComment(commentId, content); // Kommentar aktualisieren
    if (!updatedComment) { // Wenn der Kommentar nicht gefunden wurde
      return reply.status(404).send({ message: 'Comment not found' });
    }

    return reply.send(updatedComment); // Erfolgreiche Antwort mit dem aktualisierten Kommentar
  });

  // Route zum Löschen eines Kommentars
  fastify.delete('/comments/:commentId', { preHandler: checkRole(['Developer', 'Account-Manager']) }, async (request, reply) => {
    const commentId = request.params.commentId; // Kommentar-ID aus der URL
    const deletedComment = deleteComment(commentId); // Kommentar löschen

    if (!deletedComment) { // Wenn der Kommentar nicht gefunden wurde
      return reply.status(404).send({ message: 'Comment not found' });
    }

    return reply.send({ message: 'Comment deleted successfully' }); // Erfolgreiche Löschbestätigung
  });

}

// Exportiert die Routenfunktion
export default commentRoutes;
