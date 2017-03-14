var router = require('express').Router();
var User = require('../models/register.model');

router.get('/', function(req, res) {
  console.log('in userProfile route');
  // TODO get this to check if user is logged in and route to home if not
  if (req.user.id == undefined) {
    console.log('you are not authorized to access this page.');
    $location.path('/');
    return;
  } else {

  console.log('user id is ', req.user.id);
  User.findById(req.user.id).then(function(user) {
    // console.log('user returned from db is ', user);
    res.status(200).send(user);
  }).catch(function(err) {
    console.log('error retreiving user from db', err);
    res.sendStatus(500);
  });
}
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


router.get('/gettimeslots', function(req, res) {
  console.log('user id ', req.user.id);
  User.getTimeSlots(req.user.id).then(function(timeslots) {
    res.status(200).send(timeslots);
  }).catch(function(err) {
    console.log('error retreiving user from db', err);
    res.sendStatus(500);
  })
}); // end GET

router.delete('/:id', function(req, res) {
    User.deleteBookedTimeSlot(req.params.id).then(function() {
      res.sendStatus(204);
  }).catch(function(err) {
      console.log('Error deleting booked timeslot');
      res.sendStatus(500);
  });
});

module.exports = router;
