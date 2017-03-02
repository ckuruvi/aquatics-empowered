angular.module("aquaticsApp").controller('RegisterController', ['RegisterService', '$http', '$location', function(RegisterService, $http, $location){
  console.log('register Ctrl is loaded');
  var ctrl = this;


  ctrl.registerUser = function(newUser) {
    if(newUser.user) {
      newUser.userType = "user";
    } else {
      newUser.userType = "facility";
    }
    console.log('creating a new user ', newUser);
    RegisterService.registerUser(newUser);
  };


}]); // end register ctrl
