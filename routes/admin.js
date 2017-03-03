var router = require('express').Router();
var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');

var pool = new pg.Pool({
  database: 'aquatics'
});



router.get('/', function(req, res) {

  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB, err');
        res.status(500).send(err);
      } else {
        client.query('SELECT name, city, approved FROM facilities;', function(err, results) {
          if (err) {
            console.log('Error getting facilities', err);
            res.status(500).send(err);
          } else {
            res.send(results.rows);
          }
        });
      }
    } finally {
      done();
    }
  });
}); //end router.get

module.exports = router;
