angular.module('aquaticsApp').controller('FacilitiesListModalController', function($uibModal) {

  var ctrl = this;

  ctrl.openModal = function(id) {
    console.log('Inside list modal', id);
  }


}); //end module


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


// angular.module('aquaticsApp').controller('FacilityDetailsController', function(FacilityDetailsService,$uibModal) {
//     console.log('FacilityDetailsController is loaded');

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
