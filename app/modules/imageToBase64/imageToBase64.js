var app = angular.module( 'imageToBase64', [] );

app.factory( 'imageToBase64Factory', imageToBase64Factory );

imageToBase64Factory.$inject = [ '$q' ];

function imageToBase64Factory( $q ) {

  function getBase64Data( elementId ) {
    var deferred =  $q.defer();
    var fileInput = document.getElementById( elementId );
    if ( fileInput.files && fileInput.files[0] && fileInput !== null ) {
      if( fileInput.files[0].type === 'image/jpeg' || fileInput.files[0].type === 'image/png' ){
        if( fileInput.files[0].size < 5000000 ){
          /* file is less than 5 mb */
          /* This value can be changed */
          var FR = new FileReader();
          FR.onload = function(e) {
            // return e.target.result, the base64 data
            return deferred.resolve( e.target.result );
          };
          FR.readAsDataURL( fileInput.files[0] );
        }
        else{
          return deferred.reject( 'File size too large.' );
        }

      }
      else{
        return deferred.reject( 'No image file.' );
      }
    }
    else{
      return deferred.reject( 'No image file.' );
    }

    return deferred.promise;
  }

  return{
    getBase64Data: getBase64Data,
  }

};
