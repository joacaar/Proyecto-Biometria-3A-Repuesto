
//var request = require ('request')
const IP_PUERTO="http://localhost:8080"

// --------------------------------------------------------------------------
//module.exports =
//---------------------------------------------------------------------------
class Proxy {

  // ------------------------------------------------------------------------
  // constructor()
  // -------------------------------------------------------------------------
  constructor(){
    console.log("Soy un proxy")
  }

  //---------------------------------------------------------------------------
  // datos:{valorMedida: R} -> insertarMedida() ->
  //----------------------------------------------------------------------------
  iniciarSesion( datos, callback ){

    var datosUsuario = {
      email: datos.email, password: datos.password
    }

      fetch(IP_PUERTO+"/iniciarSesion", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(datosUsuario), // data can be `string` or {object}!
      headers:{
         'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
      }
      }).then( (res) => {
        return res
      }).catch( (error) => {
        return error
      }).then(( response ) => {
        if(response.status == 200){
          callback(true)
        } else{
          callback(false)
        }
      })

    }

  //----------------------------------------------------------------------------
  // Texto --> getMedicionesPorFecha() --> JSON{ medidaCO: R, hora: Texto, fecha: Texto }
  //----------------------------------------------------------------------------
  getUltimaMedidaDeUnUsuario( idUsuario, callback ){

    var myInit = { method: 'GET',
                   headers: {
                     'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
                   },
                   mode: 'cors',
                   cache: 'default' };


    fetch(IP_PUERTO+"/ultimaMedida/" + idUsuario, myInit)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      callback(data);
    })

  }

//----------------------------------------------------------------------------
// JSON{ fecha: Texto, hora: Texto } --> getMedicionesPorFechaYHora()
// --> JSON{ medidaCO: R, hora: Texto, fecha: Texto }
//----------------------------------------------------------------------------
  /*getMedicionesPorFechaYHora( datos, callback ){

    var myInit = { method: 'GET',
                   headers: {
                     'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
                   },
                   mode: 'cors',
                   cache: 'default' };


    fetch(IP_PUERTO+"/medicion/" + datos.fecha + "/" + datos.hora, myInit)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      callback(data);
    })

  }*/


}
