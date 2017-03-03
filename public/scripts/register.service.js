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
    //checks if newUser is registering a facility, and if true sends user to register/facility route
    if(newUser.facility == true) {
        $http.post('register/facility', newUser).then(function(response){
          console.log(response);
          //sends the user back to home page after logging in
          $location.path('/home');
        }).catch(function(error) {
          console.log('error registering new user', error);
        });
    } else {
      // if user, sends newUser to register/user route
      $http.post('/register/user', newUser).then(function(response){
        console.log(response);
        //sends the user back to home page after logging in
        $location.path('/home');
      }).catch(function(error) {
        console.log('error registering new user', error);
      });
    }
  };


});
