CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE Niveles (
  IdNivel int PRIMARY KEY AUTO_INCREMENT,
  Descripcion varchar(200) NOT NULL,
  Estado boolean DEFAULT true
  
);

CREATE TABLE Sexo (
  IdSexo int PRIMARY KEY AUTO_INCREMENT,
  Descripcion varchar(200) NOT NULL,
  Estado boolean DEFAULT true
);

CREATE TABLE Clientes (
  IdCliente int PRIMARY KEY AUTO_INCREMENT,
  IdSexo int,
  IdNivel int,
  FOREIGN KEY(IdSexo) REFERENCES Sexo(IdSexo) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdNivel) REFERENCES Niveles(IdNivel) ON DELETE CASCADE ON UPDATE CASCADE,
  DNI int UNIQUE,
  Nombre varchar(50),
  Apellido varchar(50),
  Email varchar(100),
  Tel varchar(30),
  Fecha datetime DEFAULT CURRENT_TIMESTAMP,
  Contraseña varchar(50),
  Estado boolean DEFAULT true
);

CREATE TABLE MetodoPago (
  IdMetodoPago int PRIMARY KEY AUTO_INCREMENT,
  Descripcion varchar(200) NOT NULL,
  Estado boolean DEFAULT true
);

CREATE TABLE Reintegro (
  IdReintegro int PRIMARY KEY AUTO_INCREMENT,
  Fecha datetime DEFAULT CURRENT_TIMESTAMP,
  Estado boolean DEFAULT true
);

CREATE TABLE Categorias (
  IdCategoria int PRIMARY KEY AUTO_INCREMENT,
  Descripcion varchar(200) NOT NULL,
  Estado boolean DEFAULT true
);



CREATE TABLE Talle (
  IdTalle int PRIMARY KEY AUTO_INCREMENT,
  Talle varchar(10),
  Estado boolean DEFAULT true
);

CREATE TABLE Colores (
  IdColor int PRIMARY KEY AUTO_INCREMENT,
  Color varchar(15),
  Estado boolean DEFAULT true
);

CREATE TABLE Historial (
  IdHistorial int PRIMARY KEY AUTO_INCREMENT,
  IdCliente int,
  IdReintegro int,
  Fecha datetime DEFAULT CURRENT_TIMESTAMP,
  IdMetodoPago int,
  Estado boolean DEFAULT true,
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
  Estado boolean DEFAULT true,
  FOREIGN KEY(IdHistorial) REFERENCES Historial(IdHistorial) ON DELETE CASCADE ON UPDATE CASCADE
);




CREATE TABLE Productos (
  IdProducto int PRIMARY KEY AUTO_INCREMENT,
  IdCategoria int,
  Nombre varchar(200),
  Descripcion varchar(200),
  Imagen varchar(300),
  Precio decimal,
  Estado boolean DEFAULT true,
  FOREIGN KEY(IdCategoria) REFERENCES Categorias(IdCategoria) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE CalificacionPorProducto (
  IdCalificacionProducto int PRIMARY KEY AUTO_INCREMENT,
  IdProducto int,
  Calificacion int,
  Estado boolean DEFAULT true,
  FOREIGN KEY(IdProducto) REFERENCES Productos(IdProducto) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE VariantesProductos (
  IdVariante int PRIMARY KEY AUTO_INCREMENT,
  IdTalle int,
  IdProducto int,
  IdColor int,
  Cantidad int,
  Estado boolean DEFAULT true,
  FOREIGN KEY(IdTalle) REFERENCES Talle(IdTalle) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdProducto) REFERENCES Productos(IdProducto) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(IdColor) REFERENCES Colores(IdColor) ON DELETE CASCADE ON UPDATE cascade
);

CREATE TABLE Usuario (
  IdUsuario int PRIMARY KEY AUTO_INCREMENT,
  Nombre varchar(200),
  Apellido varchar(200),
  Dni tinyint,
  Usuario varchar(200),
  Contraseña varchar(200),
  Estado boolean DEFAULT true
);


ALTER TABLE ProductosPorVentas
ADD CONSTRAINT FK_VariantesProductos
FOREIGN KEY (IdVariante) 
REFERENCES VariantesProductos(IdVariante) 
ON DELETE CASCADE 
ON UPDATE CASCADE;
