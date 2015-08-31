angular.module( 'carshel-web' ).service( 'Car', Car );

Car.$inject = [];

function Car() {

  function Car() {

  };

  Car.prototype = {
    photos: [],
    model: '',
    brand: '',
    year: '',
    price: 0,
    description: '',
  };

  return Car;

};
