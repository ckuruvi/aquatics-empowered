angular.module('aquaticsApp').controller('FacilitiesController', function ($http, $location,$interval, FacilitiesService, UserProfileService){
console.log('FacilitiesController is loaded');

var ctrl = this;
ctrl.facility=[];
ctrl.facilityAvail=[];

//store current user info here
ctrl.currentUser = {};

//to get facilities info from database
ctrl.getFacilitiesInfo = function(){
  FacilitiesService.getFacilitiesInfo().then(function (res){
    console.log('got data from facilities', res);
    ctrl.facility = res;
  })
};
ctrl.getFacilitiesInfo();

//to get facilities availability
ctrl.getFacilitiesAvail = function(){
  FacilitiesService.getFacilitiesAvail().then(function (res){
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

//this key stores the date value is picked from the calendar
ctrl.getSearchResults = function (key){
  console.log('loading searched date');

  FacilitiesService.getSearchResults(key).then(function(response){
    ctrl.results = response;
    console.log('this is the fac avail', ctrl.results);


  });
};

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

});
