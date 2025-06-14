// Qui va la connessione al db

const connection = require('../data/db')

const create = (req, res) => {

    /* DA CALCOLARE:
    - totale = quantity * unit_price
    - order_date = NOW() - fattibile tramite SQL 
    - shipping_date = NOW() + 3 days 
    - tracking_number = Random string "TRK$number$country" - TRK12345678IT


    // Request
      {
            "videogame_id": 1,
            "quantity": 1,
            "payment_method": "PayPal",
            "shipment": {
                "address": "Via Roma 12, Milano",
                "recipient_name": "Luca Bianchi",
                "phone": "+39 328 4567890",
                "carrier": "SDA",
                "tracking_number": "TRK123456789IT",
                "shipping_cost": 7.50
            }
        }

    // Response 
    {
      order_id: 1
    }    
     */
    const payload = req.body;

    // 1- Get Videogame by ID to get the price
    const videogamePrice = 100 // TODO - SQL query SELECT price FROM videogame WHERE id=?

    // 2- Calcolo variabili
    const total = (payload.quantity * videogamePrice) + payload.shipping_cost
    const tracking_number="TRK12345678IT" //TODO: Use random string

    // 3- Inserimento su DB dell'ordine 
    const insertSql = ``;
    //connection.query(insertSql, [id], (err, recordResult) => { // gestione risultato con error handling, ritorno l'id dell'ordine })
}   

const getById = (req, res) => {

    // estraggo i parametri dal path
    const { id } = req.params

    // loggo un messaggio
    console.log("orderController.getById(" + id + ")");

    // costruisco la query SQL per ottenere l'ordine con l'Id specificato 
    const recordSql = `SELECT * 
                       FROM order
                       LEFT JOIN shipment ON shipment.order_id = order.id
                       WHERE order.id = ?
                       LIMIT 1;`;

    // eseguo la query sul DB 
    connection.query(recordSql, [id], (err, recordResult) => {

        // in caso di errore ritorno errore 500 - Internal Server Error 
        if (err) {
            console.log("Query fallita" + err);
            return res.status(500).json({ error: "Database Query Failed:" + err });
        }

        // se non trovo nessun ordine con l'id specificato ritorno 404 - Not Found
        if (recordResult.length === 0) {
            console.log("Ordine " + id + " non trovato");
            return res.status(404).json({ error: "Order not found" });
        }

        // se trovo l'ordine lo restituisco in formato json
        res.json(recordResult[0])
    })
}


module.exports = {
    create,
    getById
}