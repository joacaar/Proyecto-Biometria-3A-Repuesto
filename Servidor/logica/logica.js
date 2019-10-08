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
  await this.borrarFilasDe( "Medicion" )
} // ()


// .................................................................
// datos:{mayor:entero, menor:entero: fecha:Texto}
// -->
// insertarMedicion() -->
// .................................................................
insertarMedicion( datos ) {
  var textoSQL =
  'insert into Medicion values( $medidaCO, $hora, $fecha );'
  var valoresParaSQL = { $medidaCO: datos.medidaCO, $hora: datos.hora,
    $fecha: datos.fecha }
    return new Promise( ( resolver, rechazar ) => {
      this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
        ( err ? rechazar( err ) : resolver( ) )
      })
    })
} // ()

buscarMedicionesPorFecha( fecha ){
  var textoSQL = "select * from Medicion where fecha=$fecha";
  var valoresParaSQL = { $fecha: fecha }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        ( err ? rechazar( err ) : resolver( res ) )
      })
    })
}

buscarMedicionesPorFechaYHora( datos ){
  var textoSQL = "select * from Medicion where fecha=$fecha and hora=$hora";
  var valoresParaSQL = { $fecha: datos.fecha, $hora: datos.hora }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        ( err ? rechazar( err ) : resolver( res ) )
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
