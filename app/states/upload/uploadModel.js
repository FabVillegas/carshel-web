angular.module( 'carshel-web' ).service( 'uploadModel', uploadModel );

uploadModel.$inject = [ '$q', '$firebaseObject' ];

function uploadModel( $q, $firebaseObject ) {

  var model = this;

  function uploadModel( REF_URL ) {
    model.firebaseio = REF_URL;
  };

  uploadModel.prototype = {
    uploadCarInfo: uploadCarInfo,
  };

  //////////////////////////////////////////////////

  function uploadCarInfo( EMAIL_ID, car ){
    console.log( car );
    var deferred = $q.defer();
    var uploadCarRef = new Firebase( model.firebaseio + 'cars/' );
    var CAR_ID = uploadCarRef.push( car );
    var uploadUserRef = new Firebase( model.firebaseio + 'users/' + EMAIL_ID + '/uploads');
    uploadUserRef.child( CAR_ID.key() ).set( true, function( error ) {
      if( error ){
        return deferred.reject( error );
      }
      else{
        return deferred.resolve( 'success' );
      }
    });

    return deferred.promise;

  };

  //////////////////////////////////////////////////

  return uploadModel;

};
