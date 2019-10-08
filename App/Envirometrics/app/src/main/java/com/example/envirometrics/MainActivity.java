package com.example.envirometrics;

import androidx.appcompat.app.AppCompatActivity;

import android.bluetooth.BluetoothAdapter;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    public static int REQUEST_BLUETOOTH = 1;

    public BleDeviceScan myScan;
    private BluetoothAdapter bluetoothAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Log.e("--- DEBUG BT ---", "Inicio del programa");

        //Inicializamos el escaner
        myScan = new BleDeviceScan(this);
        myScan.borrar = 3;

        Log.e("--- DEBUG BT ---", "Inicializamos myScan");

        // Comprobamos que el dispositivo tenga el BT On.
        if(myScan.checkBleOn() != null) {
            startActivityForResult(myScan.checkBleOn(), REQUEST_BLUETOOTH);
        }

        //Cuando se pulsa el boton epieza a escanear llamando a la funcion startScan()
        Button scanBoton = findViewById(R.id.scan);
        scanBoton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Log.e("--- DEBUG BT ---", "Boton escanear pulsado");
                myScan.startScan();
                Log.e("--- DEBUG BT ---", "Despues de la llamada a startScan()");
                //new EscanerSegundoPlano().execute(myScan);//Ejecutamos la tarea asincrona para buscar dispositivos
                Log.e("--- DEBUG BT ---", "A ver cuando se ejecuta esto");
            }
        });

        //Cuando se pulsa el boton para de escanear llamando a la funcion stopScan()
        Button stopBoton = findViewById(R.id.stop);
        stopBoton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Log.d("---BT---", "Boton de stop pulsado");
                myScan.stopScan();
            }
        });
    }
}
