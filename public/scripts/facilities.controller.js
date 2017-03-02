angular.module('aquaticsApp').controller('FacilitiesController', function ($http, $location,$interval, FacilitiesService){
console.log('FacilitiesController is loaded');

var ctrl = this;
ctrl.facility=[];

//to get facilities info from database
ctrl.getFacilitiesInfo = function(){
  FacilitiesService.getFacilitiesInfo().then(function (res){
    console.log('got data from facilities', res);
    ctrl.facility = res;
  })
};
ctrl.getFacilitiesInfo();

ctrl.visibility = true;

$interval(function setInterval() {
  //toggle manually everytime
  ctrl.visibility = !ctrl.visibility;
  console.log('Toggling datepicker with interval of 3.5 seconds');
}, 3500);

});
