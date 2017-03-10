angular.module('aquaticsApp').controller('HomeController', function($http, $location, HomeService,$uibModal){


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

  ctrl.openModal = function() {
    console.log('Opening pop up modal');
  var modalInstance = $uibModal.open({
    ariaLabelledBy: 'Aquatic levels homepage modals',
    templateUrl: '/views/aquaticlevelsinfo.modal.html',
    controller: 'AquaticLevelsModalController',
    controllerAs: 'levels',
    animation: 'true',
    size: 'lg'
    });
  };

  ctrl.getFacilities=function(){
    HomeService.getFacilitiesList(ctrl.zipcode).then(function(list){
      ctrl.facilitieslist=list;
    });
  }

});
