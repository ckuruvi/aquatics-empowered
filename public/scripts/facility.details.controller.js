angular.module('aquaticsApp').controller('FacilityDetailsController',['FacilityDetailsService','EmailService','UserProfileService', 'AuthService', '$uibModal', '$location', function(FacilityDetailsService, EmailService, UserProfileService, AuthService, $uibModal, $location) {
    console.log('FacilityDetailsController is loaded');

    var ctrl = this;
    //array of hours in a day for dropdown menu
    ctrl.timeSelectionArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    //array with AM/PM
    ctrl.ampm = ['AM', 'PM']

    //current facility data to display stored here
    ctrl.facilityInfo;

    //current facility contact info stored here
    ctrl.contactInfo;

    // used to toggle between edit state
    ctrl.editToggle = false;


    //boolean checking if user is logged in or ngRoute
    ctrl.loginStatus = false;

    //stores current user
    ctrl.currentUser;

    ctrl.userContactData;

    // boolean for confirmation
    var selection;

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
            if(ctrl.currentUser.user_type != 'facility') {
              $location.path('/');
            }
          });
      })
    }
    //checks loginstatus on pageload
    ctrl.checkLoginStatus();

    //changes ctrl.editToggle to true or false to allow editing.
    ctrl.edit = function () {
      if (ctrl.editToggle == false) {
        ctrl.editToggle = true;
      } else {
        ctrl.editToggle = false
      }
    }

    // confirm before deleting facility
    ctrl.confirmDelete = function() {
      selection = confirm('Press ok to delete this time slot, this cannot be undone.');
      if (selection == true) {
        alert('Time slot deleted');
      } else {
        alert('Canceled Deletion.');
        return false;
      }
    };

    ctrl.getContactInfo = function () {
        console.log('ctrl.getUser() called');
        UserProfileService.getUser().then(function(response) {
          ctrl.contactInfo = response;
          ctrl.getFacility();
        });
    } // end getContactInfo()

    //gets contact info and calls getFacility() on page load
    ctrl.getContactInfo();


    //updates edited user to the db
    ctrl.updateUser = function (newInfo) {
      UserProfileService.updateUser(newInfo).then(function (response) {
        if(response.name) { // checks if edited info was facility
          ctrl.facilityInfo = response;
        } else if (response.first_name) { // checks if edited info was contact
          ctrl.contactInfo = response;
        }
      });
    }

    // set timeslots based on user selection
    ctrl.setTimeSlots = function(formData) {
        console.log("inside setTimeSlots", formData);
        FacilityDetailsService.setTimeSlots(formData).then(function(response) {
            //ctrl.results = response;
            console.log("date for getTimeSlots", ctrl.formdata.date);
            ctrl.getTimeSlots(ctrl.formdata.date);
            console.log('this is the fac avail', ctrl.results);
        });
    };


 // get timeslots  for a single date
    ctrl.getTimeSlots = function(date) {
        console.log("inside getTimeSlots::", date);
        if (date != undefined) {
            FacilityDetailsService.getTimeSlots(date).then(function(res) {
                console.log('timeslots', res);
                ctrl.timeSlotList = res;
                ctrl.getFacilityTimeSlots(ctrl.facilityInfo.id);
            });
        }
    };


    ctrl.deleteTimeSlot = function(dateObj) {
      ctrl.confirmDelete();
      if(selection == false) {
        return;
      }
        console.log("inside deleteTimeSlot::", dateObj);
        //get sesstion storage item and parse the json string and store it in userContactData
        var temp = sessionStorage.getItem( 'ucd' );
        ctrl.userContactData = JSON.parse( temp ) ;
        console.log('this is the contact info', ctrl.userContactData );
        FacilityDetailsService.deleteTimeSlot(dateObj, ctrl.facilityInfo, ctrl.userContactData).then(function(res) {
          console.log("line 78",ctrl.formdata);
          if(ctrl.formdata != undefined){
            ctrl.getTimeSlots(ctrl.formdata.date);
          }
            ctrl.getFacilityTimeSlots(ctrl.facilityInfo.id);
        });
    };


    ctrl.getFacility = function() {
      FacilityDetailsService.getFacilityInfo(ctrl.contactInfo.id).then(function(response) {
        console.log('facility stored is ', response);
        ctrl.facilityInfo = response;
        ctrl.getFacilityTimeSlots(ctrl.facilityInfo.id);
      });
    }

  // modal  call to display user infomation for booked timeslots
    ctrl.openModal=function(id){
      console.log('inside openModal',id);
      FacilityDetailsService.getUserDetails(id).then(function(res) {
          console.log('userdetails', res);
          ctrl.userDetails = res;
          var modalInstance = $uibModal.open({
              ariaLabelledBy: 'User Details',
              ariaDescribedBy: 'modal-body',
              templateUrl: '/views/userprofilemodal.html',
              controller: 'UserProfileModalController',
              controllerAs: '$ctrl',
              size: 'lg',
              resolve: {
                userDetails: function () {
                  return ctrl.userDetails;
                    }
                  }
                });
        });
    }
 // get all timeslots available for the facility
    ctrl.getFacilityTimeSlots = function(facilityId) {
        console.log("inside getFacilityTimeSlots::");
            FacilityDetailsService.getFacilityTimeSlots(facilityId).then(function(res) {
                console.log('facility timeslots', res);
                ctrl.facilityTimeSlotList = res;
            });
    };



}]);
