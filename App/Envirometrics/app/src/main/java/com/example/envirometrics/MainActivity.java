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

        //Inicializamos el escaner
        myScan = new BleDeviceScan(this);

        // Comprobamos que el dispositivo tenga el BT On.
        if(myScan.checkBleOn() != null) {
            startActivityForResult(myScan.checkBleOn(), REQUEST_BLUETOOTH);
        }

        //Cuando se pulsa el boton epieza a escanear llamando a la funcion startScan()
        Button scanBoton = findViewById(R.id.scan);
        scanBoton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Log.d("---BT---", "Boton de escaneo pulsado");
                startScan();
            }
        });

        //Cuando se pulsa el boton para de escanear llamando a la funcion stopScan()
        Button stopBoton = findViewById(R.id.stop);
        stopBoton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Log.d("---BT---", "Boton de stop pulsado");
                stopScan();
            }
        });
    }

    // Funcion que llama al metodo startScan del objeto myScan para que empieze a escanear
    public void startScan(){
        myScan.startScan();
    }

    // Funcion que llama al metodo stopScan para parar el escaneo
    public void stopScan(){
        myScan.stopScan();
    }
}
