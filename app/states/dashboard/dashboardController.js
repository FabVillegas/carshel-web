angular.module( 'carshel-web' ).controller( 'dashboardController', dashboardController );

dashboardController.$inject = [ '$state', '$stateParams', 'dashboardModel' ];

function dashboardController( $state, $stateParams, dashboardModel ) {

  var vm = this;
  var model_obj = new dashboardModel( 'https://carshel-prototype.firebaseio.com/' );

  vm.user;
  vm.user_email = $stateParams.user_email;

  vm.logout = logout;

  active();

  ///////////////////////////////////////////////////////////////////

  function active() {
    model_obj.getUserData( vm.user_email ).then(
      function( responseData ) {
        vm.user = responseData;
      },
      function( reject ) {

      }
    );
  };

  function logout(){
    model_obj.unAuth();
    $state.go( 'login' );
  };

};
