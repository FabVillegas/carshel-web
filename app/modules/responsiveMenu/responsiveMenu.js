var app = angular.module( 'responsiveMenu', [] );

app.directive( 'responsiveMenu', responsiveMenu );

responsiveMenu.$inject = [];

function responsiveMenu() {
  return {
		restrict:'E',
		scope: false,
		transclude:true,
		templateUrl:'./modules/responsiveMenu/responsiveMenu.html',
		link: function( scope, element, attrs ) {

    }
  }
};
