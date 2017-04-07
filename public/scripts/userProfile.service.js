angular.module('aquaticsApp').service('UserProfileService', function($http, $location) {

  // gets user data  from /userProfile and returns response
  this.getUser = function () {
    return $http.get('/userProfile').then(function (response) {
      this.userContactData = response.data;
      //stores user'facility' contact data in sessionStorage as JSON, getItem in controller.
      sessionStorage.setItem( 'ucd', JSON.stringify( response.data ) );
      return response.data;
    });
  }
  // sends user information to update to the '/userProfile route', returns updated info to the userProfileCtrl
  this.updateUser = function (info) {
    if(info.user_type){ // checks if info is contact, if not its a facility and does the else statement
      return $http.put('/userProfile/' + info.id, info).then(function (response) {
        // console.log('contact updated is ', response.data);
        this.userContactData = response.data;
        return response.data;
      });
    } else { // if info is a facility, sends to facilitydetails route
      return $http.put('/facilitydetails/' + info.id, info).then(function (response) {
        // console.log('facility updated is', response.data);
        return response.data;
      });
    }
  }

  this.getBookedTimeSlots=function () {
    return $http.get('/userProfile/gettimeslots').then(function (response) {
      return response.data;
    });
  }

  this.deleteBookedTimeSlot = function(id) {
    // console.log("id###",id);
    return $http.delete("/userProfile/" + id).catch(function(err) {
      // console.log("Error deleting  booked timeslots", err);
    });
  }

}); // end userProfileService
