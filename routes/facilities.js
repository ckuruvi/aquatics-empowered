var router = require('express').Router();
var pool = require('../db/connection');
var FacilityDetails = require('../models/facility.details.model')


router.get("/:id", function(req, res) {
  FacilityDetails.getFacility(req.params.id).then(function(facility) {
  console.log('Getting facility info from db', facility);
  res.status(200).send(facility);
}).catch(function(err) {
  console.log('Error logging facility', err);
  });
});


router.get("/availability", function(req, res) {

  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {

      client.query("SELECT * FROM facility_availability;", function(err, result) {
        done();
        if (err) {
          console.log("Error querying DB", err);
          res.sendStatus(500);
        } else {
          console.log("Got facility availability from DB", result.rows);
          res.send(result.rows)

        }
      });
    }
  });
});

router.get('/search', function (req, res, next) {
// console.log("this is the result", req.query.q);
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }
    //SQL querry to select matching date a setting date in SQL date type using new Date
    client.query('SELECT * FROM facility_availability ' +
    'WHERE date = $1;', [new Date(req.query.q)], function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });

  });
});

router.post('/', function(req, res){
  console.log('this is the req.body', req.body);
  pool.connect(function(err, client, done){
    if (err){
      console.log('Error connecting to DB', err);
      res.sendStatus(500);
      done();
    } else {

      client.query('INSERT INTO facility_reservation (reservation_id, facility_availability_id, approved) VALUES ($1, $2, $3) RETURNING *;',
      [req.user.id, req.body.data.id, true],
      function(err, result){
        //waiting for database to get information back
        done();
        if(err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        }else{
          console.log('Posted availability to reservation table', result.rows);
          res.send(result.rows);
        }

      })

    }
  });
});


module.exports = router;
