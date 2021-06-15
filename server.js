var express = require("express");
var cors = require("cors");
var db = require("./database");
var bodyParser = require("body-parser");

var HTTP_PORT = 8080;
var EMPTY_DESCRIPTION_ERROR = "Description cannot be empty";

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
  let description = req.body.data.description;
  if (description.length <= 0) {
    res.status(400).json({ error: EMPTY_DESCRIPTION_ERROR });
  }
  db.run(
    "INSERT INTO task (description, completed) VALUES (?,?)",
    [description, false],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(true);
    }
  );
});

app.patch("/task/:id", (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  db.run(
    `UPDATE task SET completed = ? WHERE id = ?`,
    [body.data.completed, id],
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

module.exports = app;