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

      //loop through facilitiesList, change status on page load based on db data
      for (var i = 0; i < ctrl.facilitiesList.length; i++) {
        if( ctrl.facilitiesList[i].approved ){
          ctrl.facilitiesList[i].status = 'approved';
          // ctrl.facilitiesList[i].pending = false;

        } else if (ctrl.facilitiesList[i].approved == null) {
          ctrl.facilitiesList[i].status = 'pending';
          // ctrl.facilitiesList[i].pending = true;
        } else {
          ctrl.facilitiesList[i].status = 'denied';
          // ctrl.facilitiesList[i].pending = false;
        }
        console.log('logging approved', ctrl.facilitiesList[i].approved);
      }
    });
  }; //end getFacilitiesList

  //getting facilities list on page load
  ctrl.getFacilitiesList();

  ctrl.toggleEditState = function() {
    for (var i = 0; i < ctrl.facilitiesList.length; i++) {
      if( ctrl.facilitiesList[i].approved ){
        ctrl.facilitiesList[i].status = 'approved';
        ctrl.facilitiesList[i].pending = false;
    } else if (ctrl.facilitiesList[i].approved == null) {
      ctrl.facilitiesList[i].status = 'pending';
      ctrl.facilitiesList[i].pending = true;
    } else {
      ctrl.facilitiesList[i].status = 'denied';
      ctrl.facilitiesList[i].pending = false;
    }
  }
  }; //end toggleEditState

}); //end module
