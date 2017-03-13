angular.module('aquaticsApp').controller('FacilitiesListModalController', function($scope, $uibModalInstance, facilityInfo, $interval, FacilitiesService) {
  console.log('Facilities List Modal Controller loaded', facilityInfo);

  var ctrl = this;

  ctrl.facilityInfo = facilityInfo;
  ctrl.facility=[];
  ctrl.facilityAvail=[];

  //store current user info here
  ctrl.currentUser = {};

  //on click of modal 'ok'
  ctrl.ok = function() {
    $uibModalInstance.close('ok');
  };

  //on click of modal 'cancel'
  ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };


  //this key stores the date value is picked from the calendar
  ctrl.getSearchResults = function (key){
    console.log('loading searched date');
    FacilitiesService.getSearchResults(key).then(function(response){
      ctrl.results = response;
      console.log('this is the fac avail', ctrl.results);
    });
  };

  //reserve a spot in facility reservations
  ctrl.postFacilityAvail = function (reservation){
    if (ctrl.currentUser.user_type == 'facility') {
      console.log('facilites cant book a reservation');
      return;
    }
    console.log('this is the reservation selected', reservation);
    FacilitiesService.postFacilityAvail(reservation).then(function (response){
  // console.log('this is the response', response);
      // response[0].facility_availability_id = reservation.id;
      ctrl.postAvail = response;
      console.log('this is the post fac avail reservation', ctrl.postAvail);
    });
  };

  ctrl.getUser = function () {
    UserProfileService.getUser().then(function(response) {
      ctrl.currentUser = response;
    });
  }

  //to get facilities availability
  ctrl.getFacilitiesAvail = function(id){
    FacilitiesService.getFacilitiesAvail(id).then(function (res){
      console.log('got data from facilities availability', res);
      ctrl.facilityAvail = res;
    })
  };
  ctrl.getFacilitiesAvail();

  ctrl.visibility = true;

  $interval(function setInterval() {
    //toggle manually everytime
    ctrl.visibility = !ctrl.visibility;
    // console.log('Toggling datepicker with interval of 3.5 seconds');
  }, 3500);


}); //end module
