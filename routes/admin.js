var router = require('express').Router();
var admin = require('../models/admin');

// router.get('/:zipcode',function(req,res){
//   Home.getFacilitiesList(req.params.zipcode).then(function(facilitieslist){
//     res.send(facilitieslist);
//   }).catch(function(err){
//     console.log('Error fetching  facilitieslist');
//     res.sendStatus(500);
//   });
// });

module.exports = router;