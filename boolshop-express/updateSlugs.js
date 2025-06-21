require('dotenv').config();
const mysql = require('mysql2/promise');
const slugify = require('./utils/slugify'); // importa la tua funzione slugify

async function updateSlugs() {
  // Configura la connessione al DB
  const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


  try {
    // Leggi id e title di tutti i videogiochi
    const [rows] = await connection.execute('SELECT id, title FROM videogame');

    for (const row of rows) {
      // Genera lo slug dal titolo
      const slug = slugify(row.title);

      // Aggiorna il campo slug per questo videogame
      await connection.execute('UPDATE videogame SET slug = ? WHERE id = ?', [slug, row.id]);

      console.log(`Aggiornato: ${row.title} -> ${slug}`);
    }
  } catch (err) {
    console.error('Errore durante l\'aggiornamento degli slug:', err);
  } finally {
    await connection.end();
  }
}

updateSlugs();
