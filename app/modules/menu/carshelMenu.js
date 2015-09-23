angular.module( 'carshel-web' ).directive( 'carshelMenu', carshelMenu );

carshelMenu.$inject = [ '$state', '$stateParams' ];

function carshelMenu( $state, $stateParams ) {
  return {
    restrict:'E',
    scope: {},
    transclude: true,
    templateUrl:'./modules/menu/carshelMenu-template.html',
    link: function( scope, element, attrs ) {

      console.log( $stateParams );
      console.log( $stateParams.user_email );

      scope.user = {
        email: ''
      };

      scope.user.email = $stateParams.user_email;

      scope.goToState = goToState;

      function goToState( stateName ){
       // $state.go( stateName );
      };

    }
  }
};
