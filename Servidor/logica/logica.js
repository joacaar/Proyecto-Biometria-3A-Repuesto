// .....................................................................
// Autor: Emilio Esteve Peiró
// Fecha inicio: 24/10/2019
// Última actualización: 24/10/2019
// Logica.js
// .....................................................................
const sjcl = require('sjcl')
const sqlite3 = require( "sqlite3" )
/*const SimpleCrypto = require("simple-crypto-js").default;*/
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
// datos:{valorMedida:R, tiempo:N: latitud:R, longitud:R, idMedida:N, idUsuario:N, idTipoMedida:N}
// -->
// insertarMedida() -->
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

// .................................................................
// --> idMedida: N
// buscarMedidasPorIdMedida()
// --> [{valorMedida:R, tiempo:N: latitud:R, longitud:R, idMedida:N, idUsuario:N, idTipoMedida:N}]
// .................................................................
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

// .................................................................
// --> idUsuario: N
// buscarMedidasPorIdUsuario()
// --> [{valorMedida:R, tiempo:N: latitud:R, longitud:R, idMedida:N, idUsuario:N, idTipoMedida:N}]
// .................................................................
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

// .................................................................
// getUltimoIDUsuario()
// --> N
// .................................................................
getUltimoIDUsuario(){
  var textoSQL = "select * from Usuarios";
  var valoresParaSQL = {}
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        if( err ){
          rechazar(err)
        }
        if( res.length == 0 ){
          resolver(0)
        } else{
          resolver(res[res.length - 1].idUsuario)
        }
      })
    })
}

// .................................................................
// --> idUsuario: N
// getUltimaMedidaDeUnUsuario()
// --> {valorMedida:R, tiempo:N: latitud:R, longitud:R, idMedida:N, idUsuario:N, idTipoMedida:N}
// .................................................................
async getUltimaMedidaDeUnUsuario( idUsuario ){

  var res = await this.buscarMedidasPorIdUsuario( idUsuario );

  return new Promise( ( resolver, rechazar ) =>{
    if( res.length > 0 ){
      resolver( res[res.length - 1] )
    } else{
      rechazar( null )
    }
  })

}

// .................................................................
// --> email: Texto
// buscarMedidasPorIdUsuario()
// --> {email:Texto, telefono:Texto, password:Texto, idUsuario:Texto}
// .................................................................
buscarUsuarioPorEmail( email ){
  var textoSQL = "select * from Usuarios where email=$email";
  var valoresParaSQL = { $email: email }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        ( err ? rechazar( err ) : resolver( res[0] ) )
      })
    })
}

// .................................................................
// -->{email:Texto, telefono:Texto, password:Texto, idUsuario:Texto}
// darAltaUsuario()
// .................................................................
async darAltaUsuario( datos ){
  var textoSQL =
  'insert into Usuarios values ( $email, $password, $idUsuario, $telefono );'

  var res = await this.getUltimoIDUsuario();

  var res = await this.buscarUsuarioPorEmail(datos.email)

  // encriptamos la contraseña con el email.
  var laPasswordEncriptada = sjcl.encrypt(datos.email, datos.password)

  var valoresParaSQL = {
     $idUsuario: res + 1, $email: datos.email, $password: laPasswordEncriptada, $telefono: datos.telefono
  }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
        if( err ){
            rechazar(err)
        }
        if( res == undefined ){
          resolver()
        }
        else{
          resolver("Ya existe")
        }
    })
  })
}

// .................................................................
// -->{idUsuario:N, idSensor:N}
// darSensorAUsuario()
// .................................................................
darSensorAUsuario( datos ){
  var textoSQL =
  'insert into UsuarioSensor values ( $idUsuario, $idSensor );'
  var valoresParaSQL = {
     $idUsuario: datos.idUsuario, $idSensor: datos.idSensor
  }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
            ( err ? rechazar( err ) : resolver( ) )
    })
  })
}

// .................................................................
// -->{idTipoMedida:N, idSensor:N}
// insertarSensor()
// .................................................................
insertarSensor( datos ){
  var textoSQL =
  'insert into Sensores values ( $idTipoMedida, $idSensor );'
  var valoresParaSQL = {
      $idTipoMedida: datos.idTipoMedida, $idSensor: datos.idSensor
  }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
            ( err ? rechazar( err ) : resolver( ) )
    })
  })
}

// .................................................................
// -->{idTipoMedida:N, descripcion:Texto}
// insertarTipoSensor()
// .................................................................
insertarTipoSensor( datos ){
  var textoSQL =
  'insert into TipoSensores values ( $idTipoMedida, $descripcion );'
  var valoresParaSQL = {
      $idTipoMedida: datos.idTipoMedida, $descripcion: datos.descripcion
  }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
            ( err ? rechazar( err ) : resolver( ) )
    })
  })
}

// .................................................................
// --> idSensor:N
// getUsuarioQueTieneElSensor()
// --> {idSensor:N, idUsuario:N}
// .................................................................
getUsuarioQueTieneElSensor( idSensor ){
  var textoSQL = "select * from UsuarioSensor where idSensor=$idSensor";
  var valoresParaSQL = { $idSensor: idSensor }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        ( err ? rechazar( err ) : resolver( res[0] ) )
      })
    })
}

buscarSensor( idSensor ){
  var textoSQL = "select * from Sensores where idSensor=$idSensor";
  var valoresParaSQL = { $idSensor: idSensor }
  return new Promise( ( resolver, rechazar ) => {
    this.laConexion.all( textoSQL, valoresParaSQL,
      ( err, res ) => {
        ( err ? rechazar( err ) : resolver( res[0] ) )
      })
    })
}

// {email:Texto, password:Texto}
async iniciarSesion(datos){

  var res = await this.buscarUsuarioPorEmail(datos.email);

  return new Promise( ( resolver, rechazar ) => {

    try {
      if( sjcl.decrypt(datos.email, res.password) == datos.password ){
        resolver(true)
      }
    } catch (error) {
      resolver(false)
    }

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
