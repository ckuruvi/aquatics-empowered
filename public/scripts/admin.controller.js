angular.module('aquaticsApp').controller('AdminController', function($http, $location, AdminService) {

  console.log('AdminController is loaded');

  var ctrl = this;

  //facilities list from db
  ctrl.facilitiesList =[];

  ctrl.getFacilitiesList = function() {
    AdminService.getFacilitiesList().then(function(response) {
      console.log('Displaying facilities', response);

      ctrl.facilitiesList = response;
    });
  };

  //getting facilities list on page load
  ctrl.getFacilitiesList();

}); //end module
