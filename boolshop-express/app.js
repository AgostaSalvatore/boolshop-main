const express = require("express"); //import express
const boolRouter = require('./router/boolshopRouter'); // import router
const notFound = require('./middlewares/notFound'); // import notFound
const errorHandler = require('./middlewares/errorHandler'); // import errorHandler


const app = express(); //uso express

const port = process.env.SERVER_PORT || 3000; //porta

const cors = require('cors') //cors

app.use(express.static("public")); //static files
app.use(express.json()); //json
app.use(cors({ origin: process.env.FA_APP }));

//base route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/api/boolShop', boolRouter);

app.use(notFound);
app.use(errorHandler);

//listen
app.listen(port, () => {
    console.log("Server started on port " + port);
});
