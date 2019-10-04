
//var request = require ('request')
const IP_PUERTO="http://localhost:8080"

//module.exports =
class Proxy {

  constructor(){
    console.log("Soy un proxy")
  }

  async insertarPersonaPr( dniP, nombreP, apellidosP ){
      var data = {dni: dniP, nombre: nombreP, apellidos: apellidosP};

      fetch(IP_PUERTO+"/insertarPersona", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
         'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
      }
    }).then( (res) =>{
      console.log(res)
    })
  }

  async insertarAsignaturaPr( nombreA, codigoA ){
      var data = {nombre: nombreA, codigo: codigoA};

      fetch(IP_PUERTO+"/insertarAsignatura", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
         'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
      }
    }).then( (res) =>{
      console.log(res)
    })
  }

  async hacerMatriculaPr( dniM, codigoM ){
      var data = { dni : dniM, codigo : codigoM }
      fetch(IP_PUERTO+"/hacerMatricula", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
      }
    }).then( (res) =>{
      console.log(res)
    })
  }

  async getPersonaPorDniPr( dniP ){

    var myInit = { method: 'GET',
                   headers: {
                     'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
                   },
                   mode: 'cors',
                   cache: 'default' };

    //var myRequest = new Request(IP_PUERTO+"/persona/" + dniP, myInit);

    fetch(IP_PUERTO+"/persona/" + dniP, myInit)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data[0].nombre)
    })

  }

  async getPersonaPorDniPr( dni ){

    var myInit = { method: 'GET',
                   headers: {
                     'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
                   },
                   mode: 'cors',
                   cache: 'default' };


    fetch(IP_PUERTO+"/persona/" + dni, myInit)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data[0].nombre)
      document.getElementById('apellidosGP').value = data[0].apellidos;
      document.getElementById('nombreGP').value = data[0].nombre;
    })

  }

  async getAsignaturaPorCodigoPr( codigo ){

    var myInit = { method: 'GET',
                   headers: {
                     'User-Agent' : 'jordi', 'Content-Type' : 'application/json'
                   },
                   mode: 'cors',
                   cache: 'default' };


    fetch(IP_PUERTO+"/asignatura/" + codigo, myInit)
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data[0].nombre)
      document.getElementById('nombreAP').value = data[0].nombre;
    })

  }

}
