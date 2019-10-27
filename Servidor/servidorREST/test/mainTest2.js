// ........................................................
// Autor: Emilio Esteve Peiró
// Fecha inicio: 24/10/2019
// Última actualización: 24/10/2019
// mainTest4.js
// ........................................................
var request = require ('request')
var assert = require ('assert')
// ........................................................
// ........................................................
const IP_PUERTO="http://localhost:8080"
// ........................................................
// main ()
// ........................................................
describe( "Test 4 : Probamos darAltaUsuario ", function() {

  // ....................................................
  // PROBAMOS POST /insertarMedicion
  // ....................................................

  it( "probar POST /darAltaUsuario", function( hecho ) {
    var datosUsuario = {
      email: "emilioxeraco@gmail.com",
      password: "1234", telefono: "646601542"
    }
    request.post(
      { url : IP_PUERTO+"/darAltaUsuario",
      headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
      body : JSON.stringify( datosUsuario )
    },
    function( err, respuesta, carga ) {
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( carga, "OK", "¿La carga no es OK" )
      hecho()
    } // callback
    ) // .post
  }) // it


}) // describe
