angular.module( '' ).factory('imageToStringFactory', function(){
  return{
    getElement: function(id){
      return document.getElementById(id);
    },
    readImageFile: function(){
      if ( this.files && this.files[0] ) {
        var FR = new FileReader();
        FR.onload = function(e) {
          // TASKS AFTER e.target.result
        };
        FR.readAsDataURL( this.files[0] );
      }
    },
    convert: function(elementId){
      this.getElement(elementId).addEventListener("change", this.readImageFile, false);
    }
  }
});
