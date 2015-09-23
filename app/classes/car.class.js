angular.module( 'carshel-web' ).service( 'Car', Car );

Car.$inject = [];

function Car() {

  function Car() {

  };

  Car.prototype = {
    model: undefined,
    brand: undefined,
    year: undefined,
    price: undefined,
    description: undefined,
    photos: undefined,
    location: undefined,
    characteristics: undefined
  };

  return Car;

};
