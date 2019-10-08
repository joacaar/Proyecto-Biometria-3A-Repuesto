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
  it( "Puedo insertar y buscar una Medición",
  async function() {
    // insertamos una Medición
    await laLogica.insertarMedicion({
      medidaCO: 15, hora: "15:00",
      fecha: "14:9"
    })
    // probamos buscarMedicionesPorFecha
      var res = await laLogica.buscarMedicionesPorFecha( "14:9" )
    // miramos si los datos coinciden con los que nosotros hemos puesto
      assert.equal( res[0].medidaCO, 15 )
      assert.equal( res[0].hora, "15:00" )
    // probamos buscarMedicionesPorFechaYHora
      var res2 = await laLogica.buscarMedicionesPorFechaYHora({
        fecha: "14:9", hora: "15:00"
      })
    //miramos si los datos coinciden con los que nosotros hemos puesto
      assert.equal( res2[0].medidaCO, 15);
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
