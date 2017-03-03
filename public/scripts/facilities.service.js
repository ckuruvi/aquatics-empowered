angular.module('aquaticsApp').service('FacilitiesService', function($http){
  console.log('FacilitiesService is loaded');

  var sKey = {
      results: []
  };
//to get facilities info from database
  this.getFacilitiesInfo = function (){
    return $http.get('/facility').then(function(response) {
     console.log('This is the facility data: ', response);
     return response.data;
   }).catch(function(err) {
     console.log('error getting response from the facilities :', err);
   });

  };

  this.getFacilitiesAvail = function (){
    return $http.get('/facility/availability').then(function(response) {
     console.log('This is the facility avail data: ', response);
     return response.data;
   }).catch(function(err) {
     console.log('error getting response from the facilities avail:', err);
   });

  };

  this.getSearchResults = function (key){
  console.log('this is the', key);
  console.log('Getting search results');
  return $http.get('scarf/search/?q=' + key).then(function (response){

       console.log('This is the search data: ',response.data);


        //reference the array inside the object
        sKey.results = response.data;
        //set key to reference it on search.html
        sKey.key = key;
        return response.data;
     }).catch(function(err){
       console.log(err);
       console.log('Error searching database');
     });

};

});
