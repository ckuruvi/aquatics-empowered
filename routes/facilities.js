var router = require('express').Router();
var pool = require('../db/connection');




router.get("/", function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT * FROM facilities;", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got facilities from DB", result.rows);
          res.send(result.rows)

        }
      });
    }
  });
});


module.exports = router;
