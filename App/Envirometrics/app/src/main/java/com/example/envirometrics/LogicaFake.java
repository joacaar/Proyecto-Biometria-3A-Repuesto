package com.example.envirometrics;

import android.content.Context;
import android.util.Log;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class LogicaFake {

    private PeticionarioREST elPeticionario;
    String laUrlDelServidor = "http://192.168.137.186:8080/";

    LogicaFake(Context elContexto){

    elPeticionario = new PeticionarioREST(laUrlDelServidor, elContexto);

    }

    void anunciarCO( int medidaCO, String hora, String fecha ){

        Map<String, String> params = new HashMap<String, String>();
        params.put("medidaCO", String.valueOf(medidaCO));
        params.put("hora", hora);
        params.put("fecha", fecha);

        JSONObject eljson = new JSONObject(params);
        elPeticionario.postJSONHTTP("insertarMedicion", eljson);

        Log.e("--- Server ---", "post enviado");
    }

    void anunciarCOClickBoton(int medidaCO, String hora, String fecha){
        this.anunciarCO(medidaCO, hora, fecha);
    }

}