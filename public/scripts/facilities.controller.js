angular.module('aquaticsApp').controller('FacilitiesController', function ($http, $location, FacilitiesService){
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



});
