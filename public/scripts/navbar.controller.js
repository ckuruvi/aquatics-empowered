angular.module("aquaticsApp").controller('NavController', ['AuthService', '$http', '$location', '$rootScope', function(AuthService, $http, $location, $rootScope){
console.log('navctrl loaded');
  var ctrl = this;

  //boolean checking if user is logged in or ngRoute
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
