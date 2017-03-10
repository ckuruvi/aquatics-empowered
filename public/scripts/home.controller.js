angular.module('aquaticsApp').controller('HomeController', function($http, $location, HomeService){


  var ctrl=this;

  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      sessionStorage.setItem( 'isAdmin', 'yay I am here...' );
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }


  ctrl.getFacilities=function(){
    HomeService.getFacilitiesList(ctrl.zipcode).then(function(list){
      ctrl.facilitieslist=list;
    });
  }
});

//  TODO stores the clicked facility in service to grab on next page.
// ctrl.storeFacChoice = function (facility) {
//
// }
