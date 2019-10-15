package com.example.envirometrics;

import android.os.Build;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

import androidx.annotation.RequiresApi;

public class Medicion {

    private String hora;
    private String fecha;
    private int medidaCO;

    //-----------------------------------
    // Z, Texto, Texto --> Medicion()
    //-----------------------------------
    public Medicion( int _medidaCO, String _hora, String _fecha ){

        this.medidaCO = _medidaCO;
        this.hora = _hora;
        this.fecha = _fecha;

    }

    //-----------------------------------
    // setFecha() --> Z
    //-----------------------------------
    public int getMedidaCO() {
        return medidaCO;
    }

    //-----------------------------------
    // averiguarFecha() --> Texto
    //-----------------------------------
    public String averiguarFecha(){

        Calendar calendario = Calendar.getInstance();
        int dia = calendario.get(Calendar.DATE);
        int mes = calendario.get(Calendar.MONTH);
        int any = calendario.get(Calendar.YEAR);
        String lafecha = dia + ":" + mes + ":" + any;
        return lafecha;

    }

    //-----------------------------------
    // averiguarHora() --> Texto
    //-----------------------------------
    public String averiguarHora(){

        Calendar calendario = Calendar.getInstance();
        int hora = calendario.get(Calendar.HOUR_OF_DAY);
        int minutos = calendario.get(Calendar.MINUTE);
        String tiempo = hora + ":" + minutos;
        return tiempo;

    }

    //-----------------------------------
    // getHora() --> Texto
    //-----------------------------------
    public String getHora() {
        return hora;
    }

    //-----------------------------------
    // getFecha() --> Texto
    //-----------------------------------
    public String getFecha() {
        return fecha;
    }

    //-----------------------------------
    // Texto --> setFecha()
    //-----------------------------------
    public void setHora(String hora) {
        this.hora = hora;
    }

    //-----------------------------------
    // Z --> setMedidaCO()
    //-----------------------------------
    public void setMedidaCO(int medidaCO) {
        this.medidaCO = medidaCO;
    }

    //-----------------------------------
    // Texto --> setFecha()
    //-----------------------------------
    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
}
