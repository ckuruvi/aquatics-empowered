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
  this.registerUser = function(newUser) {
    console.log('creating a new user');
    if(newUser.facility == true) {
        $http.post('register/facility', newUser)
    } else {
      $http.post('/register/user', newUser).then(function(response){
        console.log(response);
        $location.path('/home');
      }).catch(function(error) {
        console.log('error registering new user', error);
      });
    }
  };


});
