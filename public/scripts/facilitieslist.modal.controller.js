angular.module('aquaticsApp').controller('FacilitiesListModalController', function($scope, $uibModalInstance, facilityInfo, $filter, $interval, FacilitiesService, AuthService, UserProfileService) {
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

  //stores selected date to grab reservations
  ctrl.selectedDate;

  // stores the alert boolean to cancel or continue functions.
  var selection;

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

  // alerts on attempting to book an already reserved slots
  ctrl.alreadyBooked = function (slot) {
    alert('Sorry, the slot at ' + slot.start_time + ' is already reserved. Please choose a different time slot.')
  }

  //this gets the time slots for a facility on selected date
  ctrl.getSearchResults = function (date, id){
    ctrl.selectedDate = date;
    console.log('loading searched date');
    FacilitiesService.getSearchResults(date, id).then(function(response){
      ctrl.results = response;
    });
  };

  //reserve a spot in facility reservations
  ctrl.postFacilityAvail = function (reservation){
    console.log('reservation object is ', reservation );
    if (ctrl.currentUser.user_type == 'facility') {
      console.log('facilites cant book a reservation');
      return;
    } else if (ctrl.loginStatus == false) {
      console.log('Cannot book reservation without logging in');
      //alert('You must be logged in to book a reservation' );
      swal("You must be logged in to book a reservation")
      return;
    }
    // ctrl.confirmBooking(reservation);
    // if(selection == false) {
    //   return;
    // }
    console.log('this is the reservation selected', reservation);

    swal({
  title: "",
  text: "Are you sure you want to reserve this time slot?",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes",
  cancelButtonText: "No",
  closeOnConfirm: false
},
function(){
  FacilitiesService.postFacilityAvail(reservation).then(function (response){
// console.log('this is the response', response);
    // response[0].facility_availability_id = reservation.id;
    ctrl.postAvail = response;
    console.log('this is the post fac avail reservation', ctrl.postAvail);
    ctrl.getSearchResults(ctrl.selectedDate, ctrl.facilityInfo.id);
    swal("Time slot has been reserved" );
  });

});

  };


  // alert confirm on book
  ctrl.confirmBooking = function(reservation) {
    selection = confirm('Are you sure you want to reserve this time slot?');
    if (selection == true) {
      alert('Reserved time slot on ' + new Date(reservation.date) + 'from ' + reservation.start_time + ' to ' + reservation.end_time + '.\n'
    + 'You can cancel your reservations from the profile view at any time.');
    } else {
      alert('Reservation was not booked.');
      return false;
    }
  };


  //to get facilities availability
  ctrl.getFacilitiesAvail = function(id, date){
    console.log('date to get avail is ', date);
    console.log('id to get availability is ', id);
    FacilitiesService.getFacilitiesAvail(id, date).then(function (res){
      console.log('got data from facilities availability', res);
      ctrl.facilityAvail = res;
    })
  };

  ctrl.visibility = true;

  $interval(function setInterval() {
    //toggle manually everytime
    ctrl.visibility = !ctrl.visibility;
    // console.log('Toggling datepicker with interval of 3.5 seconds');
  }, 3500);


}); //end module
