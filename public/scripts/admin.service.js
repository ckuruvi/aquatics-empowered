angular.module('aquaticsApp').service('AdminService', function($http, $location) {
  console.log('AdminService is loaded');

  //function to get facilitiesList from db
  this.getFacilitiesList = function() {
    console.log('Facilities returned');
    return $http.get('/admins').then(function(response) {
      console.log('this is the facilities list', response);
      return response.data;
    }).catch(function(err) {
      console.log('Error getting facilities');
    });
  };

  //delete facility from db
  this.deleteFacility = function(id) {
    return $http.delete('/admins/' + id).then(function(response) {
      console.log('Success deleting facility', response);
    }).catch(function(err) {
      console.log('Error deleting person', err);
    });
  };

  // this.updateFacility = function() {
  //   console.log('In update facility', facility.approved);
  //   $http.put('/admins/').then(function(response) {
  //     console.log('facility status is updated', response);
  //   }).catch(function(err) {
  //     console.log('Error updating facility');
  //   });
  // };


}); //end module
