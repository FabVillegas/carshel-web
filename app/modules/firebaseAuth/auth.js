var app = angular.module( 'firebaseAuth', [ 'firebase' ] );

app.factory( 'auth', auth );

auth.$inject = [ '$firebaseAuth' ];

function auth( $firebaseAuth ) {
  /* rewrite the url with your own firebaseio https://xxxxxx.firebaseio.com/ */
  var ref = new Firebase( 'https://carshel-prototype.firebaseio.com/' );
  return $firebaseAuth( ref );
};
