var router = require('express').Router();
var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');

var pool = new pg.Pool({
  database: 'aquatics'
});

// router.get('/', function(req, res){
//   res.sendFile(path.join(__dirname, '../public/views/index.html'));
// });

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




// var router = require('express').Router();
// var admin = require('../models/admin');
//
// router.get('/',function(req,res){
//   console.log('Insode router.get');
//   admin.getFacilitiesList(req.name, req.city, req.approved).then(function(facilitiesList){
//     res.send(facilitiesList);
//   }).catch(function(err){
//     console.log('Error fetching facilitiesList');
//     res.sendStatus(500);
//   });
// });
//
// module.exports = router;
