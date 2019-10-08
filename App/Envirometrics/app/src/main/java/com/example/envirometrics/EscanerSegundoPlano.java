package com.example.envirometrics;

import android.os.AsyncTask;
import android.util.Log;

public class EscanerSegundoPlano extends AsyncTask<BleDeviceScan, Void, TramaIBeacon> {
    @Override
    protected TramaIBeacon doInBackground(BleDeviceScan... voids) {

        BleDeviceScan myScan = voids[0];
        myScan.startScan();
        return myScan.getTrama();
    }

    @Override
    protected void onPostExecute(TramaIBeacon tramaResultado) {
        super.onPostExecute(tramaResultado);
        //TramaIBeacon tramaResultado = resultado.getTrama();

        Log.e("--- Major Bluetooth ---", "Major onPost: " + Utilidades.bytesToInt(tramaResultado.getMajor()));
        Log.e("--- Minor Bluetooth ---", "Minor onPost: " + Utilidades.bytesToInt(tramaResultado.getMinor()));
        //Ahora aqui tenemos la trama resultado, de aqui podemos llamar a otra tarea en segundo plano
        // para que envie los datos al servidor
    }
}
