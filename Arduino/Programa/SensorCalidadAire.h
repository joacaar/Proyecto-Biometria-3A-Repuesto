//-----------------------------------
//   Autor: Adrián Heras Reche
//   Fecha: 07/10/2019
//   Última Actualización: 25/10/2019
//   SensorCalidadAire.h
//-----------------------------------

class SensorCalidadAire
{
    //-------------------------------------
    //-------------------------------------
  private:

    //variables privadas de la clase:
    //guardadas por el sensor
    long medida;
    String hora;
    String fecha;

    //Constructor de la clase
    int tx;
    int rx;
    double factorCalibracion;;

    //Funciones privada del la clase

    //-------------------------
    //    cacharroDimeloTodo()
    //              ->Z, Texto, Texto
    //-------------------------
    void cacharroDimeloTodo()
    {
      Serial.println(" ");
      Serial.println(" ");
      Serial.print("medida");
      //medida = random(0, 10) + factorCalibracion;
      //hora = random(0, 24);
      //fecha = "2019/10/06";

      Serial1.print('\r');
      String datos = Serial1.readStringUntil('\r');
      Serial.println(datos);
    }

    //-------------------------------------
    //-------------------------------------

  public:

    //--------------------------
    //    constructor()
    //--------------------------
    SensorCalidadAire (double factor)
    {
      tx = 17; //tx del sensor
      rx = 15; //rx del sensor
      //setFactorCalibracion(factor);

    }

    //--------------------------
    //    medirCalidadAire()
    //          ->R
    //--------------------------
    int medirCalidadAire()
    {
      cacharroDimeloTodo();
      return (*this).medida;
    }

    //--------------------------
    //    dimeHora()
    //          ->Texto
    //--------------------------
    String dimeHora()
    {
      cacharroDimeloTodo();
      return (*this).hora;
    }

    //--------------------------
    //    dimeFecha()
    //          ->Texto
    //--------------------------
    String dimeFecha()
    {
      cacharroDimeloTodo();
      return (*this).fecha;
    }

    //--------------------------
    // ->R
    //    setFactorCalibracion()
    //--------------------------
    void setFactorCalibracion(double factor)
    {
      (*this).factorCalibracion = factor;
    }
};
