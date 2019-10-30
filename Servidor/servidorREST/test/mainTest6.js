// ........................................................
// Autor: Emilio Esteve Peiró
// Fecha inicio: 24/10/2019
// Última actualización: 24/10/2019
// mainTest1.js
// ........................................................
var request = require ('request')
var assert = require ('assert')
// ........................................................
// ........................................................
const IP_PUERTO="http://localhost:8080"
// ........................................................
// main ()
// ........................................................
describe( "Test 6 : Probamos /usuarios", function() {

  // ....................................................
  // PROBAMOS POST /insertarMedicion
  // ....................................................

  it( "probar get /usuarios", function( hecho ) {
    request.get(
      { url : IP_PUERTO+"/usuarios", headers : { 'User-Agent' : 'jordi' }},
      function( err, respuesta, carga ) {
        var json = JSON.parse(carga);
        assert.equal( err, null, "¿ha habido un error?" )
        console.log(json)
        assert.equal( json[0].email, "emilioxeraco@gmail.com")
        hecho()
      } // callback()
    ) // .get
  }) // it

}) // describe
