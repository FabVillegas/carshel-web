angular.module( 'carshel-web' ).controller( 'uploadController', uploadController );

uploadController.$inject = [ '$scope', 'uploadModel', 'imageToBase64Factory', 'Car', '$state', '$stateParams', '$mdDialog' ];

function uploadController( $scope, uploadModel, imageToBase64Factory, Car, $state, $stateParams, $mdDialog ) {

  var vm = this;
  var model_obj = new uploadModel( 'https://carshel-prototype.firebaseio.com/' );
  vm.image = '';
  vm.car = new Car();

  vm.states;
  vm.EMAIL_ID = '';

  vm.submitImage = submitImage;
  vm.transformImage =  transformImage;
  vm.submitCarInfo = submitCarInfo;
  vm.showAlert = showAlert;
  vm.removePhoto = removePhoto;

  active();

  ////////////////////////////////////////////////////////////////////////////////

  function active() {
    vm.EMAIL_ID = $stateParams.user_email;
    vm.states = (
      'AGU BCN BCS CAM CHP CHH COA COL DIF DUR GUA GRO HID JAL MEX MIC MOR NAY NLE OAX PUE QUE ' +
      'ROO SLP SIN SON TAB TAM TLA VER YUC ZAC').split(' ').map(
         function ( state ) {
           return {
             abbrev: state
           };
         }
       );
  };

  function submitImage() {
    if( vm.car.photos === undefined ){
      vm.car.photos = [];
    }
    if( vm.car.photos.length > 3 ){
      vm.showAlert( 'You can upload a maximum of 4 photos. Try removing one you would like to change.')
    }
    else{
      var target =  document.getElementById( 'submitImageInput' );
      angular.element( target )[0].click();
    }

  };

  function transformImage() {
    try{
      imageToBase64Factory.getBase64Data( 'submitImageInput' ).then(
        function( goodResponse ){
          vm.car.photos.push( goodResponse );
        },
        function( badResponse ){
          console.log( badResponse );
        }
      );
    }
    catch( errorMessage ){
      alert( 'No image file.' + '\n' + 'Must be a PNG or JPG file with a size less than 5 MB.' );
    }
  };

  function showAlert( message ){
    var alert;
    alert = $mdDialog.alert({
      title: 'Attention',
      content: message,
      ok: 'Close'
    });
    $mdDialog.show( alert ).finally( function() {
      alert = undefined;
    });
  };

  function removePhoto( index ) {
    vm.car.photos.splice( index, 1 );
  };

  function submitCarInfo(){
    if( vm.car.model === undefined || vm.car.brand === undefined || vm.car.year === undefined || vm.car.price === undefined || vm.car.description === undefined || vm.car.location.city === undefined || vm.car.location.state === undefined){
      vm.showAlert( 'Verify all the Car Information is filled.' );
    }
    else{
      model_obj.uploadCarInfo( vm.EMAIL_ID, vm.car ).then(
        function( response ) {
          vm.showAlert( 'Successful upload!' );
          vm.car = new Car();
        },
        function( rejection ){
          vm.showAlert( 'Connection error. Please try again.' );
        }
      );
    }
  };

};
