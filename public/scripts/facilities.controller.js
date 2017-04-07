angular.module('aquaticsApp').controller('FacilitiesController', function ($http, $location, $interval, FacilitiesService, UserProfileService){

var ctrl = this;

//to get facilities info from database
ctrl.getFacilitiesInfo = function(id){

  FacilitiesService.getFacilitiesInfo(id).then(function (res){

    ctrl.facility = res;
  })
};
ctrl.getFacilitiesInfo();



});
