angular.module("aquaticsApp").service('RegisterService', function($http, $location){


  this.checkLoginStatus = function(){
    console.log('Checking login status');
    return $http.get('/loginStatus').then(function(res){
      if (res.data) {
        return true;
      } else {
        return false;
      }
    });
  }

  // sends newUser to register route
  ctrl.registerUser = function() {
    console.log('creating a new user');

    $http.post('/register', ctrl.newUser).then(function(response){
      console.log(response);
      $location.path('/home');
    }, function(error) {
      console.log('error registering new user', error);
    });
  };


});
