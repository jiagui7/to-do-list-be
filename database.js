var sqlite3 = require("sqlite3").verbose();

const PATH = "db.sqlite";

let db = new sqlite3.Database(PATH, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS task (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            description text,
            completed INTEGER)`
    );
  }
});

module.exports = db;
