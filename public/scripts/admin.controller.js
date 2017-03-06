angular.module('aquaticsApp').controller('AdminController', function($http, $location, AdminService) {

  console.log('AdminController is loaded');

  var ctrl = this;

  // set a theme for editable rows (not working, throwing error in console)
  // app.run(function(editableOptions) {
  //   editableOptions.them = 'bs3';
  // });

  //facilities list from db
  ctrl.facilitiesList = [];

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

  // status options
  // ctrl.status = [
  //   {value: 1, text: 'approve'},
  //   {value: 2, text: 'deny'}
  // ];

  //delete facility from facilityList and db
  ctrl.deleteFacility = function(id) {
    console.log('In deleteFacility', id);
  AdminService.deleteFacility(id).then(function(response) {
    ctrl.confirmDelete();
    console.log('Success deleting facility', response);
  ctrl.getFacilitiesList();
  return response;
    });
  };

  // confirm before deleting facility
  ctrl.confirmDelete = function() {
    var txt;
    var selection = confirm('Press ok to delete this facility, this cannot be undone.');
    if (selection == true) {
     alert('Facility deleted');
    } else {
      alert('Canceled Deletion.');
    }
  };



  // method to toggle edit
  // ctrl.toggleEditState = function() {
  //   for (var i = 0; i < ctrl.facilitiesList.length; i++) {
  //     if( ctrl.facilitiesList[i].approved ){
  //       ctrl.facilitiesList[i].status = 'approved';
  //       ctrl.facilitiesList[i].pending = false;
  //   } else if (ctrl.facilitiesList[i].approved == null) {
  //     ctrl.facilitiesList[i].status = 'pending';
  //     ctrl.facilitiesList[i].pending = true;
  //   } else {
  //     ctrl.facilitiesList[i].status = 'denied';
  //     ctrl.facilitiesList[i].pending = false;
  //   }
  // }
  // }; //end toggleEditState

}); //end module
