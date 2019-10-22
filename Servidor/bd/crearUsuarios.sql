// Autor: Emilio Esteve Peiró
// Fecha de inicio: 23/10/2019
// Última actualización: 23/10/2019

create table Usuarios(
  idUsuario INTEGER not null,
  email TEXT not null,
  password TEXT not null,
  telefono TEXT not null,
  PRIMARY KEY (idUsuario)
);
