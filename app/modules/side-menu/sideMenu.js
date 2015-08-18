var app = angular.module( 'sideMenu', [] );

app.directive( 'sideMenu', sideMenu );

sideMenu.$inject = [];

function sideMenu() {
  return {
		restrict:'E',
		scope: false,
		transclude:true,
		templateUrl:'./modules/side-menu/sideMenu.html',
		link: function( scope, element, attrs ) {
      scope.menuIsShown = false;
      scope.toggleMenu = function(){
        scope.menuIsShown = !scope.menuIsShown;
      };

    }
  }
};
