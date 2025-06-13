const express = require("express"); //import express

const app = express(); //uso express

const port = 3000; //porta

app.use(express.static("public")); //static files
app.use(express.json()); //json

//base route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//listen
app.listen(port, () => {
    console.log("Server started on port " + port);
});
