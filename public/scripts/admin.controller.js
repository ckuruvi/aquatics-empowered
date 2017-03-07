angular.module('aquaticsApp').controller('AdminController', function($http, $location, AdminService, $scope) {

  console.log('AdminController is loaded');

  var ctrl = this;
  var selection;

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


  //delete facility from db after confirmation of true
  ctrl.deleteFacility = function(id) {
    ctrl.confirmDelete();
    if (selection == false) {
      return;
    }
    console.log('In deleteFacility', id);
    AdminService.deleteFacility(id).then(function(response) {
      console.log('Success deleting facility', response);
      ctrl.getFacilitiesList();
      return response;
    });
  };

  //update the status of a facility
  ctrl.updateFacility = function(facility) {
    console.log('In updateFacility', facility);
    AdminService.updateFacility(facility).then(function(facility) {
      console.log('Success deleting facility', facility);
      ctrl.getFacilitiesList();
      return facility;
    });
  }

  // confirm before deleting facility
  ctrl.confirmDelete = function() {
    selection = confirm('Press ok to delete this facility, this cannot be undone.');
    if (selection == true) {
      alert('Facility deleted');
    } else {
      alert('Canceled Deletion.');
      return false;
    }
  };

  $scope.hiddenEntry = [];
  ctrl.editEntry = function(index) {
    $scope.hiddenEntry[index] = !$scope.hiddenEntry[index];
  };

  ctrl.editToggle = false;

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




//NOTES

//target editToggle by row/facility id
