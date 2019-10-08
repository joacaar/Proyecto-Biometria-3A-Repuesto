class SensorCO
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
    double factorCalibracion;

    //Funciones privada del la clase

    //-------------------------
    //    cacharroDimeloTodo()
    //              ->Z, Texto, Texto
    //-------------------------
    void cacharroDimeloTodo()
    {
      medida = random(0, 10) + factorCalibracion;
      hora = random(0, 24);
      fecha = "2019/10/06";
    }

    //-------------------------------------
    //-------------------------------------

  public:

    //--------------------------
    //    constructor()
    //--------------------------
    SensorCO (double factor)
    {
      tx = 3;
      rx = 2;
      setFactorCalibracion(factor);
    }

    //--------------------------
    //    medirCO()
    //          ->R
    //--------------------------
    int medirCO()
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
