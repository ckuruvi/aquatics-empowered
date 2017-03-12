angular.module('aquaticsApp').controller('FacilitiesListModalController', function($scope, $uibModalInstance, facilityInfo, FacilitiesService) {
  console.log('Facilities List Modal Controller loaded', facilityInfo);

  var ctrl = this;

  ctrl.facilityInfo = facilityInfo;

  console.log('Loggin facilityInfo', facilityInfo);



  ctrl.ok = function() {
    $uibModalInstance.close('ok');
  };

  ctrl.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };




}); //end module

// angular.module('aquaticsApp').controller('UserProfileModalController', function($scope,$uibModalInstance, userDetails) {
//     console.log('UserProfileModalController is loaded', userDetails);
//     var $ctrl = this;
//       $ctrl.userDetails = userDetails;
//       // $ctrl.selected = {
//       //   item: $ctrl.items[0]
//       // };
//
//       // $ctrl.ok = function () {
//       //   $uibModalInstance.close($ctrl.selected.item);
//       // };
//
//       $ctrl.cancel = function () {
//         $uibModalInstance.dismiss('cancel');
//       };
//
//
//   });
