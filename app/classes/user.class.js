angular.module( 'carshel-web' ).service( 'User', User );

User.$inject = [ '$firebase' , '$firebaseAuth' ];

function User( $firebase, $firebaseAuth ) {

  var user = this;

  user.ref;
  user.EMAIL_ID;
  user.name;
  user.lastname;
  user.email;
  user.telephone;
  user.active_chats;

  function User( name, lastname, email ){
    user.name = name;
    user.lastname = lastname;
    user.email = email;
  };

  User.prototype = {
    getData: getData,
    convert_IDtoEmail: convert_IDtoEmail,
    convertFromEmailtoID: convertFromEmailtoID,
    set_EMAIL_ID: set_EMAIL_ID,
    get_EMAIL_ID: get_EMAIL_ID,
    setEmail: setEmail,
    getEmail: getEmail,
    setTelephone: setTelephone,
  };

  ///////////////////////////////////////////////////////////////////

  function set_EMAIL_ID( EMAIL_ID ){
    user.EMAIL_ID =  EMAIL_ID;
  };

  function get_EMAIL_ID() {
    var EMAIL_ID = user.EMAIL_ID;
    return EMAIL_ID;
  };

  function setEmail( email ){
    user.email =  email;
  };

  function getEmail(){
    var email = user.email;
    return email;
  };

  function setTelephone( telephone ){
    user.telephone = telephone;
  };

  function convert_IDtoEmail( email_id ){
    var EMAIL = email_id.replace( /\,/g, '.' );
    setEmail( EMAIL );
  };

  function convertFromEmailtoID(){
    console.log( user );
    // var EMAIL_ID = getEmail.replace( /\./g, ',' );
    // set_EMAIL_ID( EMAIL_ID );
  };

  function getData(){
    return user;
  }

  ///////////////////////////////////////////////////////////////////

  return User;

};
