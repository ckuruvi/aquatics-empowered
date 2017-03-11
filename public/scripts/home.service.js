angular.module('aquaticsApp').service('HomeService', function($http){

  this.getFacilitiesList = function(zipcode){
    return $http.get("/home/" + zipcode).then(function(response){
      console.log("response data from server",response.data);
      return response.data;
    }).catch(function(err){
      console.log("Error getting facilities data",err);
    });
  }; // end of getFacilitiesList

});
