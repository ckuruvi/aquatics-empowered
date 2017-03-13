angular.module('aquaticsApp').service('FacilityDetailsService', function(EmailService, $http) {

    console.log('FacilityDetailsService is loaded');

    // single facility stored here to display on facilityDetails page.
    var storedFacility;

    this.setTimeSlots = function(formdata) {
        return $http.post("/facilitydetails", formdata).catch(function(err) {
            console.log("Error saving timeslots", err);
        });
    }


    this.getTimeSlots = function(date) {
        console.log('inside getTimeSlots', date);
        return $http.get('/facilitydetails/gettimeslots?date=' + date).then(function(response) {
            console.log('timeslot data: ', response);
            return response.data;
        }).catch(function(err) {
            console.log('error getting timeslots :', err);
        });

    };

    this.deleteTimeSlot = function(dateObj,facilityInfo) {
      console.log('this is the facility info', facilityInfo);
      console.log('this is the date object', dateObj);
        return $http.delete("/facilitydetails/" + dateObj.facility_availability_id).then(function(response){
          console.log(response);
          EmailService.sendCancelEmail(dateObj,facilityInfo);
      }).catch(function(err) {
            console.log("Error deleting  expense from list", err);
        });
    }

    // sends facilityInfo to navCtrl
    this.getFacilityInfo = function(id) {
      return $http.get('/facilitydetails/' + id).then(function(response) {
        storedFacility = response.data;
        return response.data;
      }).catch(function(err) {
        console.log('error getting facility info', err);
      });
    }

   this.getUserDetails=function(id){
     console.log('inside getUserDetails', id);
     return $http.get('/facilitydetails/getuserdetails?userId=' + id).then(function(response) {
         console.log('user details: ', response);
         return response.data;
     }).catch(function(err) {
         console.log('error getting user details :', err);
     });
   }

   this.getFacilityTimeSlots = function(facilityId) {
       console.log('inside getFacilityTimeSlots',facilityId);
       return $http.get('/facilitydetails/facilityslots/'+facilityId).then(function(response) {
           console.log('facility timeslots list: ', response);
           return response.data;
       }).catch(function(err) {
           console.log('error getting facility timeslots :', err);
       });

   };

});
