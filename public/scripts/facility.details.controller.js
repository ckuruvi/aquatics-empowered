angular.module('aquaticsApp').controller('FacilityDetailsController', function(FacilityDetailsService,$uibModal) {
    console.log('FacilityDetailsController is loaded');

    var ctrl = this;


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

    ctrl.timeSelectionArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

});
