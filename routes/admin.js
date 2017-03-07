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
        client.query('SELECT id, name, city, approved FROM facilities;', function(err, results) {
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

router.put('/:id', function (req,res){
pool.connect(function (err, client, done){
  if(err){
    console.log('Error connecting to DB', err);
    res.sendStatus(500);
    done();
  }else{
    client.query('UPDATE facilities SET approved=$2 WHERE id = $1 RETURNING *',
    [req.params.id,req.body.approved],
    function(err, result){
      done();
      if(err){
        console.log('Error updating facility status', err);
        res.sendStatus(500);
      }else{
        res.send(result.rows);
      }
    });

  }
});

})

router.delete('/:id', function(req, res){
pool.connect(function(err, client, done){
  if (err) {
    console.log('Error connecting to DB', err);
    res.sendStatus(500);
    done();
  } else {
    client.query('DELETE FROM facilities WHERE id = $1',
    [req.params.id],
    function(err, result){
      done();
      if (err) {
        console.log('Error deleting facility', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    });
  }
});
});

module.exports = router;
