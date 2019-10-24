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
// GET /medidaPorIdMedida/<idMedida>
// .......................................................
//
servidorExpress.get('/medidaPorIdMedida/:idMedida',
  async function( peticion, respuesta ){
    console.log( " * GET /medicion " )
    // averiguo la fecha
    var idMedida = peticion.params.idMedida
    // llamo a la función adecuada de la lógica
    var res = await laLogica.buscarMedidasPorIdMedida( idMedida )
    // si no hay resultados...
    if( res.length == 0 ) {
      // 404: not found
      respuesta.status(404).send( "no encontré medidas con esa id " + idMedida )
      return
    }
    // todo ok
    respuesta.send( JSON.stringify( res ) )
  }) // get /medida/<idMedida>

  // .......................................................
  // GET /medidasPorIdUsuario/<idMedida>
  // .......................................................
  //
  servidorExpress.get('/medidasPorIdUsuario/:idUsuario',
    async function( peticion, respuesta ){
      console.log( " * GET /medicion " )
      // averiguo la fecha
      var idUsuario = peticion.params.idUsuario
      // llamo a la función adecuada de la lógica
      var res = await laLogica.buscarMedidasPorIdUsuario( idUsuario )
      // si no hay resultados...
      if( res.length == 0 ) {
        // 404: not found
        respuesta.status(404).send( "no encontré medidas con esa id " + idMedida )
        return
      }
      // todo ok
      respuesta.send( JSON.stringify( res ) )
    }) // get /medida/<idMedida>

    // .......................................................
    // GET /medidasPorIdUsuario/<idMedida>
    // .......................................................
    //
    servidorExpress.get('/ultimaMedida/:idUsuario',
      async function( peticion, respuesta ){
        console.log( " * GET /medicion " )
        // averiguo la fecha
        var idUsuario = peticion.params.idUsuario
        // llamo a la función adecuada de la lógica
        var res = await laLogica.getUltimaMedidaDeUnUsuario( idUsuario )
        // si no hay resultados...
        if( res.length == 0 ) {
          // 404: not found
          respuesta.status(404).send( "no encontré medidas con esa id " + idMedida )
          return
        }
        // todo ok
        respuesta.send( JSON.stringify( res ) )
      }) // get /medida/<idMedida>


    //-----------------------------------------------------------------------------
    // POST /insertarMedida
    // peticion.body --> JSON
    // al llamarlo deberemos insertar un JSON en el body para que lo pueda procesar.
    //-----------------------------------------------------------------------------
    servidorExpress.post('/insertarMedida',
      async function( peticion, respuesta ){
        console.log( " * POST /insertarMedida " )
        var datos = JSON.parse( peticion.body )
        // supuesto procesamiento
	      console.log(peticion.body);

        // llamamos al método de la lógica que se encarga de insertar medida
        laLogica.insertarMedida(datos);

        // enviarmos una respuesta que demuestra que todo ha salido correctamente
        respuesta.send( "OK" );
	      console.log("Peticion POST insertarMedida recibida");
    }) // post / insertarPersona

    //-----------------------------------------------------------------------------
    // POST /insertarMedida
    // peticion.body --> JSON
    // al llamarlo deberemos insertar un JSON en el body para que lo pueda procesar.
    //-----------------------------------------------------------------------------
    servidorExpress.post('/borrarFilasDe/:tabla',
      async function( peticion, respuesta ){

        var tabla = peticion.params.tabla;

        await laLogica.borrarFilasDe(tabla);

        respuesta.send("OK")

    }) // post / insertarPersona

  //-----------------------------------------------------------------------------
  // GET /ux/<pagina>
  //-----------------------------------------------------------------------------
  servidorExpress.get('/ux/:pagina', function( peticion, respuesta ){
      console.log( " servint html normal: " + peticion.params.plana )

      var dir = 'C:/Users/EMILIO/Documents/GitHub/Proyecto-Biometria-3A/Servidor/ux/'
      respuesta.sendFile( dir + peticion.params.pagina);
  });

} // cargar()

// .....................................................................
// .....................................................................
