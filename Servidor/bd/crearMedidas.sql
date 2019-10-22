// Autor: Emilio Esteve Peiró
// Fecha de inicio: 23/10/2019
// Última actualización: 23/10/2019

create table Medidas(
  valorMedida REAL not null,
  tiempo INTEGER not null,
  longitud REAL not null,
  latitud REAL not null,
  idMedida INTEGER not null,
  idUsuario INTEGER not null,
  idTipoMedida INTEGER not null,
  FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
  FOREIGN KEY (idTipoMedida) REFERENCES TipoSensores(idTipoMedida),
  PRIMARY KEY (idMedida)
);
