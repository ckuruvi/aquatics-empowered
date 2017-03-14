angular.module("aquaticsApp").controller('RegisterController', ['RegisterService','EmailService', '$http', '$location', function(RegisterService, EmailService, $http, $location){
  console.log('register Ctrl is loaded');
  var ctrl = this;

// sends newUser object (user/facility) to the registerService
  ctrl.registerUser = function(newUser) {
    if (newUser.password != newUser.password1) {
      alert('Both passwords must match.');
      return;
    }
    console.log('creating a new user ', newUser);
    RegisterService.registerUser(newUser);

  };


}]); // end register ctrl
