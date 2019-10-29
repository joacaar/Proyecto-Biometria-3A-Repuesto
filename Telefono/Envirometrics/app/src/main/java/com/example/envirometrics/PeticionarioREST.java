package com.example.envirometrics;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.Window;
import android.widget.TextView;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

import javax.security.auth.callback.Callback;


public class PeticionarioREST {

    //---------------------------------------------------------------------------------
    //variables PRIVADAS
    //---------------------------------------------------------------------------------
    private String url;
    private RequestQueue queue;

    //---------------------------------------------------------------------------------
    // Le pasamos la url del servidor que queramos conectarnos y un contexto ( MainActivity por ejemplo )
    // Texto, Context --> PeticionarioREST() --> (modifica los parámetros de dentro de la clase)
    //---------------------------------------------------------------------------------
    PeticionarioREST(String laUrl, Context context ){

        this.url = laUrl;
        queue = Volley.newRequestQueue( context );

    }

    //---------------------------------------------------------------------------------
    // Con este método podremos enviar un JSON por medio del protocolo HTTP al servidor
    // Texto, JSONObject --> postJSONHTTP()
    //---------------------------------------------------------------------------------
    public void postJSONHTTP(String paramsUrl, JSONObject elJson, final CallbackPet callbackPet){
        JsonObjectRequest jsonObjRequest = (JsonObjectRequest) new JsonObjectRequest
                (Request.Method.POST, url + paramsUrl, elJson, new Response.Listener<JSONObject>()
                {
                    @Override
                    public void onResponse(JSONObject response)
                    {
                        try {
                            String laRespuesta = response.get("laRespuesta").toString();
                            Log.d("Respuesta", laRespuesta);

                            Log.d("-----Res  String-----",laRespuesta);
                            callbackPet.callbackCall(laRespuesta);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },
                        new Response.ErrorListener()
                        {
                            @Override
                            public void onErrorResponse(VolleyError error)
                            {
                                Log.d("Error conectar servidor", error.toString());
                            }
                        }).setRetryPolicy(new DefaultRetryPolicy(5000,
                DefaultRetryPolicy.DEFAULT_MAX_RETRIES,
                DefaultRetryPolicy.DEFAULT_BACKOFF_MULT));

        // Add the request to the RequestQueue.
        queue.add(jsonObjRequest);
    }
}
