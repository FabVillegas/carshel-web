angular.module( 'carshel-web' ).directive( 'fabMenu', fabMenu );

fabMenu.$inject = [ '$state' ];

function fabMenu( $state ) {
  return {
    restrict:'E',
    scope: {},
    transclude: true,
    templateUrl:'./modules/menu/fabMenu-template.html',
    link: function( scope, element, attrs ) {

      scope.goToState = goToState;

      function goToState( stateName ){
       $state.go( stateName );
      };
    }
  }
};
