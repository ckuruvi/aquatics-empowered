var router = require('express').Router();
var User = require('../models/register.model');

router.get('/', function(req, res) {
  console.log('user id is ', req.user.id);
  User.findById(req.user.id).then(function(user) {
    // console.log('user returned from db is ', user);
    res.status(200).send(user);
  }).catch(function(err) {
    console.log('error retreiving user from db', err);
    res.sendStatus(500);
  })
}); // end GET

router.put('/:id', function(req, res) {
  console.log('in update userProfile route');
    User.updateUser(req.body).then(function(user) {
      res.status(204).send(user);
    }).catch(function(err) {
      console.log('error updating user', err);
      res.sendStatus(500);

  });



});

module.exports = router;
