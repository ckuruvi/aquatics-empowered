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
      for (var i = 0; i < ctrl.facilitiesList.length; i++) {
        if( ctrl.facilitiesList[i].approved ){
          ctrl.facilitiesList[i].status = 'approved';
        }
        else if (ctrl.facilitiesList[i].approved == null) {
          ctrl.facilitiesList[i].status = 'pending';
        }
        else{
          ctrl.facilitiesList[i].status = 'denied';
        }
        console.log('logging apporved', ctrl.facilitiesList[i].approved);
      }
    });
  };

  //getting facilities list on page load
  ctrl.getFacilitiesList();

  // //change status received from db
  // ctrl.switchStatus = function() {
  //   ctrl.status = ['true', 'false', 'null'];
  //   ctrl.changeStatus = ctrl.status[0];
  // }; //end switchStatus function

}); //end module
