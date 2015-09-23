angular.module( 'carshel-web' ).service( 'dashboardModel', dashboardModel );

dashboardModel.$inject = [ '$q', '$firebaseObject', '$firebaseAuth' ];

function dashboardModel( $q, $firebaseObject, $firebaseAuth ) {

  var model = this;

  function dashboardModel( REF_URL ) {
    model.firebaseio = REF_URL;
  };

  dashboardModel.prototype = {
    getUserData: getUserData,
    unAuth: unAuth,
  };

  ////////////////////////////////////////////////

  function getUserData( EMAIL_ID ) {
    var deferred = $q.defer();
    var ref = $firebaseObject( new Firebase( model.firebaseio + 'users/' + EMAIL_ID ) );
    ref.$loaded()
    .then(
      function( data ) {
        return deferred.resolve( data );
      }
    )
    .catch(
      function( error ){
        return deferred.reject( error );
      }
    );

    return deferred.promise;
  };

  function unAuth(){
    var ref = new Firebase( model.firebaseio );
    var authObj = $firebaseAuth( ref );
    console.log( authObj );
    authObj.$unauth();
  };

  ////////////////////////////////////////////////

  return dashboardModel;

};
