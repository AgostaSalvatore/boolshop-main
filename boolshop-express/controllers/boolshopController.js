// Qui va la connessione al db
const connection = require('../data/db')

// TODO: Rinominare file da boolshopController.js -> videogameController.js
// TODO: Rinominare in listAll(Videogames)
const index = (req, res) => {

    const nameLike = 
    connection.query('SELECT * FROM videogame', (err, result) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });
        res.json(result);
    })
}

// TODO: Rinominare in get(Videogame)ById
const show = (req, res) => {
    const { id } = req.params
    console.log("dettaglio gioco");
    const recordSql = "SELECT * FROM videogame WHERE id = ?"
    connection.query(recordSql, [id], (err, recordResult) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });

        if (recordResult.length === 0) return res.status(404).json({ error: "Record not found" });

        const record = recordResult[0]
        res.json(record)
    })
}

module.exports = {
    index,
    show
}