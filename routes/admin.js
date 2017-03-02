var router = require('express').Router();
var admin = require('../models/admin');

router.get('/',function(req,res){
  console.log('Insode router.get');
  admin.getFacilitiesList(req.name, req.city, req.approved).then(function(facilitiesList){
    res.send(facilitiesList);
  }).catch(function(err){
    console.log('Error fetching facilitiesList');
    res.sendStatus(500);
  });
});

module.exports = router;
