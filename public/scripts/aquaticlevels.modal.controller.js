angular.module('aquaticsApp').controller('AquaticLevelsModalController', function($scope,$uibModalInstance) {
    
    var ctrl = this;
    ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }); //end modal module
