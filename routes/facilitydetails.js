var router = require('express').Router();
var FacilityDetails = require('../models/facility.details.model.js');



router.get('/gettimeslots',function(req,res){
  console.log("date ::",req.query.date);
  FacilityDetails.getFacilityId(1)
      .then(function(facilityId) {
        FacilityDetails.getTimeSlots(new Date(req.query.date),facilityId).then(function(timeSlotlist){
          res.send(timeSlotlist);
          });
  }).catch(function(err){
    console.log('Error fetching  time slot list');
    res.sendStatus(500);
  });
});

router.post('/', function(req, res) {
    console.log('formdata',req.body);
    FacilityDetails.getFacilityId(1)
        .then(function(facilityId) {
            setTimeSlots(req.body,facilityId).then(function(response){
              res.sendStatus(201);
            });
        }).catch(function(err) {
            console.log('Error creating timeslots');
            res.sendStatus(500);
        });
});


function setTimeSlots(formdata,facilityId) {
    return new Promise(function(resolve, reject) {
        var startTime=parseInt(formdata.startTime);
        var endTime=parseInt(formdata.endTime);
        var count=endTime - startTime;
          console.log("count::",count,facilityId);
        for(var i=0;i<count;i++){
            var date=new Date(formdata.date);
          FacilityDetails.setTimeSlots(facilityId,date,startTime+':00',(startTime+1)+':00');
               startTime+=1;
               console.log("starttime & endtime",startTime,endTime);
               if (startTime == endTime) {
                 console.log("inside resolve");
                     resolve();
                 }
        }

            });
} // end of setTimeSlots function


router.delete('/:id', function(req, res) {
    FacilityDetails.deleteTimeSlot(req.params.id).then(function() {
        res.sendStatus(204);
    }).catch(function(err) {
        console.log('Error deleting timeslot');
        res.sendStatus(500);
    });
});


module.exports = router;
