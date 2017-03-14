angular.module('aquaticsApp').controller('AquaticLevelsModalController', function($scope,$uibModalInstance) {
    console.log('UserProfileModalController is loaded');

    var ctrl = this;


    ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  }); //end modal module

  
