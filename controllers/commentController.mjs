import Comment from '../models/Comment.mjs';
import { getOffer } from '../controllers/offerController.mjs';

const comments = [];  // Eine Liste, die alle Kommentare speichert
let commentCounter = 1; // Zähler für die Vergabe einer einzigartigen ID für jeden Kommentar

// Funktion zum Hinzufügen eines Kommentars
export const addComment = (content, offerId) => {
  const offer = getOffer(offerId);
  
  // Überprüfen, ob das Angebot den Status "Draft" hat. In diesem Fall dürfen keine Kommentare hinzugefügt werden.
  if (offer.status === 'Draft') {
    throw new Error("Cannot add comments to an offer in 'Draft' status.");  // Fehler werfen, wenn das Angebot im Entwurfsstatus ist
  }

  if (!offer) {
    throw new Error("Offer not found.");
  }
  if (offer.status === undefined) {
    throw new Error("Cannot add comments to an offer in 'Active' status.");  // Fehler werfen, wenn das Angebot im Entwurfsstatus ist
  }

  // Erstellen einen neuen Kommentar mit einer eindeutigen ID und hinzufügen ihn der Liste der Kommentare
  const newComment = new Comment(commentCounter++, content, offerId);
  comments.push(newComment);
  
  // Rückgabe des neu erstellten Kommentars
  return newComment;
};

// Funktion zum Abrufen aller Kommentare für ein bestimmtes Angebot
export const getCommentsForOffer = (offerId) => {
  return comments.filter(comment => comment.offerId === offerId);
};

// Funktion zum Abrufen eines Kommentars anhand der Kommentar-ID und Angebot-ID
export const getCommentById = (offerId, commentId) => {
  return comments.find(comment => comment.offerId === parseInt(offerId) && comment.id === parseInt(commentId));
};

// Funktion zum Aktualisieren eines Kommentars
export const updateComment = (commentId, newContent) => {
  const comment = getCommentById(commentId);
  
  // Wenn der Kommentar gefunden wurde, wird der Inhalt des Kommentars mit den neuen Inhalten ersetzt
  if (comment) {
    comment.content = newContent; // Aktualisiert den Inhalt des Kommentars
    return comment; // Rückgabe des aktualisierten Kommentars
  }
  
  // Wenn der Kommentar nicht gefunden wurde, gibt null zurück
  return null;
};

// Funktion zum Löschen eines Kommentars
export const deleteComment = (commentId) => {
  const index = comments.findIndex(comment => comment.id === commentId);
  
  if (index !== -1) {
    return comments.splice(index, 1)[0]; // Entfernt das Kommentarobjekt und gibt es zurück
  }
  return null;
};
