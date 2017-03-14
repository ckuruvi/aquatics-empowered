angular.module('aquaticsApp').controller('UserProfileModalController', function($scope,$uibModalInstance, userDetails) {
    console.log('UserProfileModalController is loaded', userDetails);
    var $ctrl = this;
      $ctrl.userDetails = userDetails;
      // $ctrl.selected = {
      //   item: $ctrl.items[0]
      // };

      // $ctrl.ok = function () {
      //   $uibModalInstance.close($ctrl.selected.item);
      // };

      $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };


  });
