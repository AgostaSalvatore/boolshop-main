// Qui va la connessione al db
const connection = require('../data/db')

const index = (req, res) => {
    connection.query('SELECT * FROM videogame', (err, gamesResult) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });

        const games = gamesResult.map(game => ({
            ...game,
            image: `${req.imagePath}/${game.image}`
        }))
        res.json(games)
    })
}

//ordina per prezzo dal più alto al più basso
const orderByPriceDesc = (req, res) => {
    connection.query('SELECT * FROM videogame ORDER BY price DESC', (err, result) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });
        const games = result.map(game => ({
            ...game,
            image: `${req.imagePath}/${game.image}`
        }))
        res.json(games);
    })
}

//  ordina per prezzo dal più basso al più alto
const orderByPriceAsc = (req, res) => {
    connection.query('SELECT * FROM videogame ORDER BY price ASC', (err, result) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });
        const games = result.map(game => ({
            ...game,
            image: `${req.imagePath}/${game.image}`
        }))
        res.json(games);
    })
}

const show = (req, res) => {
    const { id } = req.params
    console.log("dettaglio gioco");
    // Query per ottenere il gioco con i suoi generi
    const recordSql = `
        SELECT v.*, GROUP_CONCAT(g.name) AS genres
        FROM videogame v
        LEFT JOIN videogame_genre vg ON v.id = vg.videogame_id
        LEFT JOIN genre g ON vg.genre_id = g.id
        WHERE v.id = ?
        GROUP BY v.id
    `
    connection.query(recordSql, [id], (err, recordResult) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });

        if (recordResult.length === 0) return res.status(404).json({ error: "Record not found" });

        const record = recordResult[0]

        // Trasformare la stringa di generi in un array
        if (record.genres) {
            record.genres = record.genres.split(',');
        } else {
            record.genres = [];
        }

        record.image = `${req.imagePath}/${record.image}`
        res.json(record)
    })
}

module.exports = {
    index,
    show,
    orderByPriceDesc,
    orderByPriceAsc
}