angular.module('aquaticsApp').controller('FacilityDetailsController', function(FacilityDetailsService, UserProfileService, $uibModal) {
    console.log('FacilityDetailsController is loaded');

    var ctrl = this;
    //array of hours in a day for dropdown menu
    ctrl.timeSelectionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    //current facility data to display stored here
    ctrl.facilityInfo;

    //current facility contact info stored here
    ctrl.contactInfo;

    // used to toggle between edit state
    ctrl.editToggle = false;



    //changes ctrl.editToggle to true or false to allow editing.
    ctrl.edit = function () {
      if (ctrl.editToggle == false) {
        ctrl.editToggle = true;
      } else {
        ctrl.editToggle = false
      }
    }

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



    ctrl.getTimeSlots = function(date) {
        console.log("inside getTimeSlots::", date);
        if (date != undefined) {
            FacilityDetailsService.getTimeSlots(date).then(function(res) {
                console.log('timeslots', res);
                ctrl.timeSlotList = res;
            });
        }
    };

    ctrl.deleteTimeSlot = function(id) {
        console.log("inside deleteTimeSlot::", id);
        FacilityDetailsService.deleteTimeSlot(id).then(function(res) {
            //console.log(res);
            ctrl.getTimeSlots(ctrl.formdata.date);
        });
    };

    ctrl.getFacility = function() {
      FacilityDetailsService.getFacilityInfo(ctrl.contactInfo.id).then(function(response) {
        console.log('facility stored is ', response);
        ctrl.facilityInfo = response;
        ctrl.getFacilityTimeSlots(ctrl.facilityInfo.id);
      });
    }

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

    ctrl.getFacilityTimeSlots = function(facilityId) {
        console.log("inside getFacilityTimeSlots::");
            FacilityDetailsService.getFacilityTimeSlots(facilityId).then(function(res) {
                console.log('facility timeslots', res);
                ctrl.facilityTimeSlotList = res;
            });
    };



});
