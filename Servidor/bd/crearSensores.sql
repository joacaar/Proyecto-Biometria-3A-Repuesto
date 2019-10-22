create table Sensores(
  idSensor INTEGER not null,
  idTipoMedida INTEGER not null,
  FOREIGN KEY (idTipoMedida) REFERENCES TipoSensores(idTipoMedida),
  PRIMARY KEY (idSensor)
);
