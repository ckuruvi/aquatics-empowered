angular.module("aquaticsApp").service('RegisterService', function(EmailService, $http, $location, $rootScope){


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
    if(newUser.userType == 'facility') {
        $http.post('register/facility', newUser).then(function(response){
          console.log(response);
          EmailService.sendEmail(newUser);
          // broadcasts login event for navbar
          $rootScope.$broadcast('userLoggedIn');
          //sends the user back to home page after logging in
          $location.path('/');
        });
    } else if (newUser.userType == 'user') {
      // if user, sends newUser to register/user route
      $http.post('/register/user', newUser).then(function(response){
        console.log(response);
        // broadcasts login event for navbar
        $rootScope.$broadcast('userLoggedIn');
        //sends the user back to home page after logging in
        $location.path('/');
      });
    } else if (newUser.userType == 'admin' || newUser.userType == 'superadmin') {
      console.log('registering admin');
        return $http.post('/register/user', newUser).then(function(response){
          console.log(response);
          return response;
      }).catch(function(error) {
        console.log('error registering new user', error);
        return error;
      });
    }
  };


});
