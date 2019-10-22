create table UsuarioSensor(
  idUsuario INTEGER not null,
  idSensor INTEGER not null,
  FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
  FOREIGN KEY (idSensor) REFERENCES Sensores(idSensor)
);
