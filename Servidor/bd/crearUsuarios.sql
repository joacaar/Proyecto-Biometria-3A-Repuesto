// Autor: Emilio Esteve Peir�
// Fecha de inicio: 23/10/2019
// �ltima actualizaci�n: 23/10/2019

create table Usuarios(
  idUsuario INTEGER not null,
  email TEXT not null,
  password TEXT not null,
  telefono TEXT not null,
  PRIMARY KEY (idUsuario)
);
