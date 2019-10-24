// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require( "sqlite3" )
// .....................................................................
// .....................................................................


module.exports = class Logica {


// .................................................................
// menorBD: Texto
// -->
// constructor () -->
// .................................................................
constructor( nombreBD, cb ) {
  this.laConexion = new sqlite3.Database(
    nombreBD,
    ( err ) => {
      if( ! err ) {
        this.laConexion.run( "PRAGMA foreign_keys = ON" )
      }
      cb( err )
    })
} // ()


// .................................................................
// menorTabla:Texto
// -->
// borrarFilasDe() -->
// .................................................................
borrarFilasDe( tabla ) {
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.run(
      "delete from " + tabla + ";",
      ( err )=> ( err ? rechazar( err ) : resolver( ) )
    )
  })
} // ()


// .................................................................
// borrarFilasDeTodasLasTablas() -->
// .................................................................
async borrarFilasDeTodasLasTablas() {
  await this.borrarFilasDe( "Medidas" )
  await this.borrarFilasDe( "Sensores" )
  await this.borrarFilasDe( "Usuarios" )
  await this.borrarFilasDe( "UsuarioSensor" )
  await this.borrarFilasDe( "TipoSensores" )
} // ()


// .................................................................
// datos:{mayor:entero, menor:entero: fecha:Texto}
// -->
// insertarMedicion() -->
// .................................................................
insertarMedida( datos ) {
  var textoSQL =
  'insert into Medidas values( $valorMedida, $tiempo, $latitud, $longitud, $idMedida, $idUsuario, $idTipoMedida );'
  var valoresParaSQL = {
    $valorMedida: datos.valorMedida, $tiempo: datos.tiempo, $latitud: datos.latitud,
    $longitud: datos.longitud, $idUsuario: datos.idUsuario,
    $idTipoMedida: datos.idTipoMedida, $idMedida: datos.idMedida
   }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
      ( err ? rechazar( err ) : resolver( ) )
    })
  })
} // ()

buscarMedidasPorIdMedida( idMedida ){
  var textoSQL = "select * from Medidas where idMedida=$idMedida";
  var valoresParaSQL = { $idMedida: idMedida }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        ( err ? rechazar( err ) : resolver( res ) )
      })
    })
}

buscarMedidasPorIdUsuario( idUsuario ){
  var textoSQL = "select * from Medidas where idUsuario=$idUsuario";
  var valoresParaSQL = { $idUsuario: idUsuario }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        ( err ? rechazar( err ) : resolver( res ) )
      })
    })
}

buscarUsuarioPorEmail( email ){
  var textoSQL = "select * from Usuarios where email=$email";
  var valoresParaSQL = { $email: email }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        ( err ? rechazar( err ) : resolver( res ) )
      })
    })
}

darAltaUsuario( datos ){
  var textoSQL =
  'insert into Usuarios values ( $email, $password, $idUsuario, $telefono );'
  var valoresParaSQL = {
     $idUsuario: datos.idUsuario, $email: datos.email, $password: datos.password, $telefono: datos.telefono
  }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
            ( err ? rechazar( err ) : resolver( ) )
    })
  })
}


// .................................................................
// cerrar() -->
// .................................................................
cerrar( ) {
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.close( ( err )=>{
      ( err ? rechazar(err) : resolver() )
    })
  })
  } // ()

} // class
// .....................................................................
// .....................................................................
