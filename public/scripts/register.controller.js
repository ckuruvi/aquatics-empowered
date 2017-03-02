angular.module("aquaticsApp").controller('RegisterController', function($http, $location){
  console.log('register Ctrl is loaded');
  var ctrl = this;


  ctrl.register = function() {
    console.log('creating a new user');

    $http.post('/register', ctrl.newUser).then(function(response){
      console.log(response);
      $location.path('/home');
    }, function(error) {
      console.log('error registering new user', error);
    });
  };


}); // end register ctrl
