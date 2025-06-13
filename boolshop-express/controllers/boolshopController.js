// Qui va la connessione al db
// const connection = require('../data/db')

const index = (req, res) => {
    console.log("elenco giochi")
}

const show = (req, res) => {
    console.log("dettaglio gioco");
}

module.export = {
    index,
    show
}