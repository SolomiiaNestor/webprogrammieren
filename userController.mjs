// Beispiel-Datenbank (hier als Array)
const users = [
    { id: 1, username: 'user1', password: 'password123', role: 'admin' },
    { id: 2, username: 'user2', password: 'password456', role: 'user' },
  ];
  
  export async function validateUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    return user || null; // Gibt den Benutzer zurück oder null, falls nicht gefunden
  }
  