// Importiamo la connessione al database
const connection = require('../data/db')
// Importo la funzione slugify
const slugify = require('../utils/slugify');

// Funzione per ottenere tutti i videogiochi
const index = (req, res) => {
    const search = req.query.search;
    console.log('Parametro search:', search);
    let sql = `
    SELECT videogame.*, videogame.slug, GROUP_CONCAT(genre.name SEPARATOR ', ') AS genres
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

        // Aggiungiamo il percorso completo dell'immagine a ogni gioco e creiamo lo slug
        const games = gamesResult.map(game => ({
            ...game,
            image: `${req.imagePath}/${game.image}`,
            slug: game.slug
        }))
        // Inviamo i giochi come risposta JSON
        res.json(games)
    })
}

const filterByGenre = (req, res) => {
    const genres = req.query.genre ? req.query.genre.split(",") : []; // Ottieni i generi come array
    const softwareHouse = req.query.software_house; // Ottieni la software house

    console.log("Filtri applicati:", { genres, softwareHouse }); // Log per debug
    
    // Se entrambi i filtri sono "tutti"/"tutte", restituisci tutti i giochi
    if ((genres.length === 1 && genres[0] === "tutti") && (!softwareHouse || softwareHouse === "tutte")) {
        console.log("Richiesta per tutti i giochi, reindirizzando all'endpoint principale");
        return index(req, res);
    }
    
    // Prima di filtrare, facciamo una query per vedere quali software house abbiamo nel database
    if (softwareHouse && softwareHouse !== "tutte") {
        connection.query('SELECT DISTINCT software_house FROM videogame', (err, results) => {
            if (err) {
                console.error("Errore nella query delle software house:", err);
            } else {
                const availableSoftwareHouses = results.map(r => r.software_house);
                console.log("Software house disponibili nel DB:", availableSoftwareHouses);
                console.log("Cerchiamo:", softwareHouse);
                console.log("Esiste esattamente?", availableSoftwareHouses.includes(softwareHouse));
            }
        });
    }

    // Costruiamo una query SQL che funzioni sia per genere che per software house
    let sql = `
    SELECT videogame.*, videogame.slug, GROUP_CONCAT(genre.name SEPARATOR ', ') AS genres
    FROM videogame
    JOIN videogame_genre ON videogame.id = videogame_genre.videogame_id
    JOIN genre ON videogame_genre.genre_id = genre.id
    `;
    
    const params = [];
    const conditions = [];

    // Aggiungi condizione per i generi solo se specificati e non sono "tutti"
    if (genres.length > 0 && !genres.includes("tutti")) {
        const placeholders = genres.map(() => "?").join(", "); // Crea i placeholder per i generi
        conditions.push(`genre.name IN (${placeholders})`);
        params.push(...genres); // Aggiungi i generi ai parametri
        console.log("Filtro per generi specifici:", genres);
    } else {
        console.log("Nessun filtro per genere o filtro 'tutti'");
    }

    // Aggiungi condizione per la software house solo se specificata e non è "tutte"
    if (softwareHouse && softwareHouse !== "tutte") {
        // Proviamo sia con corrispondenza esatta che con LIKE per essere più flessibili
        if (softwareHouse === "Bethesda Game Studios") {
            // Caso speciale per Bethesda Game Studios
            conditions.push(`(videogame.software_house = ? OR videogame.software_house LIKE ?)`);
            params.push(softwareHouse, "Bethesda%"); // Prova sia corrispondenza esatta che parziale
            console.log("Filtro speciale per Bethesda");
        } else if (softwareHouse === "id Software") {
            // Caso speciale per id Software
            conditions.push(`videogame.software_house = ?`);
            params.push(softwareHouse);
            console.log("Filtro per id Software");
        } else {
            conditions.push(`videogame.software_house = ?`);
            params.push(softwareHouse);
        }
        console.log("Filtro software house:", softwareHouse); // Log del valore esatto
    } else {
        console.log("Nessun filtro per software house o filtro 'tutte'");
    }

    // Aggiungi le condizioni alla query se ce ne sono
    if (conditions.length > 0) {
        sql += `WHERE ${conditions.join(' AND ')} `;
    }
    
    sql += 'GROUP BY videogame.id ORDER BY videogame.title ASC';
    
    console.log("Query SQL:", sql); // Log della query per debug
    console.log("Parametri:", params); // Log dei parametri per debug

    connection.query(sql, params, (err, gamesResult) => {
        if (err) {
            console.error("Errore nella query:", err);
            return res.status(500).json({ error: "Database Query Failed:" + err });
        }

        // Aggiungiamo il percorso completo dell'immagine a ogni gioco
        const games = gamesResult.map(game => ({
            ...game,
            image: `${req.imagePath}/${game.image}`
        }));

        res.json(games); // Restituisci i videogiochi filtrati come JSON
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
            v.software_house,
            v.slug
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
            image: `${req.imagePath}/${product.image}`,
            slug: product.slug  // aggiungo lo slug
        }));

        res.json({
            success: true,
            data: products
        });
    });
};

// Funzione per ottenere i dettagli di un singolo videogioco
const show = (req, res) => {
    const { slug } = req.params;

    // Query per ottenere il gioco con i suoi generi filtrando per slug
    const recordSql = `
        SELECT v.*, GROUP_CONCAT(g.name) AS genres
        FROM videogame v
        LEFT JOIN videogame_genre vg ON v.id = vg.videogame_id
        LEFT JOIN genre g ON vg.genre_id = g.id
        WHERE v.slug = ?
        GROUP BY v.id
    `;

    // Eseguiamo la query passando l'ID come parametro
    connection.query(recordSql, [slug], (err, recordResult) => {
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