angular.module( 'carshel-web' ).controller( 'loginController', loginController );

loginController.$inject = [ '$scope', '$state' ];

function loginController( $scope, $state ) {
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

};
