angular.module('aquaticsApp').service('FacilityDetailsService', function(EmailService, $http) {

    // single facility stored here to display on facilityDetails page.
    var storedFacility;

    this.setTimeSlots = function(formdata) {
        return $http.post("/facilitydetails", formdata).catch(function(err) {
            // console.log("Error saving timeslots", err);
        });
    }


    this.getTimeSlots = function(date) {
        return $http.get('/facilitydetails/gettimeslots?date=' + date).then(function(response) {
            // console.log('timeslot data: ', response);
            return response.data;
        }).catch(function(err) {
            // console.log('error getting timeslots :', err);
        });

    };

    this.deleteTimeSlot = function(dateObj,facilityInfo, userContactData) {
        return $http.delete("/facilitydetails/" + dateObj.facility_availability_id).then(function(response){
          // console.log(response);
          if(dateObj.approved==true){
          EmailService.sendCancelEmail(dateObj,facilityInfo,userContactData);
        }
      }).catch(function(err) {
            // console.log("Error deleting  expense from list", err);
        });
    }

    // sends facilityInfo to navCtrl
    this.getFacilityInfo = function(id) {
      return $http.get('/facilitydetails/' + id).then(function(response) {
        storedFacility = response.data;
        return response.data;
      }).catch(function(err) {
        // console.log('error getting facility info', err);
      });
    }

   this.getUserDetails=function(id){
     return $http.get('/facilitydetails/getuserdetails?userId=' + id).then(function(response) {
        //  console.log('user details: ', response);
         return response.data;
     }).catch(function(err) {
        //  console.log('error getting user details :', err);
     });
   }

   this.getFacilityTimeSlots = function(facilityId) {
       return $http.get('/facilitydetails/facilityslots/'+facilityId).then(function(response) {
          //  console.log('facility timeslots list: ', response);
           return response.data;
       }).catch(function(err) {
          //  console.log('error getting facility timeslots :', err);
       });

   };

});
