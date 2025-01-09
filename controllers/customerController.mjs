import Customer from '../models/Customer.mjs';

const customers = [
    { id: 1, firstName: 'Max', lastName: 'Mustermann', email: 'max@example.com' },
    { id: 2, firstName: 'Anna', lastName: 'Schmidt', email: 'anna@example.com' },
  ];
  
  

// Funktion zum Hinzufügen eines neuen Kunden
function addCustomer(customerProps) {
    // Überprüfen, ob alle notwendigen Felder (Vorname, Nachname, E-Mail) übergeben wurden
    if (!customerProps.firstName || !customerProps.lastName || !customerProps.email) {
        throw new Error("Missing required fields: firstName, lastName, email");
    }
    
    // Ein neues Customer-Objekt wird basierend auf den übergebenen Eigenschaften erstellt
    const newCustomer = new Customer(
        customerProps.firstName,
        customerProps.lastName,
        customerProps.email,
        customerProps.status
    );
    
    // Das neu erstellte Customer-Objekt wird in die Liste der Kunden eingefügt
    customers.push(newCustomer);
    
    // Das neu hinzugefügte Customer-Objekt wird zurückgegeben
    return newCustomer;
}

// Funktion zum Abrufen eines Kunden anhand der ID
function getCustomer(id) {
    // Die Kundenliste wird durchsucht und der Kunde mit der passenden ID wird zurückgegeben
    return customers.find(customer => customer.id === id);
}

// Funktion zum Aktualisieren eines bestehenden Kunden
function updateCustomer(id, updates) {
    // Der Kunde wird anhand der ID gesucht
    const customer = getCustomer(id);
    
    // Wenn der Kunde gefunden wurde, werden die übergebenen Änderungen auf das Kundenobjekt angewendet
    if (customer) {
        Object.assign(customer, updates); // Aktualisiert die Eigenschaften des Kunden
        return customer;
    }
    
    // Falls der Kunde nicht gefunden wird, wird null zurückgegeben
    return null;
}

// Funktion zum Löschen eines Kunden
function deleteCustomer(id) {
    // Der Index des Kunden mit der passenden ID wird ermittelt
    const index = customers.findIndex(customer => customer.id === id);
    
    // Wenn der Kunde gefunden wurde, wird er aus der Liste entfernt und zurückgegeben
    if (index !== -1) {
        return customers.splice(index, 1)[0]; // Entfernt das Kundenobjekt und gibt es zurück
    }
    
    // Falls der Kunde nicht gefunden wird, wird null zurückgegeben
    return null;
}

// Exportiert die Funktionen, sodass sie von anderen Modulen verwendet werden können
export { addCustomer, getCustomer, updateCustomer, deleteCustomer, customers };
