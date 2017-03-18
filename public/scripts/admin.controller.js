angular.module('aquaticsApp').controller('AdminController', function($http, $location, AdminService, AuthService, UserProfileService, $scope) {

  console.log('AdminController is loaded');

  var ctrl = this;
  var selection;

  //facilities list from db
  ctrl.facilitiesList = [];

  //boolean checking if user is logged in or ngRoute
  ctrl.loginStatus = false;

  //stores current user
  ctrl.currentUser;

  //stores list of all users
  ctrl.userList;


  //checks login status
  ctrl.checkLoginStatus = function() {
    AuthService.checkLoginStatus().then(function(response) {
      console.log('login check returned: ', response);
      if (response == false) {
        ctrl.loginStatus = false;
        $location.path('/');
        return;
      } else {
        ctrl.loginStatus = true;
      }
        UserProfileService.getUser().then(function(response) {
          ctrl.currentUser = response;
          if(ctrl.currentUser.user_type != "admin") {
            $location.path('/');
          }
          //getting facilities list on page load
          ctrl.getFacilitiesList();
          ctrl.getAllUsers();
        });
    })
  }
  //checks loginstatus on pageload
  ctrl.checkLoginStatus();

  //grab facilitiesList and return a response
  ctrl.getFacilitiesList = function() {
    console.log('current user is', ctrl.currentUser);
    if (ctrl.currentUser.user_type != "admin") {
      console.log('user is not an admin');
      return;
    }
    AdminService.getFacilitiesList().then(function(response) {
      console.log('Displaying facilities', response);

      //facilitiesList array is equal to response received from db
      ctrl.facilitiesList = response;

      //loop through facilitiesList, change status on page load based on db data
      for (var i = 0; i < ctrl.facilitiesList.length; i++) {
        if( ctrl.facilitiesList[i].approved ){
          ctrl.facilitiesList[i].status = 'approved';
          // ctrl.facilitiesList[i].pending = false;

        } else if (ctrl.facilitiesList[i].approved == null) {
          ctrl.facilitiesList[i].status = 'pending';
          // ctrl.facilitiesList[i].pending = true;
        } else {
          ctrl.facilitiesList[i].status = 'denied';
          // ctrl.facilitiesList[i].pending = false;
        }
        console.log('logging approved', ctrl.facilitiesList[i].approved);
      }
    });
  }; //end getFacilitiesList

  //delete facility from db after confirmation of true
  ctrl.deleteFacility = function(id) {
    ctrl.confirmDelete();
    if (selection == false) {
      return;
    }
    console.log('In deleteFacility', id);
    AdminService.deleteFacility(id).then(function(response) {
      console.log('Success deleting facility', response);
      ctrl.getFacilitiesList();
      return response;
    });
  };

  //update the status of a facility
  ctrl.updateFacility = function(facility) {
    console.log('In updateFacility', facility);
    AdminService.updateFacility(facility).then(function(facility) {
      console.log('Success deleting facility', facility);
      ctrl.getFacilitiesList();
      return facility;
    });
  }

  // confirm before deleting facility
  ctrl.confirmDelete = function() {
    selection = confirm('Press ok to delete this entry, this cannot be undone.');
    if (selection == true) {
      alert('entry deleted');
    } else {
      alert('Canceled Deletion.');
      return false;
    }
  };

  $scope.hiddenEntry = [];
  ctrl.editEntry = function(index) {
    $scope.hiddenEntry[index] = !$scope.hiddenEntry[index];
  };

  ctrl.editToggle = false;

  // gets list of all users
  ctrl.getAllUsers = function () {
    AdminService.getAllUsers().then(function(users) {
      console.log('received ', users.length, ' users from DB');
      console.log('users are ', users);
      ctrl.userList = users;
      console.log('userLIst is ', ctrl.userList);
    }).catch(function(err) {
      console.log('error getting userList', err);
    });
  }

  //deletes a specific user
  ctrl.deleteUser = function (userId) {
    ctrl.confirmDelete();
    if (selection == false) {
      return;
    }
    AdminService.deleteUser(userId).then(function(response) {
      console.log('successfully deleted user');
      ctrl.getAllUsers();
    }).catch(function(err) {
      console.log('error deleting user');
    });
  }

}); //end module
