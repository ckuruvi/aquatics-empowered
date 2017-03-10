angular.module("aquaticsApp").controller('RegisterController', ['RegisterService', '$http', '$location', function(RegisterService, $http, $location){
  console.log('register Ctrl is loaded');
  var ctrl = this;

// sends newUser object (user/facility) to the registerService
  ctrl.registerUser = function(newUser) {
    console.log('creating a new user ', newUser);
    RegisterService.registerUser(newUser);
  };


}]); // end register ctrl
