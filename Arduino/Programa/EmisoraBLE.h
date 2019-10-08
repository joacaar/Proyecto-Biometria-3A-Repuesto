#include <bluefruit.h>

class EmisoraBLE
{
  private:

  public:

    EmisoraBLE()
    {

    }

    //-------------------------
    //    inicializar()
    //-------------------------
    void inicializar()
    {

      // Inicio bluefruit
      Bluefruit.begin();

      // Agregar nombre al beacon
      Bluefruit.setName("Beacon EQUIPO 2");
      Bluefruit.ScanResponse.addName();


      // para inicializar el advertising del beacon
      //Primero lo paramos
      Bluefruit.Advertising.stop();

      // Paquete Advertising
      Bluefruit.Advertising.addFlags(BLE_GAP_ADV_FLAGS_LE_ONLY_GENERAL_DISC_MODE);
      Bluefruit.Advertising.addTxPower();

      //Incluimos el nombre
      Bluefruit.Advertising.addName();

      //Creamos el BLEBeacon y le damos parametros por defecto
      (*this).cambiarBeacon(5, 15);

      Bluefruit.Advertising.restartOnDisconnect(true);
      Bluefruit.Advertising.setInterval(32, 244);    // en unidades de 0.625 ms
      Bluefruit.Advertising.setFastTimeout(30);      // número de segundos en modo rápido
      Bluefruit.Advertising.start(0);                // 0 = No pares tras n segundos
    }

    //-------------------------
    //   ->Z
    //    anunciarCO()
    //-------------------------
    void anunciarCO(int indiceCO)
    {
      Serial.println(indiceCO);
      cambiarBeacon(indiceCO, 4);
    }

    //-------------------------
    //   ->Z, Z
    //    cambiarBeacon()
    //-------------------------
    void cambiarBeacon( int major, int minor)
    {

      //Establecemos el UUID del beacon
      uint8_t beaconUUID[16] = {
        'E', 'P', 'S', 'G', '-', 'G', 'T', 'I',
        '-', 'P', 'R', 'O', 'Y', '-', 'E', '2'
      };
      //Inicializamos el Beacon
      BLEBeacon elBeacon( beaconUUID, major, minor, 73 ); // beaconUUID / major / minor / 73
      elBeacon.setManufacturer( 0x004c ); // ID manufactor
      Bluefruit.Advertising.setBeacon( elBeacon );
    }

};
