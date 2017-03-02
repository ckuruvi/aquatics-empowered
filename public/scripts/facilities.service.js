angular.module('aquaticsApp').service('FacilitiesService', function($http){
  console.log('FacilitiesService is loaded');

//to get facilities info from database
  this.getFacilitiesInfo = function (){
    return $http.get('/facility').then(function(response) {
     console.log('This is the facility data: ', response);
     return response.data;
   }).catch(function(err) {
     console.log('error getting response from the facilities :', err);
   });

  };

});
