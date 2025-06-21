// Importiamo la connessione al database
const connection = require('../data/db')

// Funzione per ottenere tutti i videogiochi
const index = (req, res) => {
    const search = req.query.search;
    console.log('Parametro search:', search);
    let sql = `
    SELECT videogame.*, GROUP_CONCAT(genre.name SEPARATOR ', ') AS genres
    FROM videogame
    JOIN videogame_genre ON videogame.id = videogame_genre.videogame_id
    JOIN genre ON videogame_genre.genre_id = genre.id`;
    let params = [];

    if (search) {
        const searchTerm = `%${search}%`;
        sql += `
      WHERE videogame.title LIKE ?
      OR videogame.description LIKE ?
      OR videogame.software_house LIKE ?
      OR genre.name LIKE ?
    `;
        params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    sql += ' GROUP BY videogame.id ORDER BY videogame.title ASC';
    // Eseguiamo la query per selezionare tutti i videogiochi
    connection.query(sql, params, (err, gamesResult) => {
        // In caso di errore, restituiamo un errore 500
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });

        // Aggiungiamo il percorso completo dell'immagine a ogni gioco
        const games = gamesResult.map(game => ({
            ...game,
            image: `${req.imagePath}/${game.image}`
        }))
        // Inviamo i giochi come risposta JSON
        res.json(games)
    })
}

// Funzione per ottenere i videogiochi filtrati per genere
const filterByGenre = (req, res) => {
    const genre = req.query.genre; // Ottieni il genere dai parametri di query

    let sql = `
    SELECT videogame.*, GROUP_CONCAT(genre.name SEPARATOR ', ') AS genres
    FROM videogame
    JOIN videogame_genre ON videogame.id = videogame_genre.videogame_id
    JOIN genre ON videogame_genre.genre_id = genre.id
    `;
    const params = [];

    if (genre) {
        sql += `WHERE genre.name = ? `;
        params.push(genre);
    }

    sql += 'GROUP BY videogame.id ORDER BY videogame.title ASC';

    // Eseguiamo la query per filtrare i videogiochi per genere
    connection.query(sql, params, (err, gamesResult) => {
        if (err) {
            console.error("Errore nella query:", err);
            return res.status(500).json({ error: "Database Query Failed:" + err });
        }

        // Restituiamo i videogiochi filtrati come JSON
        res.json(gamesResult);
    });
};

// Funzione per ordinare i videogiochi per prezzo dal più alto al più basso
const orderByPriceDesc = (req, res) => {
    // Eseguiamo la query con ordinamento per prezzo discendente
    connection.query('SELECT * FROM videogame ORDER BY price DESC', (err, result) => {
        // In caso di errore, restituiamo un errore 500
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });
        // Aggiungiamo il percorso completo dell'immagine a ogni gioco
        const games = result.map(game => ({
            ...game,
            image: `${req.imagePath}/${game.image}`
        }))
        // Inviamo i giochi ordinati come risposta JSON
        res.json(games);
    })
}

// Funzione per ordinare i videogiochi per prezzo dal più basso al più alto
const orderByPriceAsc = (req, res) => {
    // Eseguiamo la query con ordinamento per prezzo ascendente
    connection.query('SELECT * FROM videogame ORDER BY price ASC', (err, result) => {
        // In caso di errore, restituiamo un errore 500
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });
        // Aggiungiamo il percorso completo dell'immagine a ogni gioco
        const games = result.map(game => ({
            ...game,
            image: `${req.imagePath}/${game.image}`
        }))
        // Inviamo i giochi ordinati come risposta JSON
        res.json(games);
    })
}

// Funzione per ottenere i prodotti correlati ad un videogioco
const relatedProducts = (req, res) => {
    const productId = req.params.id;
    
    // Query SQL per trovare prodotti correlati
    const query = `
        SELECT DISTINCT 
            v.id,
            v.title,
            v.price,
            v.image,
            v.discount,
            v.software_house
        FROM videogame v
        JOIN videogame_genre vg ON v.id = vg.videogame_id
        WHERE vg.genre_id IN (
            SELECT genre_id 
            FROM videogame_genre 
            WHERE videogame_id = ?
        )
        AND v.id != ?
        ORDER BY RAND()
        LIMIT 8
    `;
    
    // Esegui la query
    connection.query(query, [productId, productId], (error, results) => {
        if (error) {
            console.log('Errore nel recuperare prodotti correlati:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Errore del server' 
            });
        }

        // Aggiungi il percorso completo dell'immagine a ogni prodotto correlato
        const products = results.map(product => ({
            ...product,
            image: `${req.imagePath}/${product.image}`
        }));

        res.json({
            success: true,
            data: products
        });
    });
};

// Funzione per ottenere i dettagli di un singolo videogioco
const show = (req, res) => {
    // Estraiamo l'ID dalla richiesta
    const { id } = req.params

    // Query per ottenere il gioco con i suoi generi
    const recordSql = `
        SELECT v.*, GROUP_CONCAT(g.name) AS genres
        FROM videogame v
        LEFT JOIN videogame_genre vg ON v.id = vg.videogame_id
        LEFT JOIN genre g ON vg.genre_id = g.id
        WHERE v.id = ?
        GROUP BY v.id
    `
    // Eseguiamo la query passando l'ID come parametro
    connection.query(recordSql, [id], (err, recordResult) => {
        // In caso di errore, restituiamo un errore 500
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });

        // Se non troviamo risultati, restituiamo un errore 404
        if (recordResult.length === 0) return res.status(404).json({ error: "Record not found" });

        // Prendiamo il primo risultato
        const record = recordResult[0]

        // Trasformiamo la stringa di generi in un array
        if (record.genres) {
            record.genres = record.genres.split(',');
        } else {
            record.genres = [];
        }

        // Aggiungiamo il percorso completo dell'immagine
        record.image = `${req.imagePath}/${record.image}`
        // Inviamo il gioco come risposta JSON
        res.json(record)
    })
}


//store ordine
const store = (req, res) => {

}

// Funzione per aggiornare la quantità dei giochi una volta aggiunti al carrello
const update = (req, res) => {
    const { id } = req.params
    const minusQuantitySql = `
    UPDATE videogame
    SET quantity = quantity - 1
    WHERE id = ?`

    connection.query(minusQuantitySql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });

        // Inviamo una risposta di successo
        res.json({ message: "Quantity updated successfully" });
    })
}

module.exports = {
    index,
    filterByGenre,
    show,
    orderByPriceDesc,
    orderByPriceAsc,
    relatedProducts,
    update
}