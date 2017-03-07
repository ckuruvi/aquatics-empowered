angular.module('aquaticsApp').service('FacilityDetailsService',function($http){

console.log('FacilityDetailsService is loaded');

this.setTimeSlots = function(formdata) {
        return $http.post("/facilitydetails", formdata).catch(function(err) {
            console.log("Error saving timeslots", err);
        });
    }


    this.getTimeSlots = function (date){
      console.log('inside getTimeSlots',date);
      return $http.get('/facilitydetails/gettimeslots?date='+date).then(function(response) {
       console.log('timeslot data: ', response);
       return response.data;
     }).catch(function(err) {
       console.log('error getting timeslots :', err);
     });

    };

    this.deleteTimeSlot = function(id) {
        return $http.delete("/facilitydetails/" + id).catch(function(err) {
            console.log("Error deleting  expense from list", err);
        });
    } 


});
