angular.module('aquaticsApp').controller('AdminController', function($http, $location, AdminService, AuthService, UserProfileService, RegisterService, $scope) {

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
  ctrl.userList = [];


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
        if(ctrl.currentUser.user_type == 'facility' || ctrl.currentUser.user_type == 'user') {
          $location.path('/');
        }
        //getting facilities and users list on page load
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
    if (ctrl.currentUser.user_type == 'facility' || ctrl.currentUser.user_type == 'user') {
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
    // ctrl.confirmDelete();
    // if (selection == false) {
    //   return;
    // }

    swal({
      title: "",
      text: "Are you sure you want to delete the facility?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false
    },
    function(){
      console.log('In deleteFacility', id);
      AdminService.deleteFacility(id).then(function(response) {
        console.log('Success deleting facility', response);
        ctrl.getFacilitiesList();
        swal("Facility Deleted.");
        //return response;

      });
    });
  };

  // sends newUser object (user/facility) to the registerService
  ctrl.registerAdmin = function(newAdmin) {
    console.log('registerAdmin called with user ', newAdmin);
    if (newAdmin.password != newAdmin.password1) {
      swal('Both passwords must match.');
      return;
    }
    if (newAdmin.superadmin != true) {
      newAdmin.userType = 'admin';
    } else {
      newAdmin.userType = 'superadmin'
    }
    newAdmin.email = newAdmin.email.toLowerCase();
    // console.log('EMAIL IS ', newUser.email);
    console.log('creating a new admin ', newAdmin);
    RegisterService.registerUser(newAdmin).then(function(response) {
      console.log('response is ', response);
      document.adminForm.reset();
      if (response.status == 201) {
        swal ("You've successfully added an Admin!");
      } else if (response.status == 400){
        swal ("An Admin with that email address already exists.")
      }
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
      // only superadmins can see / delete admins
      if (ctrl.currentUser.user_type != 'superadmin') {
        users.forEach(function(user) {
          // filters out admins when user is not superadmin
          if (user.user_type != 'admin') {
            ctrl.userList.push(user)
          }
        });
        // if user is not admin, they are superadmin, and can see everyone.
      } else {
        ctrl.userList = users;
      }
      console.log('userList is ', ctrl.userList);
    }).catch(function(err) {
      console.log('error getting userList', err);
    });
  }

  //deletes a specific user
  ctrl.deleteUser = function (userId) {
    // ctrl.confirmDelete();
    // if (selection == false) {
    //   return;
    // }

    swal({
      title: "",
      text: "Are you sure you want to delete the user?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false
    },
    function(){
      AdminService.deleteUser(userId).then(function(response) {
        console.log('successfully deleted user');
        ctrl.getAllUsers();
        swal("User Deleted.");
      }).catch(function(err) {
        console.log('error deleting user');
      });
    });
  }

}); //end module
