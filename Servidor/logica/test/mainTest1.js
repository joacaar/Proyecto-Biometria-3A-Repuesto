// ........................................................
// mainTest1.js
// ........................................................

const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................

describe( "Test 1: insertar una Medición", function() {
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
  it( "Puedo insertar una Medición",
  async function() {
    // insertamos una Medición
    await laLogica.insertarMedicion(
      {mayor: 15, menor: 14,
      fecha: "14/9" } )
    // buscamos la Medición que hemos insertado
      var res = await laLogica.buscarMedicionesPorFecha( "14/9" )
    // miramos si los datos coinciden con los que nosotros hemos puesto
      assert.equal( res[0].mayor, 15 )
      assert.equal( res[0].menor, 14 )
  }) // it
// ....................................................
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
