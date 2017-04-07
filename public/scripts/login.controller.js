angular.module('aquaticsApp')
.controller('LoginController', LoginController);

function LoginController($http, $location, $rootScope, AuthService) {
  var ctrl = this;

  //stores boolean of login status
  ctrl.loginStatus = false;

  //stores current user
  ctrl.currentUser;

  //checks login status
  ctrl.checkLoginStatus = function() {
    AuthService.checkLoginStatus().then(function(response) {
      // console.log('login check returned: ', response);
      if (response == true) {
        ctrl.loginStatus = true;
        $location.path('/');
      }
    });
  }

  //checks loginstatus on pageload
  ctrl.checkLoginStatus();

  //guess what this does?
  ctrl.login = function() {
    // console.log('logging in');
    var testy = sessionStorage.getItem( 'isAdmin' );
    // console.log( 'from sessionStorage:', testy );
    //makes username case insensitive
    ctrl.username = ctrl.username.toLowerCase();
    // console.log('ctrl.username', ctrl.username);
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      // console.log(response);
      // broadcasts login event for navbar
      $rootScope.$broadcast('userLoggedIn');
      $location.path('/');
    }, function(error) {
      // console.log('error logging in', error);
    });
  };

}; //end ctrl
