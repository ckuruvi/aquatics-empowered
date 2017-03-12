angular.module('aquaticsApp').service('UserProfileService', function($http, $location) {
  console.log('UserProfileService is loaded');

// gets user data  from /userProfile and returns response
  this.getUser = function () {
    return $http.get('/userProfile').then(function (response) {
      return response.data;
    });
  }
  // sends user information to update to the '/userProfile route', returns updated info to the userProfileCtrl
  this.updateUser = function (info) {
    if(info.user_type){ // checks if info is contact, if not its a facility and does the else statement
      return $http.put('/userProfile/' + info.id, info).then(function (response) {
        console.log('contact updated is ', response.data.first_name);
        return response.data;
      });
    } else { // if info is a facility, sends to facilitydetails route
      return $http.put('/facilitydetails/' + info.id, info).then(function (response) {
        console.log('facility updated is', response.name);
        return response.data;
      });
    }
  }


}); // end userProfileService
