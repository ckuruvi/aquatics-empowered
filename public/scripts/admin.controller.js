angular.module('aquaticsApp').controller('AdminController', function($http, $location, AdminService) {

  console.log('AdminController is loaded');

  var ctrl = this;


  ctrl.getFacilitiesList = function() {
    AdminService.getFacilitiesList().then(function(response) {
      console.log('Displaying facilities', response);

      ctrl.facilitiesList = response;
    });
  };

  ctrl.getFacilitiesList();

}); //end module
