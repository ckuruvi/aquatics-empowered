angular.module('aquaticsApp').controller('HomeController', function($http, $location, HomeService,$uibModal){


  var ctrl = this;
  ctrl.logout = function() {
    $http.delete('/login').then(function(){
      console.log('Successfully logged out!');
      sessionStorage.setItem( 'isAdmin', 'yay I am here...' );
      $location.path('/');
    }).catch(function(err){
      console.log('Error logging out');
    });
  }

  //modal for aquatic levels
  ctrl.openInfoModal = function() {
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

  //modal for <li> in facilities list on home page
  ctrl.openListModal = function(id) {
    console.log('Inside list modal', id);
    HomeService.getFacilitiesList(id).then(function(res) {
      console.log('facilities list in modal', res);
    var modalInstance = $uibModal.open({
      ariaLabelledBy: 'List of Facilities',
      ariaDescribedBy: 'modal-body',
      templateUrl: '/views/facilitieslist.modal.html',
      controller: 'FacilitiesListModalController',
      controllerAs: 'list',
      size: 'lg,'
    });
    });
  };


  // ctrl.openModal = function(id){
  //   console.log('inside openModal',id);
  //   FacilityDetailsService.getUserDetails(id).then(function(res) {
  //       console.log('userdetails', res);
  //       ctrl.userDetails = res;
  //       var modalInstance = $uibModal.open({
  //           ariaLabelledBy: 'User Details',
  //           ariaDescribedBy: 'modal-body',
  //           templateUrl: '/views/userprofilemodal.html',
  //           controller: 'UserProfileModalController',
  //           controllerAs: '$ctrl',
  //           size: 'lg',
  //           resolve: {
  //             userDetails: function () {
  //               return ctrl.userDetails;
  //                 }
  //               }
  //             });
  //     });
  // }


  ctrl.getFacilities = function(){
    HomeService.getFacilitiesList(ctrl.zipcode).then(function(list){
      ctrl.facilitieslist = list;
    });
  }

});
