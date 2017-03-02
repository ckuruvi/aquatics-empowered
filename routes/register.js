var router = require('express').Router();
var User = require('../models/register.model');

router.post('/user', function(req, res){
  User.findByUsername(req.body.email).then(function(user){
    if (user) {
      return res.status(400).send('A user with that email already exists');
    }

    return User.createUser(req.body.email, req.body.password, req.body.userType, req.body.firstName, req.body.lastName, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zipcode).then(function(user){
      console.log('Created new user ', user);
      req.login(user, function(err){
        if (err) {
          console.log('Error logging in newly registered user', err);
          return res.sendStatus(500);
        }
      });

      res.sendStatus(201);
    });
  }).catch(function(err){
    console.log('Error creating user');
    res.sendStatus(500);
  });
});

var usrToLogin;
router.post('/facility', function(req, res){
  User.findByUsername(req.body.name).then(function(user){
    if (user) {
      return res.status(400).send('A facility by that name already exists');
    } else if (req.body.accessible == false) {
      return res.status(400).send('Facility not disability accessible');
    }
    return User.createUser(req.body.email, req.body.password, req.body.userType, req.body.firstName, req.body.lastName, req.body.phone).then(function(user){
      console.log('Created new user');
      usrToLogin=user;
      console.log("usrToLogin :: ",usrToLogin);
      return User.createFacility(user.id, req.body.name, req.body.address, req.body.city, req.body.state, req.body.zipcode, req.body.description, req.body.level,
        req.body.cost, req.body.image_url).then(function(facility){
          console.log('Created new facility ', facility);
          req.login(usrToLogin, function(err){
            if (err) {
              console.log('Error logging in newly registered user', err);
              return res.sendStatus(500);
            }
          });
          res.sendStatus(201);
        })

    }).catch(function(err){
        console.log('Error creating user');
        res.sendStatus(500);
      });
  });
});

module.exports = router;
