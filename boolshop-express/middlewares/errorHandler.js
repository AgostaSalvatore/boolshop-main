// Middleware che gestisce gli errori generali dell'applicazione
function errorHandler(err, req, res, next) {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: err.name || "Internal Server Error",
        message: err.message,
        stack: err.stack
    });
};

module.exports = errorHandler