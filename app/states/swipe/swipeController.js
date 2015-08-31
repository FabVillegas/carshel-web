angular.module( 'carshel-web' ).controller( 'swipeController', swipeController );

swipeController.$inject = [ '$scope', '$state' ];

function swipeController( $scope, $state ) {
   var vm = this;


  vm.goToState = goToState;

  function goToState( stateName ){
    $state.go( stateName );
  };


};
