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
describe( "Test 2 : Probamos insertar y buscar medidas", function() {

  // ....................................................
  // PROBAMOS POST /insertarMedicion
  // ....................................................

  it( "probar POST /insertarMedida", function( hecho ) {
    var datosMedida = {
      valorMedida : 74, tiempo : 350,
      latitud : 0.0, longitud: 0.0,
      idMedida: 99, idUsuario: 1,
      idTipoMedida: 1
    }
    request.post(
      { url : IP_PUERTO+"/insertarMedida",
      headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
      body : JSON.stringify( datosMedida )
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
// PROBAMOS GET /medidaPorIdMedida/<idMedida>
// ....................................................

it( "GET /medidaPorIdMedida/99 responde con la Medicion hecha en esa fecha", function( hecho ) {
  request.get(
    { url : IP_PUERTO+"/medidaPorIdMedida/99", headers : { 'User-Agent' : 'jordi' }},
    function( err, respuesta, carga ) {
      var json = JSON.parse(carga);
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( json[json.length - 1].valorMedida, 74, "¿La medida es 74?" + json[json.length - 1].valorMedida )
      hecho()
    } // callback()
  ) // .get
}) // it

// ....................................................
// PROBAMOS GET /medidasPorIdUsuario/<idUsuario>
// ....................................................

it( "GET /medidasPorIdUsuario/1 responde con la Medicion hecha en esa fecha", function( hecho ) {
  request.get(
    { url : IP_PUERTO+"/medidasPorIdUsuario/1", headers : { 'User-Agent' : 'jordi' }},
    function( err, respuesta, carga ) {
      var json = JSON.parse(carga);
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( json[json.length - 1].valorMedida, 74, "¿La medida es 74?" + json[0].valorMedida )
      hecho()
    } // callback()
  ) // .get
}) // it

}) // describe
