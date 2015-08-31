angular.module( 'carshel-web' ).controller( 'uploadController', uploadController );

uploadController.$inject = [ 'imageToBase64Factory', 'Car' ];

function uploadController( imageToBase64Factory, Car ) {

  var vm = this;
  vm.image = '';
  vm.car = new Car();

  vm.submitImage = submitImage;
  vm.transformImage =  transformImage;

  function submitImage() {
    var target =  document.getElementById( 'submitImageInput' );
    angular.element( target )[0].click();
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

};
