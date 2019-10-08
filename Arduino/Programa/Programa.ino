#include "SensorCO.h"
#include "EmisoraBLE.h"

SensorCO sensorCO = SensorCO(4);
EmisoraBLE emisora = EmisoraBLE();


void setup() {
  // Inicio puerto serie
  Serial.begin(115200);
  while ( !Serial ) delay(10);

  emisora.inicializar();

}

void loop() {

  medirYPublicar();
  delay(5000);
}

//-------------------------
//    medirYPublicar()
//-------------------------
void medirYPublicar()
{
  //sensorCO.cacharroDimeloTodo();
  int medida = sensorCO.medirCO();
  emisora.anunciarCO(medida);
}
