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
// ....................................................
it( "GET /persona/2001N responde el DNI de Emilio Esteve", function( hecho ) {
  request.get(
    { url : IP_PUERTO+"/persona/2001N", headers : { 'User-Agent' : 'jordi' }},
    function( err, respuesta, carga ) {
      var json = JSON.parse(carga);
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( json[0].dni, "2001N", "¿El dni es el de Emilio?" )
      hecho()
    } // callback()
  ) // .get
}) // it

it( "GET /asignatura/80 responde Biología", function( hecho ) {
  request.get(
    { url : IP_PUERTO+"/asignatura/80", headers : { 'User-Agent' : 'jordi' }},
    function( err, respuesta, carga ) {
      var json = JSON.parse(carga);
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( json[0].nombre, "Biologia", "¿El dni es el de Emilio?" )
      hecho()
    } // callback()
  ) // .get
}) // it

it( "GET /nombreAsignaturas/2001N responde el nombre de las asignaturas que esta matriculado 2001N", function( hecho ) {
  request.get(
    { url : IP_PUERTO+"/nombreAsignaturas/2001N", headers : { 'User-Agent' : 'jordi' }},
    function( err, respuesta, carga ) {
      var json = JSON.parse(carga);
      assert.equal( err, null, "¿ha habido un error?" )
      assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
      assert.equal( json[0][0].nombre, "Programacion2", "¿El dni es el de Emilio?" )
      hecho()
    } // callback()
  ) // .get
}) // it

it( "probar POST /insertarPersona", function( hecho ) {
  var datosPersona = { dni : "1234A", nombre : "Pepe", apellidos : "García Pérez"
  }
  request.post(
    { url : IP_PUERTO+"/insertarPersona",
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

it( "probar POST /insertarAsignatura", function( hecho ) {
  var datosAsignatura = { nombre : "Mates", codigo : "20" }
  request.post(
    { url : IP_PUERTO+"/insertarAsignatura",
    headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
    body : JSON.stringify( datosAsignatura )
  },
  function( err, respuesta, carga ) {
    assert.equal( err, null, "¿ha habido un error?" )
    assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
    assert.equal( carga, "OK", "¿La carga no es OK" )
    hecho()
  } // callback
  ) // .post
}) // it

it( "probar POST /hacerMatricula", function( hecho ) {
  var datosMatricula = { dni : "1234A", codigo : "20" }
  request.post(
    { url : IP_PUERTO+"/hacerMatricula",
    headers : { 'User-Agent' : 'jordi', 'Content-Type' : 'application/json' },
    body : JSON.stringify( datosMatricula )
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
