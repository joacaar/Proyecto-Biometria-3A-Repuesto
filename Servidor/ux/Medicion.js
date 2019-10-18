// Autor: Emilio Esteve Peiro
// Fecha de inicio: 18/10/2019 . 21:00
// Última actualización: 18/10/2019 . 21:09
// Equipo 2

class Medicion{

    constructor( _medidaCO, _hora, _fecha, _latitud, _longitud ){

      this.medidaCO = _medidaCO;
      this.hora = _hora;
      this.fecha = _fecha;
      this.latitud = _latitud;
      this.longitud = _longitud;

    }

    constructor( eljson ){

      this.medidaCO = eljson.medidaCO;
      this.hora = eljson.hora;
      this.fecha = eljson.fecha;
      this.latitud = eljson.latitud;
      this.longitud = eljson.longitud;

    }

    getMedidaCO( ){ return this.medidaCO }

    getHora(){ return this.hora }

    getFecha(){ return this.fecha }

    getLatitud(){ return this.latitud }

    getLongitud(){ return this.longitud }

    setMedidaCO( _medidaCO ){ this.medidaCO = _medidaCO }

    setHora( _hora ){ this.hora = _hora }

    setFecha( _fecha ){ this.fecha = _fecha }

    setLatitud( _latitud ){ this.latitud = _latitud }

    setLongitud( _longitud ){ this.longitud = _longitud }

}
