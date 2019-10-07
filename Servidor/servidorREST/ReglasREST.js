// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function( servidorExpress, laLogica ) {
// .......................................................
// GET /prueba
// .......................................................
servidorExpress.get('/prueba', function( peticion, respuesta ){
  console.log( " * GET /prueba " )
  respuesta.send( "¡Funciona!" )
}) // get /prueba

// .......................................................
// GET /persona/<dni>
// .......................................................
//
servidorExpress.get('/medicion/:fecha',
  async function( peticion, respuesta ){
    console.log( " * GET /medicion " )
    // averiguo el dni
    var fecha = peticion.params.fecha
    // llamo a la función adecuada de la lógica
    var res = await laLogica.buscarMedicionesPorFecha( fecha )
    // si el array de resultados no tiene una casilla ...
    if( res.length <= 1 ) {
      // 404: not found
      respuesta.status(404).send( "no encontré mediciones realizadas en esta fecha: " + fecha )
      return
    }
    // todo ok
    respuesta.send( JSON.stringify( res ) )
  }) // get /persona

//-----------------------------------------------------------------------------
// POST /insertarMedicion
// peticion.body --> JSON
// al llamarlo deberemos insertar un JSON en el body para que lo pueda procesar.
//-----------------------------------------------------------------------------
servidorExpress.post('/insertarMedicion',
  async function( peticion, respuesta ){
    console.log( " * POST /insertarMedicion " )
    var datos = JSON.parse( peticion.body )
    console.log( datos.mayor )
    console.log( datos.menor )
    console.log( datos.fecha )
    // supuesto procesamiento

    laLogica.insertarMedicion(datos);

    respuesta.send( "OK" );
  }) // post / insertarPersona



  servidorExpress.get('/ux/:plana', function( peticion, respuesta ){
      console.log( " servint html normal: " + peticion.params.plana )

      var dir = 'C:/Users/EMILIO/Desktop/GTI/progr/javascript/prac6/ux/'
      respuesta.sendfile( dir + peticion.params.plana);
  });

} // cargar()

// .....................................................................
// .....................................................................
