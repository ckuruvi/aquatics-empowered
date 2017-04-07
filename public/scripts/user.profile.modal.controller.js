angular.module('aquaticsApp').controller('UserProfileModalController', function($scope,$uibModalInstance, userDetails) {
    var $ctrl = this;
      $ctrl.userDetails = userDetails;
      
      $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };


  });
