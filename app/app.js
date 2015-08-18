angular.module('carshel-web', [
  'ui.router',
  'firebase',
  'responsiveMenu',
]).
config( [ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {

	$urlRouterProvider.otherwise('login');

  $stateProvider.
	state('login', {
		url: '/login',
		templateUrl: 'states/login/loginView.html',
		controller: 'loginController'
	}).
  state('swipe', {
		url: '/swipe',
		templateUrl: 'states/swipe/swipeView.html',
		controller: 'swipeController'
	}).
  state('deals', {
    url: '/deals',
    templateUrl: 'states/deals/dealsView.html',
    controller: 'dealsController'
  });

} ] );
