angular.module('carshel-web', [
  'ui.router',
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'firebase',
  'imageToBase64'
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
  state('upload', {
    url: '/upload',
    templateUrl: 'states/upload/uploadView.html',
    controller: 'uploadController'
  });

} ] );
