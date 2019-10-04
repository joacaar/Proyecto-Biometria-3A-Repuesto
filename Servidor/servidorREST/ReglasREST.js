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
servidorExpress.get('/persona/:dni',
  async function( peticion, respuesta ){
    console.log( " * GET /persona " )
    // averiguo el dni
    var dni = peticion.params.dni
    // llamo a la función adecuada de la lógica
    var res = await laLogica.buscarPersonaConDNI( dni )
    // si el array de resultados no tiene una casilla ...
    if( res.length != 1 ) {
      // 404: not found
      respuesta.status(404).send( "no encontré dni: " + dni )
      return
    }
    // todo ok
    respuesta.send( JSON.stringify( res ) )
  }) // get /persona

// .......................................................
// GET /asignatura/<codigo>
// .......................................................
servidorExpress.get('/asignatura/:codigo',
  async function( peticion, respuesta ){
    console.log( " * GET /asignatura " )
    // averiguo el dni
    var codigo = peticion.params.codigo
    // llamo a la función adecuada de la lógica
    var res = await laLogica.buscarAsignaturaConCodigo(codigo);
    // si el array de resultados no tiene una casilla ...
    if( res.length != 1 ) {
      // 404: not found
      respuesta.status(404).send( "no encontré código: " + código )
      return
    }
    // todo ok
    respuesta.send( JSON.stringify( res ) )
  }) // get /asignatura

  servidorExpress.get('/nombreAsignaturas/:dni',
    async function( peticion, respuesta ){
      console.log( " * GET /codigos " )
      // averiguo el dni
      var dni = peticion.params.dni
      // llamo a la función adecuada de la lógica
      var res = await laLogica.buscarCodigosPorDni(dni);
      var res2 = [];
      for( let i = 0; i < res.length; i++ ){
          var a = await laLogica.buscarAsignaturaConCodigo(res[i].codigo);
          res2.push(a);
      }

      console.log(res2[0][0].nombre)

      // si el array de resultados no tiene una casilla ...
      if( res.length < 1 ) {
        // 404: not found
        respuesta.status(404).send( "no encontré codigos con dni: " + dni )
        return
      }
      // todo ok
      respuesta.send( JSON.stringify( res2 ) )
    }) // get /persona

servidorExpress.post('/insertarPersona',
  async function( peticion, respuesta ){
    console.log( " * POST /insertarPersona " )
    var datos = JSON.parse( peticion.body )
    console.log( datos.dni )
    console.log( datos.nombre )
    console.log( datos.apellidos )
    // supuesto procesamiento

    laLogica.insertarPersona(datos);

    var res = await laLogica.buscarPersonaConDNI(datos.dni);

    if(res.length < 1){
      // 404 = not found
      respuesta.status( 404 ).send( "no acertaste con el dni" )
    }

    respuesta.send( "OK" );
  }) // post / insertarPersona

  servidorExpress.post('/insertarAsignatura',
    async function( peticion, respuesta ){
      console.log( " * POST /insertarAsignatura " )
      var datos = JSON.parse( peticion.body )
      // supuesto procesamiento

      laLogica.insertarAsignatura(datos);

      var res = await laLogica.buscarAsignaturaConCodigo(datos.codigo);

      if(res.length < 1){
        // 404 = not found
        respuesta.status( 404 ).send( "no acertaste con el dni" )
      }

      respuesta.send( "OK" );
    }) // post / insertarAsignatura

    servidorExpress.post('/hacerMatricula',
      async function( peticion, respuesta ){
        console.log( " * POST /hacerMatricula " )
        var datos = JSON.parse( peticion.body )
        console.log( datos.dni )
        console.log( datos.codigo )
        // supuesto procesamiento

        laLogica.hacerMatricula(datos);

        var res = await laLogica.buscarMatricula(datos.dni);

        if(res.length < 1){
          // 404 = not found
          respuesta.status( 404 ).send( "no acertaste con el dni" )
        }

        respuesta.send( "OK" );
      }) // post / hacerMatricula

      servidorExpress.get('/ux/:plana', function( peticion, respuesta ){
          console.log( " servint html normal: " + peticion.params.plana )

          var dir = 'C:/Users/EMILIO/Desktop/GTI/progr/javascript/prac6/ux/'
          respuesta.sendfile( dir + peticion.params.plana);
      });

} // cargar()

// .....................................................................
// .....................................................................
