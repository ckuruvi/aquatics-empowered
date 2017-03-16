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

  //update the status of a facility
  this.updateFacility = function(facility) {
    console.log('In update facility');
    return $http.put('/admins/' + facility.id, facility).then(function(response) {
      console.log('facility status is updated', response);
    }).catch(function(err) {
      console.log('Error updating facility ', err);
    });
  };

  //gets complete list of users
  this.getAllUsers = function() {
    console.log('in getAllUsers in service');
    return $http.get('/admins/users').then(function(response) {
      return response.data;
    }).catch(function(err) {
      console.log('Error getting all users ', err);
    });
  }

  this.deleteUser = function(userId) {
    return $http.delete('admins/users/' + userId).then(function (response) {
      return response;
    }).catch(function(err) {
      console.log('error deleting user', err);
    })
  }


}); //end module
