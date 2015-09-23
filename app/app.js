angular.module('carshel-web', [
  'ui.router',
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'firebase',
  'imageToBase64',
  'firebaseAuth'
]).
run( [ '$rootScope', '$state', function( $rootScope, $state ) {
  $rootScope.$on( '$stateChangeError', function( event, toState, toParams, fromState, fromParams, error ) {
    if ( error === 'AUTH_REQUIRED' ) {
      $state.go( 'login' );
    }
  });
}]).
config( [ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.otherwise('login');
  $stateProvider.
	state('login', {
		url: '/login',
		templateUrl: 'states/login/loginView.html',
		controller: 'loginController',
    resolve: {
      'currentAuth': isAuth
    }
	})
  .state('dashboard', {
    url: '/dashboard/:user_email',
    templateUrl: 'states/dashboard/dashboardView.html',
    controller: 'dashboardController',
    resolve: {
      'currentAuth': isLoggedIn
    }
  })
  .state('dashboard.upload', {
    url: '/upload',
    templateUrl: 'states/upload/uploadView.html',
    controller: 'uploadController',
    resolve: {
      'currentAuth': isLoggedIn
    }
  });

} ] );

var isAuth = function( auth ) {
  return auth.$waitForAuth();
};

var isLoggedIn = function( auth ) {
  return auth.$requireAuth();
};
