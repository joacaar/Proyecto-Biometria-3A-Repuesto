class SensorCO
{
    //-------------------------------------
    //-------------------------------------
  private:

    //variables privadas de la clase:
    //guardadas por el sensor
    double medida;
    String hora;
    String fecha;

    //Constructor de la clase
    int tx;
    int rx;
    double factorCalibracion;

    //Funciones privada del la clase
    //--------------------------
    //  cacharroDimeloTodo()
    //                  -> R, texto, texto
    //--------------------------
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
    SensorCO ()
    {
      tx = 3;
      rx = 2;
    }

    //--------------------------
    //    medirCO()
    //          ->R
    //--------------------------
    double medirCO()
    {
      return (*this).medida;
    }

    //--------------------------
    //    dimeHora()
    //          ->Texto
    //--------------------------
    String dimeHora()
    {
      return (*this).hora;
    }

    //--------------------------
    //    dimeFecha()
    //          ->Texto
    //--------------------------
    String dimeFecha()
    {
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
