const express = require("express"); //import express
const cors = require('cors') //cors
const boolRouter = require('./router/boolshopRouter'); // import router
const notFound = require('./middlewares/notFound'); // import notFound
const errorHandler = require('./middlewares/errorHandler'); // import errorHandler
const setImagePath = require('./middlewares/imagePath'); // import setImagePath

const app = express(); //uso express

const port = process.env.SERVER_PORT || 3000; //porta

app.use(express.static("public")); //static files
app.use(express.json()); //json
app.use(setImagePath); //set image path

// Configurazione CORS personalizzata per consentire le richieste dal frontend
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Origine del frontend
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH"); // Metodi consentiti
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Header consentiti
    res.header("Access-Control-Allow-Credentials", "true"); // Consenti credenziali
    next(); // Passa al prossimo middleware
});

//base route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Utilizziamo il router per gestire tutte le richieste al percorso /api/boolShop
app.use('/api/boolShop', boolRouter);

// Middleware per gestire le richieste a percorsi non esistenti
app.use(notFound);
// Middleware per gestire gli errori generali dell'applicazione
app.use(errorHandler);

// Avviamo il server sulla porta specificata
app.listen(port, () => {
    console.log("Server started on port " + port);
});
