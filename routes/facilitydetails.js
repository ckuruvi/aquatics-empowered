var router = require('express').Router();
var FacilityDetails = require('../models/facility.details.model.js');



router.get('/gettimeslots', function(req, res) {
    console.log("date ::", req.query.date);
    FacilityDetails.getFacilityId(req.user.id)
        .then(function(facilityId) {
            FacilityDetails.getTimeSlots(new Date(req.query.date), facilityId).then(function(timeSlotlist) {
                res.send(timeSlotlist);
            });
        }).catch(function(err) {
            console.log('Error fetching  time slot list');
            res.sendStatus(500);
        });
});



router.get('/getuserdetails', function(req, res) {
    console.log("date ::", req.query.userId);
    FacilityDetails.getUserDetails(req.query.userId)  //user id hard coded for now. need to pull from the session
        .then(function(userDetails) {
                res.send(userDetails);
        }).catch(function(err) {
            console.log('Error fetching  user details');
            res.sendStatus(500);
        });
});

router.post('/', function(req, res) {
    console.log('formdata', req.body);
    FacilityDetails.getFacilityId(req.user.id)
        .then(function(facilityId) {
            setTimeSlots(req.body, facilityId).then(function(response) {
                res.sendStatus(201);
            });
        }).catch(function(err) {
            console.log('Error creating timeslots');
            res.sendStatus(500);
        });
});

  // setting availability
function setTimeSlots(formdata, facilityId) {
    return new Promise(function(resolve, reject) {
        var startTime = parseInt(formdata.startTime);
        var endTime = parseInt(formdata.endTime);
        var count = endTime - startTime;
        console.log("count::", count, facilityId);
        for (var i = 0; i < count; i++) {
            var date = new Date(formdata.date);
            FacilityDetails.setTimeSlots(facilityId, date, startTime + ':00', (startTime + 1) + ':00');
            startTime += 1;
            console.log("starttime & endtime", startTime, endTime);
            if (startTime == endTime) {
                console.log("inside resolve");
                resolve();
            }
        }

    });
} // end of setTimeSlots function

//   //delete time slot
// router.delete('/:id', function(req, res) {
//     FacilityDetails.deleteTimeSlot(req.params.id).then(function() {
//         res.sendStatus(204);
//     }).catch(function(err) {
//         console.log('Error deleting timeslot');
//         res.sendStatus(500);
//     });
// });


//delete time slot
router.delete('/:id', function(req, res) {

  FacilityDetails.deleteTimeSlotReservation(req.params.id).then(function() {

    FacilityDetails.deleteTimeSlotAvailibility(req.params.id).then(function() {
      res.sendStatus(204);
    });
  }).catch(function(err) {
      console.log('Error deleting timeslot');
      res.sendStatus(500);
  });
});



//GETting a facility
router.get('/:id', function(req, res) {
  console.log('attempting to get facility');
  FacilityDetails.getFacilityInfo(req.params.id).then(function(facility) {
    console.log('returned from model with facility: ', facility);
    res.status(200).send(facility)
  }).catch(function(err) {
    console.log('error getting facility', err);
  })
}); // end GET

  // updates facility info
  router.put('/:id', function(req, res) {
    console.log('attempting to update facility ', req.body.name);
    FacilityDetails.updateFacility(req.body).then(function(facility) {
      res.status(204).send(facility);
    }).catch(function(err) {
      console.log('err updating facility', err);
      res.sendStatus(500);
    });
  }); // end PUT


module.exports = router;
