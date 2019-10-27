package com.example.envirometrics;

import android.content.Context;
import android.util.Log;

import com.android.volley.NetworkResponse;
import com.android.volley.Response;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class LogicaFake {

    private PeticionarioREST elPeticionario;
    String laUrlDelServidor = "http://192.168.1.15:8080/";
    private int statusCode;

    LogicaFake(Context elContexto){

    elPeticionario = new PeticionarioREST(laUrlDelServidor, elContexto);

    }

    //Metodo encargado de pasar la informacion que recibe a un json y enviarla al servidor
    void anunciarCO( Medicion medicion){

        Map<String, String> params = new HashMap<String, String>();
        params.put("medidaCO", String.valueOf(medicion.getMedidaCO()));
        params.put("hora", medicion.getHora());
        params.put("fecha", medicion.getFecha());
        params.put("latitud", String.valueOf(medicion.getLatitud()));
        params.put("longitud", String.valueOf(medicion.getLongitud()));

        JSONObject eljson = new JSONObject(params);
        elPeticionario.postJSONHTTP("insertarMedicion", eljson);

        Log.e("--- Server ---", "post enviado");
    }

    void darAltaUsuario(Usuario usuario){
        Map<String, String> params = new HashMap<String, String>();
        params.put("email", usuario.getEmail());
        params.put("password", usuario.getPassword());
        params.put("telefono", usuario.getTelefono());

        JSONObject eljson = new JSONObject(params);
        elPeticionario.postDarAltaUsuario("darAltaUsuario", eljson);

        Log.e("--- Server ---", "post enviado: Dar alta usuario");
    }



    //Metodo para imlementar el metodo anterior en un boton
    void anunciarCOClickBoton(Medicion medicion){
        this.anunciarCO(medicion);
    }

}