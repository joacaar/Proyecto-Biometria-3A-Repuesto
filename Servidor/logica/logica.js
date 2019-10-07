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
  'insert into Medicion values( $mayor, $menor, $fecha );'
  var valoresParaSQL = { $mayor: datos.mayor, $menor: datos.menor,
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
