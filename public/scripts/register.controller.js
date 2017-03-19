angular.module("aquaticsApp").controller('RegisterController', ['RegisterService', 'EmailService', '$http', '$location', 'AuthService','$uibModal', function(RegisterService, EmailService, $http, $location, AuthService,$uibModal){
  console.log('register Ctrl is loaded');
  var ctrl = this;


  //stores boolean of login status
  ctrl.loginStatus = false;

  //stores current user
  ctrl.currentUser;


  //checks login status
  ctrl.checkLoginStatus = function() {
    AuthService.checkLoginStatus().then(function(response) {
      console.log('login check returned: ', response);
      if (response == true) {
        ctrl.loginStatus = true;
        $location.path('/');
      }
    });
  }

  //checks loginstatus on pageload
  ctrl.checkLoginStatus();

// sends newUser object (user/facility) to the registerService
  ctrl.registerUser = function(newUser) {
    if (newUser.password != newUser.password1) {
      swal('Both passwords must match.');
      return;
    }
    newUser.email = newUser.email.toLowerCase();
    console.log('EMAIL IS ', newUser.email);
    console.log('creating a new user ', newUser);
    RegisterService.registerUser(newUser);
    if(newUser.userType == 'facility'){
    swal("Thank you for registering with Aquatic Empowered! Please wait for an approval email");
  }
  if(newUser.userType == 'user'){
  swal("Thank you for joining Aquatics Empowered!");
}
  };

  //modal for aquatic levels
  ctrl.openInfoModal = function() {
    console.log('Opening pop up modal');
  var modalInstance = $uibModal.open({
    ariaLabelledBy: 'Aquatic levels homepage modals',
    templateUrl: '/views/aquaticlevelsinfo.modal.html',
    controller: 'AquaticLevelsModalController',
    controllerAs: 'levels',
    animation: 'true',
    size: 'lg'
    });
  };


}]); // end register ctrl
