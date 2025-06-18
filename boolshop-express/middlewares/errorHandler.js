// Middleware che gestisce gli errori generali dell'applicazione
function errorHandler(err, req, res, next) {
    // Imposta lo stato della risposta a 500 (Errore interno del server)
    res.status(500)
    // Invia una risposta JSON con un messaggio di errore generico
    res.json({
        error: "Internal Server Error",
        message: "Something went wrong"
    })
};

module.exports = errorHandler