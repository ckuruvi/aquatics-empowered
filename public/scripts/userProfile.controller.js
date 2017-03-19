angular.module('aquaticsApp').controller('userProfileController', ['UserProfileService', 'AuthService', '$http', '$location', function(UserProfileService, AuthService, $http, $location) {
  console.log('userProfileController is loaded');

  var ctrl = this;

  // user profile data will be stored here
  ctrl.userToDisplay;

  // used to toggle between edit state
  ctrl.editToggle = false;

  //stores boolean of login status
  ctrl.loginStatus = false;

  //stores current user
  ctrl.currentUser;

  //stores user's booked time slots
  ctrl.userBookedTimeSlots;

  // stores the date to display on confirm alert
  ctrl.currentDate;


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
          ctrl.userToDisplay = response;
          if(ctrl.currentUser.user_type != 'user') {
            $location.path('/');
          }
        });
    })
  }
  //checks loginstatus on pageload
  ctrl.checkLoginStatus();

  // gets user profile data
  ctrl.getUser = function () {
    if (ctrl.loginStatus == false) {
      $location.path('/login');
    } else{
      console.log('ctrl.getUser() called');
      UserProfileService.getUser().then(function(response) {
        ctrl.userToDisplay = response;
        // console.log('userToDisplay is ', ctrl.userToDisplay);
      });
    }
  } // end getUser()

  //changes ctrl.editToggle to true or false to allow editing.
  ctrl.edit = function () {
    if (ctrl.editToggle == false) {
      ctrl.editToggle = true;
    } else {
      ctrl.editToggle = false
    }
  }

  //updates edited user to the db
  ctrl.updateUser = function (user) {
    UserProfileService.updateUser(user).then(function (response) {
      ctrl.userToDisplay = response;
      console.log('after updating, userToDisplay is ', ctrl.userToDisplay);
    })
  }


  ctrl.getBookedTimeSlots = function () {
      UserProfileService.getBookedTimeSlots().then(function(response) {
        console.log("Booked time slots",response);
        ctrl.userBookedTimeSlots = response;
      });
    }
    //looks for booked time slots on page load
   ctrl.getBookedTimeSlots();

   //for formatting ISO date
   ctrl.formatDate = function(dt) {
     console.log('this is the dt', dt);
         var dt = new Date(dt);
          var month = dt.getMonth() + 1;
          if (month.length = 1) {
              month = '0' + month;
          }
          var year = dt.getFullYear();
          var date = dt.getDate();
          if (date.length = 1) {
              date = '0' + date;
          }

          ctrl.currentDate = month + '-' + date + '-' + year;
      }

   // confirm before deleting facility
   ctrl.confirmCancel = function(index) {
     ctrl.formatDate(ctrl.userBookedTimeSlots[index].date)
     selection = confirm('Are you sure you want to cancel your reservation at \n' +
     ctrl.userBookedTimeSlots[index].name + '\n' +
     'On ' + ctrl.currentDate + '\n' +
     'From ' + ctrl.userBookedTimeSlots[index].start_time + ' to ' + ctrl.userBookedTimeSlots[index].end_time + '?');
     if (selection == true) {
       alert('Your reservation has been canceled.');
     } else {
       alert('Your reservation was not canceled. See you at ' + ctrl.userBookedTimeSlots[index].start_time + '!');
       return false;
     }
   };


   ctrl.deleteBookedTimeSlot = function (id, index) {
    //  ctrl.confirmCancel(index);
    //  if( selection == false) {
    //    return;
    //  }

     swal({
 title: "",
 text: "Are you sure you want to cancel your reservation.",
 type: "warning",
 showCancelButton: true,
 confirmButtonColor: "#DD6B55",
 confirmButtonText: "Yes",
 cancelButtonText: "No",
 closeOnConfirm: false
},
function(){
  UserProfileService.deleteBookedTimeSlot(id).then(function(response) {
    ctrl.getBookedTimeSlots();
    swal("Your reservation has been canceled.");
  });

});


     }
}]); //end userProfileController
