// ........................................................
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
describe( "Test 1 : Recuerda arrancar el servidor", function() {

  // ....................................................
  // PROBAMOS POST /insertarMedicion
  // ....................................................

  it( "probar POST /insertarMedicion", function( hecho ) {
    var datosPersona = {
      medidaCO : 74, hora : "13:55", fecha : "18:1:2019"
    }
    request.post(
      { url : IP_PUERTO+"/insertarMedicion",
      headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
      body : JSON.stringify( datosPersona )
    },
    function( err, respuesta, carga ) {
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( carga, "OK", "¿La carga no es OK" )
      hecho()
    } // callback
    ) // .post
  }) // it

// ....................................................
// PROBAMOS GET /medicion/<fecha>
// ....................................................

it( "GET /medicion/18:1:2019 responde con la Medicion hecha en esa fecha", function( hecho ) {
  request.get(
    { url : IP_PUERTO+"/medicion/18:1:2019", headers : { 'User-Agent' : 'jordi' }},
    function( err, respuesta, carga ) {
      var json = JSON.parse(carga);
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( json[0].medidaCO, 74, "¿La medida es 74?" + json[0].medidaCO )
      hecho()
    } // callback()
  ) // .get
}) // it

}) // describe
