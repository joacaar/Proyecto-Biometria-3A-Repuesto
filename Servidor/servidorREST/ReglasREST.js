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
// GET /medicion/<fecha>
// .......................................................
//
servidorExpress.get('/medicion/:fecha',
  async function( peticion, respuesta ){
    console.log( " * GET /medicion " )
    // averiguo la fecha
    var fecha = peticion.params.fecha
    // llamo a la función adecuada de la lógica
    var res = await laLogica.buscarMedicionesPorFecha( fecha )
    // si no hay resultados...
    if( res.length == 0 ) {
      // 404: not found
      respuesta.status(404).send( "no encontré mediciones realizadas en esta fecha: " + fecha )
      return
    }
    // todo ok
    respuesta.send( JSON.stringify( res ) )
  }) // get /persona

  // .......................................................
  // GET /medicion/<fecha>/<hora>
  // .......................................................
  //
  servidorExpress.get('/medicion/:fecha/:hora',
    async function( peticion, respuesta ){
      console.log( " * GET /medicion " )
      // averiguo la fecha
      var _fecha = peticion.params.fecha
      var _hora = peticion.params.hora
      // formo el JSON con los datos
      var datos = {
        hora: _hora,
        fecha: _fecha
      }
      // llamo a la función adecuada de la lógica
      var res = await laLogica.buscarMedicionesPorFecha( datos )
      // si el array de resultados no tiene una casilla ...
      if( res.length == 0 ) {
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
    // supuesto procesamiento

    laLogica.insertarMedicion(datos);

    respuesta.send( "OK" );
  }) // post / insertarPersona



  servidorExpress.get('/ux/:plana', function( peticion, respuesta ){
      console.log( " servint html normal: " + peticion.params.plana )

      var dir = 'C:/Users/EMILIO/Documents/GitHub/Proyecto-Biometria-3A/Servidor/ux/'
      respuesta.sendFile( dir + peticion.params.plana);
  });

} // cargar()

// .....................................................................
// .....................................................................
