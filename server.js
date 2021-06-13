var express = require("express");
var cors = require("cors");
var db = require("./database");
var bodyParser = require("body-parser");

var HTTP_PORT = 8080;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/task", (req, res, next) => {
  db.all("SELECT * FROM task", [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

app.post("/task", (req, res, next) => {
  let body = req.body;
  db.run(
    "INSERT INTO task (description, completed) VALUES (?,?)",
    [body.data.description, false],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(true);
    }
  );
});

app.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}...`);
});
