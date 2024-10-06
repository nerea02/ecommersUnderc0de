CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE Niveles (
  IdNivel int PRIMARY KEY AUTO_INCREMENT,
  Descripcion varchar(200) NOT NULL
);

CREATE TABLE Sexo (
  IdSexo int PRIMARY KEY AUTO_INCREMENT,
  Descripcion varchar(200) NOT NULL
);

CREATE TABLE Clientes (
  IdCliente int PRIMARY KEY AUTO_INCREMENT,
  IdSexo int,
  IdNivel int,
  FOREIGN KEY(IdSexo) REFERENCES Sexo(IdSexo) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdNivel) REFERENCES Niveles(IdNivel) ON DELETE CASCADE ON UPDATE CASCADE,
  Estado boolean,
  DNI int UNIQUE,
  Nombre varchar(50),
  Apellido varchar(50),
  Email varchar(100),
  Tel varchar(30),
  Fecha datetime DEFAULT CURRENT_TIMESTAMP,
  Contraseña varchar(50)
);

CREATE TABLE MetodoPago (
  IdMetodoPago int PRIMARY KEY AUTO_INCREMENT,
  Descripcion varchar(200) NOT NULL
);

CREATE TABLE Reintegro (
  IdReintegro int PRIMARY KEY AUTO_INCREMENT,
  Fecha datetime DEFAULT CURRENT_TIMESTAMP,
  Estado boolean
);

CREATE TABLE Categorias (
  IdCategoria int PRIMARY KEY AUTO_INCREMENT,
  Descripcion varchar(200) NOT NULL
);

CREATE TABLE CalificacionPorProducto (
  IdCalificacionProducto int PRIMARY KEY AUTO_INCREMENT,
  IdProducto int,
  Calificacion int
);

CREATE TABLE Talle (
  IdTalle int PRIMARY KEY AUTO_INCREMENT,
  Talle varchar(10)
);

CREATE TABLE Colores (
  IdColor int PRIMARY KEY AUTO_INCREMENT,
  Color varchar(15)
);

CREATE TABLE Historial (
  IdHistorial int PRIMARY KEY AUTO_INCREMENT,
  IdCliente int,
  IdReintegro int,
  Fecha datetime DEFAULT CURRENT_TIMESTAMP,
  IdMetodoPago int,
  FOREIGN KEY(IdCliente) REFERENCES Clientes(IdCliente) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdReintegro) REFERENCES Reintegro(IdReintegro) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdMetodoPago) REFERENCES MetodoPago(IdMetodoPago) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ProductosPorVentas (
  IdProductosPorVenta int PRIMARY KEY AUTO_INCREMENT,
  IdHistorial int,
  IdVariante int,
  Cantidad int,
  Precio decimal,
  FOREIGN KEY(IdHistorial) REFERENCES Historial(IdHistorial) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Productos (
  IdProducto int PRIMARY KEY AUTO_INCREMENT,
  IdCategoria int,
  IdCalificacionProducto int,
  Estado boolean,
  Nombre varchar(200),
  Descripcion varchar(200),
  Precio decimal,
  FOREIGN KEY(IdCategoria) REFERENCES Categorias(IdCategoria) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdCalificacionProducto) REFERENCES CalificacionPorProducto(IdCalificacionProducto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE VariantesProductos (
  IdVariante int PRIMARY KEY AUTO_INCREMENT,
  IdTalle int,
  IdProducto int,
  IdColor int,
  Cantidad int,
  FOREIGN KEY(IdTalle) REFERENCES Talle(IdTalle) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdProducto) REFERENCES Productos(IdProducto) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdColor) REFERENCES Colores(IdColor) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Usuario (
  IdUsuario int PRIMARY KEY AUTO_INCREMENT,
  Nombre varchar(200),
  Apellido varchar(200),
  Dni tinyint,
  Usuario varchar(200),
  Contraseña varchar(200)
);