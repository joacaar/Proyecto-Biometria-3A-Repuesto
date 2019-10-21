
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
// valor:R -> insertarMedicionCO() ->
//----------------------------------------------------------------------------
  insertarMedicionCO( datos ){

      var data = {
        medidaCO: datos.medidaCO,
        hora: datos.hora,
        fecha: datos.fecha,
        latitud : datos.latitud,
        longitud : datos.longitud
      };

      fetch(IP_PUERTO+"/insertarMedicion", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
         'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
      }
    }).then( (res) =>{
      console.log(res)
    })

  }

  //----------------------------------------------------------------------------
  // Texto --> getMedicionesPorFecha() --> JSON{ medidaCO: R, hora: Texto, fecha: Texto }
  //----------------------------------------------------------------------------
  getMedicionesPorFecha( fecha, callback ){

    var myInit = { method: 'GET',
                   headers: {
                     'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
                   },
                   mode: 'cors',
                   cache: 'default' };


    fetch(IP_PUERTO+"/medicion/" + fecha, myInit)
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
