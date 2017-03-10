angular.module('aquaticsApp').service('UserProfileService', function($http, $location) {
  console.log('UserProfileService is loaded');

// gets user data  from /userProfile and returns response
  this.getUser = function () {
    return $http.get('/userProfile').then(function (response) {
      return response.data;
    });
  }
  // sends user information to update to the '/userProfile route', returns updated info to the userProfileCtrl
  this.updateUser = function (user) {
    return $http.put('/userProfile/' + user.id, user).then(function (response) {
      return response.data;
    })
  }


}); // end userProfileService
