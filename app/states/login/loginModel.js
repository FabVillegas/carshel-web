angular.module( 'carshel-web' ).service( 'loginModel', loginModel);

loginModel.$inject = [ '$q', '$firebase', '$firebaseObject', '$firebaseAuth'];

function loginModel( $q, $firebase, $firebaseObject, $firebaseAuth ) {

    var model = this;

    model.firebaseio;

    function loginModel ( REF_URL ) {
      model.firebaseio = REF_URL;
    };

    loginModel.prototype = {
        authUser: authUser,
        verifyEmail: verifyEmail,
        uploadUser: uploadUser,
    };

    //////////////////////////////////////////////////////////////////////////////

    function authUser( user_email, password ) {
      var deferred = $q.defer();
      var authObj = $firebaseAuth( new Firebase( model.firebaseio ) );
      authObj.$authWithPassword({
        email: user_email,
        password: password
      }).then( function( authData ) {
        var EMAIL_ID = user_email.replace( /\./g, ',' );
        var obj = $firebaseObject( new Firebase( model.firebaseio + 'users/' + EMAIL_ID ) );
        obj.$loaded()
        .then(
          function( data ) {
            return deferred.resolve( EMAIL_ID );
          }
        )
        .catch(
          function( error ){
            return deferred.reject( error );
          }
        );
      }).catch( function( error ) {
        return deferred.reject( false );
      });

      return deferred.promise;
    };

    function verifyEmail( user_obj ){
      var deferred = $q.defer();
      var EMAIL_ID = user_obj.getEmail().replace( /\./g, ',' );
      var obj = $firebaseObject( new Firebase( model.firebaseio + 'users/' + EMAIL_ID ) );
      obj.$loaded()
      .then( function( data ) {
        if( data.$value === null ){
          /* email is available */
          user_obj.set_EMAIL_ID( EMAIL_ID );
          return deferred.resolve( user_obj );
        }
        else{
          /* email is already in use */
          return deferred.reject( false );
        }
      })
      .catch( function( error) {
        /* check internet connection */
        console.log( error );
        return deferred.reject( false );
      });

      return deferred.promise;
    };


    function createUser( user_obj, password ) {
      var deferred = $q.defer();
      var authObj = $firebaseAuth( new Firebase( model.firebaseio ) );
      authObj.$createUser({
        email: user_obj.getEmail(),
        password: password
      }).then( function( userData ) {
        return deferred.resolve( true );
      })
      .catch( function( error ) {
        return deferred.reject( error );
      });

      return deferred.promise;
    };

    function uploadUser( user_obj, password ) {
      var deferred = $q.defer();
      /*
      ->user
        ->name
        ->lastname
        ->email
      */
      createUser( user_obj, password ).then(
        function( resolveResponse ) {
          var ref =  new Firebase( model.firebaseio + 'users/');
          ref.child( user_obj.get_EMAIL_ID() ).set( user_obj.getData() );
          return deferred.resolve( true );
        },
        function( rejectResponse ) {
          return deferred.reject( rejectResponse );
        }
      );

      return deferred.promise;
    };

    //////////////////////////////////////////////////////////////////////////////

    return loginModel;

};
