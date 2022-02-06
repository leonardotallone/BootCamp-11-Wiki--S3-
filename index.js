const express = require("express");
const app = express();
const volleyball = require("volleyball");
const db = require("./db");
const models = require("./models");
const routes = require("./routes");

// logging middleware
app.use(volleyball);
//
app.use(express.static("build"));

// parsing middleware
app.use(express.json());

// Middleware de Rutas
app.use("/api", routes);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

// error middleware -> https://expressjs.com/es/guide/error-handling.html
app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

// app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000"));


// OJO con poner TRUE que reinicia los datos de la DB
db.sync({ force: false })
  .then(function () {
    // Recién ahora estamos seguros que la conexión fue exitosa
    app.listen(3000, () =>
      console.log("Servidor escuchando en el puerto 3000")
    );
  })
  .catch(console.error);
