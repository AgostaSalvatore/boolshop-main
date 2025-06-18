// Middleware che gestisce le richieste a percorsi non esistenti
function notFound(req, res, next) {
    // Imposta lo stato della risposta a 404 (Non trovato)
    res.status(404)
    // Invia una risposta JSON con un messaggio di errore
    res.json({
        error: "Not Found",
        message: "Page not found"
    })
};

module.exports = notFound