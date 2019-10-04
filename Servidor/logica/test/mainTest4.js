/*select Persona.apellidos
from Persona, Matricula
where Matricula.codigo=’13928’ and Matricula.dni=Persona.dni;*/

// ........................................................
// mainTest1.js
// ........................................................

const Logica = require( "../Logica.js" )
var assert = require ('assert')

// ........................................................
// main ()
// ........................................................

describe( "Test 4: codigos por apellidos", function() {
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
  it( "puedo obtener los codigos a traves de apellidos",
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

      var dni = await laLogica.buscarDniPorApellidos("Esteve");

      var res = await laLogica.buscarCodigosPorDni(dni[0].dni);

      assert.equal(res[0].codigo, "56", "¿Es el código?");
  }) // it

  it( "puedo obtener los codigos a traves de apellidos directo",
    async function() {
      await laLogica.insertarAsignatura({
        nombre: "Biologia", codigo: "80"
      });
      await laLogica.insertarPersona({
        dni: "550B", nombre: "Maite", apellidos: "Peiro"
      });

      await laLogica.hacerMatricula({
        dni: "550B", codigo: "80"
      })

      var res = await laLogica.buscarCodigosPorApellidosDirecto("Peiro");

      assert.equal(res[0].codigo, "80", "¿Es el código?");
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
