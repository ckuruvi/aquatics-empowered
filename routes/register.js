var router = require('express').Router();
var User = require('../models/register.model');

router.post('/user', function(req, res){
  User.findByUsername(req.body.email).then(function(user){
    if (user) {
      return res.status(400).send('A user with that email already exists');
    }
    console.log('attempting to register :::', req.body);

    return User.createUser(req.body.email, req.body.password, req.body.userType, req.body.firstName, req.body.lastName, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zipcode).then(function(user){
      console.log('Created new user ', user);
      if (user.user_type == 'user') {
      req.login(user, function(err){
        console.log('logging in as ', user);
        if (err) {
          console.log('Error logging in newly registered user', err);
          return res.sendStatus(500);
        }
      });
    }
      res.sendStatus(201);
    });
  }).catch(function(err){
    console.log('Error creating user');
    res.sendStatus(500);
  });
});
  // stores user to be logged in after facility entry is created
var usrToLogin;

router.post('/facility', function(req, res){
  //checks if facility already exists, and if facility is disability accessible. If either check fails, they are kicked out.
  User.findByUsername(req.body.name).then(function(user){
    if (user) {
      return res.status(400).send('A facility by that name already exists');
    } else if (req.body.accessible == false) {
      return res.status(400).send('Facility not disability accessible');
    }
    //creates the contact persons user account, attached to facility
    return User.createUser(req.body.email, req.body.password, req.body.userType, req.body.firstName, req.body.lastName, req.body.phone).then(function(user){
      console.log('Created new user');
      //sets the user to usrToLogin to be logged in after facility creation.
      usrToLogin=user;

      console.log("usrToLogin :: ",usrToLogin);
      return User.createFacility(user.id, req.body.name, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.description, req.body.accessible, req.body.level,
        req.body.cost, req.body.image_url).then(function(facility){
          console.log('Created new facility ', facility);
          //logs in contact user after creation of user and facility in DB
          req.login(usrToLogin, function(err){
            console.log('starting login process');
            if (err) {
              console.log('Error logging in newly registered user', err);
              return res.sendStatus(500);
            }
          });
          console.log('successfully logged in as ', usrToLogin)
          res.sendStatus(201);
        })
    }).catch(function(err){
        console.log('Error creating user');
        res.sendStatus(500);
      });
  });
});

module.exports = router;
