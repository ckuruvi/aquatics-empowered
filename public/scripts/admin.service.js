angular.module('aquaticsApp').service('AdminService', function($http, $location) {
  console.log('AdminService is loaded');

  this.getFacilitiesList = function() {
    console.log('Facilities returned');
    return $http.get('/admins').then(function(response) {
      console.log('this is the facilities list', response);
      return response.data;
    }).catch(function(err) {
      console.log('Error getting facilities');
    });
  };

}); //end module
