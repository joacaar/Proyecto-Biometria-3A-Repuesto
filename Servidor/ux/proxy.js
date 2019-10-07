
//var request = require ('request')
const IP_PUERTO="http://192.168.1.137:8080"

//module.exports =
class Proxy {

  constructor(){
    console.log("Soy un proxy")
  }

  insertarMedicion( mayorP, menorP, fechaP ){
      var data = {mayor: mayorP, menor: menorP, fecha: fechaP};

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


}
