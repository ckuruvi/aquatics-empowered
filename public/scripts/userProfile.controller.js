angular.module('aquaticsApp').controller('userProfileController', ['UserProfileService', 'AuthService', '$http', '$location', function(UserProfileService, AuthService, $http, $location) {
  console.log('userProfileController is loaded');

  var ctrl = this;

  // user profile data will be stored here
  ctrl.userToDisplay;

  // used to toggle between edit state
  ctrl.editToggle = false;

  //stores boolean of login status
  ctrl.loginStatus = false;

  //checks login status
    ctrl.checkLoginStatus = function() {
      AuthService.checkLoginStatus().then(function(response) {
        console.log('login check returned: ', response);
        if (response == true) {
          ctrl.loginStatus = true;
        } else {
          ctrl.loginStatus = false;
        }
        //calls getUser on page load
        ctrl.getUser();
      });
  }

  //checks loginStatus on page load.
  ctrl.checkLoginStatus();

  // gets user profile data
  ctrl.getUser = function () {
    if (ctrl.loginStatus == false) {
      $location.path('/login');
    } else{
      console.log('ctrl.getUser() called');
      UserProfileService.getUser().then(function(response) {
        ctrl.userToDisplay = response;
        // console.log('userToDisplay is ', ctrl.userToDisplay);
      });
    }
  } // end getUser()

  //changes ctrl.editToggle to true or false to allow editing.
  ctrl.edit = function () {
    if (ctrl.editToggle == false) {
      ctrl.editToggle = true;
    } else {
      ctrl.editToggle = false
    }
  }

  //updates edited user to the db
  ctrl.updateUser = function (user) {
    UserProfileService.updateUser(user).then(function (response) {
      ctrl.userToDisplay = response;
      console.log('after updating, userToDisplay is ', ctrl.userToDisplay);
    })
  }

}]); //end userProfileController
