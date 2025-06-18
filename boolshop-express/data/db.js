// Importiamo il modulo mysql2 per la connessione al database
const mysql = require('mysql2');

// Creiamo una connessione al database MySQL usando le variabili d'ambiente
// Se DB_HOST non è definito, usiamo "localhost" come valore predefinito
const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Stabiliamo la connessione al database
connection.connect((err) => {
    if (err) {
        // Se c'è un errore, lo mostriamo nella console
        console.log(err);
        return;
    } else {
        // Se la connessione è riuscita, mostriamo un messaggio di conferma
        console.log('Connected to MySQL');
    }
});

module.exports = connection;
