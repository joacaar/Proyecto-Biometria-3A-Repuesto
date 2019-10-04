// ........................................................
// mainTest1.js
// ........................................................

const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................

describe( "Test 2: insertar una asignatura", function() {
// ....................................................
// ....................................................
  var laLogica = null
// ....................................................
// ....................................................
  it( "conectar a la base de datos", function( hecho ) {
    laLogica = new Logica(
      "../bd/datos.bd",
      function( err ) {
        if ( err ) {
          throw new Error ("No he podido conectar con datos.db")
        }
        hecho()
      })
    }) // it
// ....................................................
// ....................................................
  it( "borrar todas las filas", async function() {
    await laLogica.borrarFilasDeTodasLasTablas()
  }) // it
// ....................................................
// ....................................................
  it( "puedo insertar una asignatura",
  async function() {
    await laLogica.insertarAsignatura(
      {nombre: "Programacion2", codigo: "13929" } )
      var res = await laLogica.buscarAsignaturaConCodigo( "13929" )
      assert.equal( res.length, 1, "¿no hay un resulado?" )
      assert.equal( res[0].nombre, "Programacion2", "¿no es Programacion2?" )
      assert.equal( res[0].codigo, "13929", "¿no es 13929?" )
  }) // it

// ....................................................
  it( "cerrar conexión a la base de datos",
  async function() {
    try {
      await laLogica.cerrar()
    } catch( err ) {
      // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
      throw new Error( "cerrar conexión a BD fallada: " + err)
    }
  }) // it
}) // describe
