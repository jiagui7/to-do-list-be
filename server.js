var express = require("express");
var app = express();
var cors = require("cors");
var db = require("./database");

var HTTP_PORT = 8080;

app.use(cors());

app.get("/task", (req, res, next) => {
  db.all("SELECT * FROM task", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}...`);
});
