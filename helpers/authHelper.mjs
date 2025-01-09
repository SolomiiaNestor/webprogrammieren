import pkg from 'http-errors'; // Importiert das gesamte Paket 'http-errors' als 'pkg'
const { Forbidden } = pkg; // Extrahiert die Forbidden-Fehlerklasse aus dem Paket

const users = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'Account-Manager'
  },
  {
    username: 'user1',
    password: 'user123',
    role: 'Developer'
  }
];


/**
 * Eine Hilfsfunktion, um den Authorization-Header zu extrahieren und die Benutzerrolle zu validieren.
 * @param {Array} allowedRoles - Eine Liste von erlaubten Rollen, die Zugriff auf die Route haben.
 * @returns {Function} - Gibt eine Middleware zurück, die den Authorization-Header überprüft.
 */
export function checkRole(allowedRoles) {
  
  return (request, reply, next) => {
    // Den Authorization-Header extrahieren
    const authHeader = request.headers['authorization'];

    // Überprüfen, ob der Authorization-Header vorhanden ist
    if (!authHeader) {
      return reply.status(401).send({ message: "Authorization header is missing" });
    }

    // Bearer Authentication Format entpacken: "Bearer <Role>"
    const [scheme, role] = authHeader.split(' ');

    // Überprüfen, ob das Format korrekt ist (muss 'Bearer' und eine Rolle enthalten)
    if (scheme !== 'Bearer' || !role) {
      return reply.status(401).send({ message: "Invalid Authorization format. Expected: Bearer <role>" });
    }

    // Überprüfen, ob die Rolle des Benutzers in den erlaubten Rollen enthalten ist
    if (!allowedRoles.includes(role)) {
      return reply.status(403).send({ message: "You do not have permission to perform this action" });
    }

    // Falls alles in Ordnung ist, speichere die Rolle des Benutzers in der Anfrage und fahre fort
    request.user = { role }; // Setzt die Benutzerrolle in der Anfrage
    next(); // Fährt mit der nächsten Middleware oder Route fort
  };

  
}
