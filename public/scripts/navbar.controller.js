angular.module("aquaticsApp").controller('NavController', ['AuthService', 'UserProfileService', '$http', '$location', '$rootScope',
 function(AuthService, UserProfileService, $http, $location, $rootScope) {
console.log('navctrl loaded');
  var ctrl = this;

  //boolean checking if user is logged in or ngRoute
  ctrl.loginStatus = false;

  //stores the logged in username in the navbar as profile link
  ctrl.userName;

//checks login status
  ctrl.checkLoginStatus = function() {
    AuthService.checkLoginStatus().then(function(response) {
      console.log('login check returned: ', response);
      if (response == true) {
        ctrl.loginStatus = true;
        UserProfileService.getUser().then(function(response) {
          ctrl.userName = response.first_name;
        });
      } else {
        ctrl.loginStatus = false;
      }
    });
}

//checks login status on page load.
ctrl.checkLoginStatus();

//logs out user
ctrl.logout = function() {
  $http.delete('/login').then(function(){
    console.log('Successfully logged out!');
    sessionStorage.setItem( 'isAdmin', 'yay I am here...' );
    ctrl.loginStatus = false;
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

}]); // end navbar ctrl
