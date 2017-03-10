angular.module('aquaticsApp').controller('AquaticLevelsModalController', function($scope,$uibModalInstance) {
    console.log('UserProfileModalController is loaded');

    var ctrl = this;




    ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };


  }); //end modal module

  // var modalInstance = $uibModal.open({
  //     ariaLabelledBy: 'User Details',
  //     ariaDescribedBy: 'modal-body',
  //     templateUrl: '/views/userprofilemodal.html',
  //     controller: 'UserProfileModalController',
  //     controllerAs: '',
  //     size: 'lg',
  //     resolve: {
  //       userDetails: function () {
  //         return ctrl.userDetails;
  //           }
  //         }
  //       });

        //   console.log('Opening pop up modal');
        //   var modalInstance = $uibModal.open({
        //     templateUrl: '/views/aquaticlevelsinfo.modal.html',
        //     controller: 'HomeController',
        //   });
        // };
