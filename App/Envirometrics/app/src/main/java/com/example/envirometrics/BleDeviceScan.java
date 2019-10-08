package com.example.envirometrics;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import java.util.ArrayList;

public class BleDeviceScan {

    private final BluetoothManager bluetoothManager;
    private BluetoothAdapter mBluetoothAdapter;
    private Context mContext;

    private ArrayList<BluetoothDevice> deviceList = new ArrayList<>();
    private ArrayList<String> macList = new ArrayList<>();

    // Stops scanning after 10 seconds.
    private static final long SCAN_PERIOD = 10000;

    private final String MI_UUID = "EPSG-GTI-PROY-E2";

    public BleDeviceScan(Context context_) {

        this.mContext = context_;
        //mHandler = new Handler();

        bluetoothManager = (BluetoothManager) mContext.getSystemService(Context.BLUETOOTH_SERVICE);
        mBluetoothAdapter = bluetoothManager.getAdapter();
    }

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
/*
    public void scanLeDevice(final boolean enable) {
        if (enable) {
            // Stops scanning after a pre-defined scan period.
            mHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    mScanning = false;
                    mBluetoothAdapter.stopLeScan(mLeScanCallback);
                }
            }, SCAN_PERIOD);
            mScanning = true;
            mBluetoothAdapter.startLeScan(mLeScanCallback);
        } else {
            mScanning = false;
            mBluetoothAdapter.stopLeScan(mLeScanCallback);
        }
    }
*/

    //Da comienzo el escaneo
    public void startScan(){
        Log.d("Comprobacion","dentro del metodo startScan de la clase BleDeviceScan");
        //ScanDevice();
        if(!mBluetoothAdapter.isDiscovering())
        mBluetoothAdapter.startLeScan(mLeScanCallback);
    }

    //Para el escaneo
    public void stopScan(){

        Log.d("Comprobacion","dentro del metodo stopScan de la clase BleDeviceScan");
        mBluetoothAdapter.stopLeScan(mLeScanCallback);
    }

    //----------------------------------------------------------------------------------------------
    // Funciones y metodos para la busqueda y filtrado de dispositivos BTLE
    //----------------------------------------------------------------------------------------------


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


    int contador = 0;

    // Device scan callback.
    private BluetoothAdapter.LeScanCallback mLeScanCallback =
            new BluetoothAdapter.LeScanCallback() {

                @Override
                public void onLeScan(final BluetoothDevice device, int rssi, byte[] scanRecord) {

                    TramaIBeacon laTrama = filtrarPorUUID(MI_UUID, scanRecord);

                    if(laTrama!= null) {
                        Log.e("--- Major Bluetooth ---", "Major: " + Utilidades.bytesToInt(laTrama.getMajor()));
                        Log.e("--- Minor Bluetooth ---", "Minor: " + Utilidades.bytesToInt(laTrama.getMinor()));
                        stopScan();
                    }

                }
            };
    /*
    cada vez que descubre un dispositivo ejecuta la fucnion onLeScan, la cual añade el dispositivo a una lista
    para posteriormente comprobar si el que encuentra ya esta en la lista y no repetir el procesa.

    Por ahora almacena la mac del dispositivo encontrado en otra lista para hacer un filtrado por mac

    Cuando encuentra el dispositivo deseado obtiene la trama.
     */



    /*
    Utilizando las siguientes funciones se necesita una API igual o superior a la 21
     */
/*
    public void ScanDevice (){
        Log.d("Debug", "Al inicio de la funcion ScanDevice");
        BluetoothLeScanner btScanner = mBluetoothAdapter.getBluetoothLeScanner(); //Necesita API min 21
        ScanFilter.Builder builder = new ScanFilter.Builder(); //creamos el filtro para que solo aparezcan los dispositivos con el uuid especificado

        Log.d("Debug", "Despues de crear el builder");

        UUID uuid = UUID.fromString("E2C56DB5-DFFB-48D2-B060-D0F5A71096E0"); //Especificamos el uuid
        ParcelUuid pUUid = new ParcelUuid(uuid);
        builder.setServiceUuid(pUUid);

        Log.d("Debug", "Punto 3");

        Vector<ScanFilter> filters = new Vector<ScanFilter>();//agrupamos los filtros para pasarlos como parametro en este tipo
        filters.add(builder.build());

        Log.d("Debug", "Punto 4");

        // Configuramos ciertos parametros de escaner
        ScanSettings.Builder builderScanSettings = new ScanSettings.Builder();
        builderScanSettings.setScanMode(ScanSettings.SCAN_MODE_LOW_POWER);
        builderScanSettings.setReportDelay(0);

        Log.d("Debug", "Punto 5");

        //Comenzamos a escanear
        btScanner.startScan(filters, builderScanSettings.build(), mScanCallback);
    }


    public ScanCallback mScanCallback = new ScanCallback(){
        @Override
        public void onScanResult(int callbackType, ScanResult result) {
            Log.d("Debug", "Al inicio del callback");
            super.onScanResult(callbackType, result);

            Log.e("---BT V.21---", result.toString());
        }

        @Override
        public void onScanFailed (int errorCode){
            super.onScanFailed(errorCode);
            Log.e("---BT Error---", String.valueOf(errorCode));
        }
    };
 */
}




