angular.module("aquaticsApp").controller('NavController', ['AuthService', 'UserProfileService', 'FacilityDetailsService', '$http', '$location', '$rootScope',
function(AuthService, UserProfileService, FacilityDetailsService, $http, $location, $rootScope) {
  console.log('navctrl loaded');
  var ctrl = this;

  //boolean checking if user is logged in or ngRoute
  ctrl.loginStatus = false;

  //stores the logged in username in the navbar as profile link
  ctrl.currentUser;
  // info to display on dom stored here
  ctrl.userToDisplay;
  //facility info here
  ctrl.facilityInfo;

  //checks login status
  ctrl.checkLoginStatus = function() {
    AuthService.checkLoginStatus().then(function(response) {
      console.log('login check returned: ', response);
      if (response == false) {
        ctrl.loginStatus = false;
      } else {
        ctrl.loginStatus = true;
        UserProfileService.getUser().then(function(response) {
          ctrl.currentUser = response;
          ctrl.userToDisplay = response;
          if(ctrl.currentUser.user_type == 'facility') {
            ctrl.getFacilityInfo(ctrl.currentUser.id)
          }
        });
      }
    })
  }

  //checks login status on page load.
  ctrl.checkLoginStatus();

  //logs out user
  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      sessionStorage.setItem( 'isAdmin', 'yay I am here...' );
      ctrl.loginStatus = false;
      ctrl.facilityInfo = {};
      ctrl.userToDisplay = {};
      ctrl.currentUser = {};
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }

  // rechecks login status when user logs in
  $rootScope.$on('userLoggedIn', function() {
    console.log('rootScope message received');
    ctrl.checkLoginStatus();
  });

  ctrl.getFacilityInfo = function(id) {
    console.log('in getFacilityInfo() with id# ', id);
    FacilityDetailsService.getFacilityInfo(id).then(function(facility) {
      console.log('got facility back ', facility.name);
      ctrl.facilityInfo = facility;
    });
  }

}]); // end navbar ctrl
