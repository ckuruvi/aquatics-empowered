angular.module('aquaticsApp').controller('AdminController', function($http, $location, AdminService) {

  console.log('AdminController is loaded');

  var ctrl = this;

  //facilities list from db
  ctrl.facilitiesList =[];

  //grab facilitiesList and return a response
  ctrl.getFacilitiesList = function() {
    AdminService.getFacilitiesList().then(function(response) {
      console.log('Displaying facilities', response);

      //facilitiesList array is equal to response received from db
      ctrl.facilitiesList = response;
    });
  };

  //getting facilities list on page load
  ctrl.getFacilitiesList();

}); //end module
