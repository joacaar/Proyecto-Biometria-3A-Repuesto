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
    var datosPersona = { mayor : 21, menor : 5, fecha : "14:15"
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

it( "GET /medicion/14:15 responde con la Medicion hecha en esa fecha", function( hecho ) {
  request.get(
    { url : IP_PUERTO+"/medicion/14:15", headers : { 'User-Agent' : 'jordi' }},
    function( err, respuesta, carga ) {
      var json = JSON.parse(carga);
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( json[0].mayor, 21, "¿El mayor es 21?" + json[0].mayor )
      hecho()
    } // callback()
  ) // .get
}) // it

}) // describe
