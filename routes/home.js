var router = require('express').Router();
var Home = require('../models/home.model');

router.get('/:zipcode',function(req,res){
  Home.getFacilitiesList(req.params.zipcode).then(function(facilitieslist){
    res.send(facilitieslist);
  }).catch(function(err){
    console.log('Error fetching  facilitieslist');
    res.sendStatus(500);
  });
});


module.exports = router;
