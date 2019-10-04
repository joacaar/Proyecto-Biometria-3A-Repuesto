// ........................................................
// mainTest1.js
// ........................................................

const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................

describe( "Test 3: hacer matrícula", function() {
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
  it( "puedo hacer una matrícula",
    async function() {
      await laLogica.insertarAsignatura({
        nombre: "Programacion2", codigo: "56"
      });
      await laLogica.insertarPersona({
        dni: "2001N", nombre: "Emilio", apellidos: "Esteve"
      });

      await laLogica.hacerMatricula({
        dni: "2001N", codigo: "56"
      })

      var res = await laLogica.buscarMatricula("2001N");
      assert.equal(res[0].dni, "2001N", "El dni coincide");
      assert.equal(res[0].codigo, "56", "El codigo coincide");
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
