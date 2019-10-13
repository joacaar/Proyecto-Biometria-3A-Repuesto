package com.example.envirometrics;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import java.util.ArrayList;
import java.util.Calendar;

import static android.content.Context.BLUETOOTH_SERVICE;

public class BleDeviceScan {

    private final BluetoothManager bluetoothManager;
    private BluetoothAdapter mBluetoothAdapter;
    private Context mContext;

    private TramaIBeacon laTrama;
    public int borrar;

    // Stops scanning after 10 seconds.
    private static final long SCAN_PERIOD = 10000;
    private final String MI_UUID = "EPSG-GTI-PROY-E2";
//    private final String MI_UUID = "EPSG-GTI-PROY-E2";

    //----------------------------------------------------------------------------------------------
    // Constructor
    //----------------------------------------------------------------------------------------------

    public BleDeviceScan(Context context_) {

        this.mContext = context_;
        //mHandler = new Handler();

        bluetoothManager = (BluetoothManager) mContext.getSystemService(BLUETOOTH_SERVICE);
        mBluetoothAdapter = bluetoothManager.getAdapter();
    }

    //----------------------------------------------------------------------------------------------
    // Metodos Getters and Setters
    //----------------------------------------------------------------------------------------------

    public TramaIBeacon getTrama (){
        return laTrama;
    }

    //----------------------------------------------------------------------------------------------
    // Funciones y metodos para la busqueda y filtrado de dispositivos BTLE
    //----------------------------------------------------------------------------------------------

    // Metodo que comprueba si el BT esta encendido y en el caso que no lo este devuelve un intent
    // para mostrar un activity para pedirle al usuario que lo encienda.
    //En el caso que este encendido devolvera null.
    public Intent checkBleOn() {

        if (!mBluetoothAdapter.isEnabled()) {
            Intent enableBT = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            return enableBT;
        }
        return null;
    }

    //Da comienzo el escaneo
    public void startScan(){
        Log.e("--- DEBUG BT ---", "DEntro de startScan()");
        //ScanDevice();
        //if(!mBluetoothAdapter.isDiscovering())
            mBluetoothAdapter.startLeScan(mLeScanCallback);
        Log.e("--- DEBUG BT ---", "DEspues de llamar al callback");
    }

    //Para el escaneo
    public void stopScan(){
        mBluetoothAdapter.stopLeScan(mLeScanCallback);
    }

    //Filtro para obtener el dispositivo deseado de entre todos los encontrados
    //UUID>>
    //ListaDIspositivosBT>> filtrarPorUUID >> DispositivoBT
    public TramaIBeacon filtrarPorUUID(String uuid, byte[] datos){
        TramaIBeacon laTrama = new TramaIBeacon(datos);
        if(uuid.equals(Utilidades.bytesToString(laTrama.getUUID()))){

            return laTrama;
        }
        return null;
    }

    //----------------------------------------------------------------------------------------------
    // Funciones callback
    //----------------------------------------------------------------------------------------------

    // Device scan callback.
    private BluetoothAdapter.LeScanCallback mLeScanCallback =
            new BluetoothAdapter.LeScanCallback() {

                @Override //cada vez que descubre un dispositivo ejecuta la fucnion onLeScan
                public void onLeScan(final BluetoothDevice device, int rssi, byte[] scanRecord) {
                    Log.e("--- DEBUG BT ---", "DEntro de onLeScan");
                    TramaIBeacon tramaAux = filtrarPorUUID(MI_UUID, scanRecord);
                    Log.e("--- DEBUG BT ---", "Despues de filtrar los dispositivos encontrados");

                    if(tramaAux!= null) {
                        Log.e("--- Major Bluetooth ---", "Major: " + Utilidades.bytesToInt(tramaAux.getMajor()));
                        Log.e("--- Minor Bluetooth ---", "Minor: " + Utilidades.bytesToInt(tramaAux.getMinor()));

                        LogicaFake myLogic = new LogicaFake(mContext); //Hacerlo variable privada de la clase y no llamar al constructor cada vez
                        Calendar cal = Calendar.getInstance();
                        myLogic.anunciarCO(Utilidades.bytesToInt(tramaAux.getMajor()), "11:10", "11:10:2019");
                        stopScan();
                    }
                }
            };
}




