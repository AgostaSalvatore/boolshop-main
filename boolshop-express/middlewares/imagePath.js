// Middleware che imposta il percorso base per le immagini dei videogiochi
const setImagePath = (req, res, next) => {
    // Crea l'URL completo per le immagini (es. http://localhost:3000/imgs/videogame_imgs)
    req.imagePath = `${req.protocol}://${req.get('host')}/imgs/videogame_imgs`;
    // Passa al prossimo middleware o alla funzione di gestione della richiesta
    next();
}

module.exports = setImagePath