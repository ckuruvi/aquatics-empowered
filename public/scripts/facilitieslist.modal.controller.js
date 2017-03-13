angular.module('aquaticsApp').controller('FacilitiesListModalController', function($scope, $uibModalInstance, facilityInfo, $interval, FacilitiesService, AuthService) {
  console.log('Facilities List Modal Controller loaded', facilityInfo);

  var ctrl = this;

// facility clicked to look at in modal
  ctrl.facilityInfo = facilityInfo;

  ctrl.facility=[];
  ctrl.facilityAvail=[];

  //store current user info here
  ctrl.currentUser = {};
  // stores available dates of a facility to display
  ctrl.results;

  //boolean checking if user is logged in or ngRoute
  ctrl.loginStatus = false;

  //on click of modal 'ok'
  ctrl.ok = function() {
    $uibModalInstance.close('ok');
  };

  //on click of modal 'cancel'
  ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };

  //checks login status
  ctrl.checkLoginStatus = function() {
    AuthService.checkLoginStatus().then(function(response) {
      console.log('login check returned: ', response);
      if (response == false) {
        ctrl.loginStatus = false;
      } else {
        ctrl.loginStatus = true;
        UserProfileService.getUser().then(function(response) {
          ctrl.currentUser = response;
          ctrl.userToDisplay = response;
        });
      }
    })
  }
  // checks loginStatus on page load
  ctrl.checkLoginStatus();


  //this key stores the date value is picked from the calendar
  ctrl.getSearchResults = function (key, id){
    console.log('loading searched date');
    FacilitiesService.getSearchResults(key, id).then(function(response){
      ctrl.results = response;
      console.log('this is the fac avail', ctrl.results);
    });
  };

  //reserve a spot in facility reservations
  ctrl.postFacilityAvail = function (reservation){
    if (ctrl.currentUser.user_type == 'facility') {
      console.log('facilites cant book a reservation');
      return;
    } else if (ctrl.loginStatus == false) {
      console.log('Cannot book reservation without logging in');
      alert('You must be logged in to book a reservation');
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
    console.log('id to get availability is ', id);
    FacilitiesService.getFacilitiesAvail(id).then(function (res){
      console.log('got data from facilities availability', res);
      ctrl.facilityAvail = res;
    })
  };
  ctrl.getFacilitiesAvail(ctrl.facilityInfo.id);

  ctrl.visibility = true;

  $interval(function setInterval() {
    //toggle manually everytime
    ctrl.visibility = !ctrl.visibility;
    // console.log('Toggling datepicker with interval of 3.5 seconds');
  }, 3500);


}); //end module
