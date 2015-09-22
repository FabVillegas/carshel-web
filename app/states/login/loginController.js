angular.module( 'carshel-web' ).controller( 'loginController', loginController );

loginController.$inject = [ '$scope', 'loginModel', 'User', '$mdDialog', '$state' ];

function loginController( $scope, loginModel, User, $mdDialog, $state ) {

  var vm = this;
  var model_obj = new loginModel( 'https://carshel-prototype.firebaseio.com/' );

  vm.login = login;
  vm.signup = signup;
  vm.sendCredentials = sendCredentials;
  vm.showAlert =  showAlert;
  vm.closeDialog = closeDialog;

  active();

  ///////////////////////////////////////////////////////

  function active(){

  };

  function login(){
    if( vm.email === undefined || vm.password === undefined){
      vm.showAlert( 'Be sure to type your email and password' );
    }
    else{
      model_obj.authUser( vm.email, vm.password ).then(
        function( response ) {
          console.log( 'Logged in.' );
          $state.go( 'dashboard.upload', { user_email: response } );
        },
        function( rejection ) {
          console.log( rejection );
          vm.password = '';
          vm.showAlert( 'False credentials. Make sure your email and password are correct.' );
        }
      );
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

  function signup( $event ){
    $mdDialog.show({
      targetEvent: $event,
      scope: $scope,
      preserveScope: true,
      templateUrl: './states/login/dialogs/signup.dialog.html'
    });
  };

  function closeDialog(){
    $mdDialog.hide();
  };

  function sendCredentials() {
    if( vm.newName === undefined && vm.newLastname === undefined && vm.newEmail === undefined || vm.newPassword === undefined || vm.confirmNewPassword === undefined ){
      vm.showAlert( 'Be sure to type your email, password, and confirmation.' );
    }
    else{
      var user_obj = new User( vm.newName, vm.newLastname, vm.newEmail );
      model_obj.verifyEmail( user_obj ).then(
        function( obj_response ) {
          model_obj.uploadUser( obj_response, vm.newPassword ).then(
            function( resolveResponse ) {
              vm.newName = '';
              vm.newLastname = '';
              vm.newEmail = '';
              vm.newPassword = '';
              vm.confirmNewPassword = '';
              console.log( 'logged!' );
              $state.go( 'dashboard.upload', { user_email: obj_response.get_EMAIL_ID() } );
            },
            function( rejectResponse ) {
              vm.showAlert( 'Wrong password.' );
              console.log( rejectResponse );
            }
          );
        },
        function( rejectResponse ){
          console.log( rejectResponse );
        }
      );
    }
  };

};
