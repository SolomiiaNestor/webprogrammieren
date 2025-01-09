import { validateUser } from '../controllers/userController.mjs';  // Importiere die Benutzer-Validierungsfunktion

async function authRoutes(fastify) {
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;  // Benutzerdaten aus der Anfrage

    if (!username || !password) {
      return reply.status(400).send({ message: 'Username and password are required' });
    }

    try {
      const user = await validateUser(username, password);  // Benutzer validieren

      if (!user) {
        return reply.status(401).send({ message: 'Invalid username or password' });
      }

      // JWT-Token erstellen
      const token = fastify.jwt.sign({ id: user.id, role: user.role });

      return reply.send({ token });  // Token zurück an den Benutzer senden
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
}

export default authRoutes;
