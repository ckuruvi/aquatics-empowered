angular.module('aquaticsApp')
.controller('LoginController', LoginController);

function LoginController($http, $location, $rootScope) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.login = function() {
    console.log('logging in');
    var testy = sessionStorage.getItem( 'isAdmin' );
    console.log( 'from sessionStorage:', testy );
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(response){
      console.log(response);
      // broadcasts login event for navbar
      $rootScope.$broadcast('userLoggedIn');
      $location.path('/');
    }, function(error) {
      console.log('error logging in', error);
    });
  };




}
