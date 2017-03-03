angular.module('aquaticsApp').controller('FacilitiesController', function ($http, $location,$interval, FacilitiesService){
console.log('FacilitiesController is loaded');

var ctrl = this;
ctrl.facility=[];
ctrl.facilityAvail=[];

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


ctrl.getSearchResults = function (key){
  console.log('loading searched date');

//working on array to push to angular calendar n sync calendar format to DB format
  SearchService.getSearchResults(key).then(function(response){
    ctrl.results = response;
    console.log(ctrl.results);
    ctrl.dateUnformatted = ngDate.split('day', 1);
    ctrl.month = ctrl.dateUnformatted.split('/',0);
    ctrl.date = ctrl.dateUnformatted.split('/', 1);


  });
};
});
