angular.module('aquaticsApp').controller('FacilitiesController', function ($http, $location,$interval, FacilitiesService, UserProfileService){
console.log('FacilitiesController is loaded');

var ctrl = this;


//to get facilities info from database
ctrl.getFacilitiesInfo = function(id){
  console.log('Logging id', id);
  FacilitiesService.getFacilitiesInfo(id).then(function (res){
    console.log('got data from facilities', res);
    ctrl.facility = res;
  })
};
ctrl.getFacilitiesInfo();



});
