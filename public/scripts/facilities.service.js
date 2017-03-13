angular.module('aquaticsApp').service('FacilitiesService', function($http){
  console.log('FacilitiesService is loaded');

  var sKey = {
      results: []
  };
//to get facilities info from database
  this.getFacilitiesInfo = function (id){
    return $http.get('/facility/' + id).then(function(response) {
     console.log('This is the facility data: ', response);
     return response.data;
   }).catch(function(err) {
     console.log('error getting response from the facilities :', err);
   });

  };

  this.getFacilitiesAvail = function (id){
    return $http.get('/facility/availability/' + id).then(function(response) {
     console.log('This is the facility avail data: ', response);
     return response.data;
   }).catch(function(err) {
     console.log('error getting response from the facilities avail:', err);
   });

  };

  this.getSearchResults = function (key, id){
  console.log('this is the date selected', key);
  return $http.get('/facility/' + id  + '/search/?q=' + key).then(function (response){

       console.log('This is the search data: ',response.data);

        //reference the array inside the object
        sKey.results = response.data;
        //set key to reference it on search.html
        sKey.key = key;
        return response.data;
     }).catch(function(err){
       console.log('Error searching database', err);
     });

};
//when facility avail date and time appears function to post selected time to DB
this.postFacilityAvail = function (reservation){
  return $http.post('/facility', {
    data: reservation
  }).then(function (response){
    console.log('Posting this avail data to reservation', response);
    return response.data;
  }).catch(function(err){
    console.log('error posting response to facility_reservation', err);
  });
};


});
