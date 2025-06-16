// Qui va la connessione al db
const connection = require('../data/db')

const index = (req, res) => {
    connection.query('SELECT * FROM videogame', (err, result) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });
        res.json(result);
    })
}

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

//ordina per prezzo dal più alto al più basso
const orderByPriceDesc = (req, res) => {
    connection.query('SELECT * FROM videogame ORDER BY price DESC', (err, result) => {
        if (err) return res.status(500).json({ error: "Database Query Failed:" + err });
        res.json(result);
    })
}

module.exports = {
    index,
    show,
    orderByPriceDesc
}