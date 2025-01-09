import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';  // Importiere das JWT-Plugin
import { fastifyMultipart } from '@fastify/multipart';  // Multipart-Plugin für Datei-Uploads
import commentRoutes from './routes/commentRoutes.mjs';  // Beispiel für andere Routen
import customerRoutes from './routes/customerRoutes.mjs';  // Beispiel für andere Routen
import offerRoutes from './routes/offerRoutes.mjs';  // Beispiel für andere Routen
import fileRoutes from './routes/fileRoutes.mjs';  // Beispiel für Datei-Uploads
import authRoutes from './routes/authRoutes.mjs';  // Authentifizierungs-Routen
import { fileURLToPath } from 'url';  // Import für URL-Handling
import { dirname, join } from 'path';  // Import für Pfad-Manipulation
import cors from '@fastify/cors';

const SECRET_KEY = 'dein_geheimer_jwt_schlüssel';  // Geheimer Schlüssel für JWT

const fastify = Fastify({
  logger: true,  // Aktiviert das Logging für Debugging
});

// 👉 Registriere das CORS-Plugin
await fastify.register(cors, {
  origin: true,  // Erlaubt alle Domains
});

// Hole den aktuellen Dateipfad und den Verzeichnispfad
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pfad für das Assets-Verzeichnis
const assetsDir = join(__dirname, 'assets');

// Route für die Root-URL definieren
fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html');  // Zum Beispiel eine HTML-Datei im public-Ordner
});

// JWT-Plugin registrieren
fastify.register(fastifyJwt, {
  secret: SECRET_KEY,  // Geheimen Schlüssel für JWT angeben
});

// Multipart-Plugin für Datei-Uploads registrieren
fastify.register(fastifyMultipart);

// Beispielrouten registrieren
fastify.register(commentRoutes);
fastify.register(customerRoutes);
fastify.register(offerRoutes);
fastify.register(fileRoutes);
fastify.register(authRoutes);  // Authentifizierungs-Routen registrieren

// Server starten
try {
  await fastify.listen({ port: 8080 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
