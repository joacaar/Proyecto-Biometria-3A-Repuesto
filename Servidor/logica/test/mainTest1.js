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
      "../bd/datos.db",
      function( err ) {
        if ( err ) {
          throw new Error ("No he podido conectar con datos.db")
        }
        hecho()
      })
    }) // it

// ....................................................
// ....................................................
  it( "Puedo dar de alta a un usuario",
   async function() {

     //DOY DE ALTA AL USUARIO
     await laLogica.darAltaUsuario({
       idUsuario: 15, email: "gg@gmail.com",
       password: "1234", telefono: "123456789"
     })

     //BUSCO AL USUARIO POR SU EMAIL
     var res = await laLogica.buscarUsuarioPorEmail("gg@gmail.com")

     // COMPRUEBO QUE ES ESE USUARIO
     assert.equal( res[0].idUsuario, 15, "El ID usuario es: " + res[0].idUsuario)

  }) // it
  
// ....................................................
// ....................................................
  it( "Puedo insertar y buscar una Medición",
  async function() {

    // INSERTAMOS UNA MEDIDA
    await laLogica.insertarMedida({
      valorMedida: 15, tiempo: 100,
      latitud: 0.0, longitud: 0.0,
      idUsuario: 1, idTipoMedida: 1,
      idMedida: 26
    })
    // BUSCAMOS LA MEDIDA POR SU ID
      var res = await laLogica.buscarMedidasPorIdMedida( 26 )

    // COMPROBAMOS QUE LA MEDIDA QUE BUSCAMOS ES LA QUE HEMOS INSERTADO
      assert.equal( res[0].valorMedida, 15 )
      assert.equal( res[0].tiempo, 100 )

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
