create database ecommerce;

USE ecommerce;

create table Niveles (
IdNivel int primary key auto_increment,
Descripcion varchar(200) not null
)

create table Sexo (
IdSexo int primary key auto_increment,
Descripcion varchar(200) not null
)


create table Clientes (
IdCliente int primary key auto_increment,
IdSexo int,
IdNivel int,
foreign key(IdSexo) references sexo (IdSexo) ,
foreign key(IdNivel) references Niveles (IdNiveles) ,
Estado boolean,
DNI int unique,
Nombre varchar(50),
Apellido varchar(50),
Email Varchar(100),
Tel Varchar(30),
Fecha datetime,
Contraseña varchar(50)
)

create table MetodoPago (
IdMetodoPago int primary key auto_increment,
Descripcion varchar (200) not null
)

create table Reintegro (
IdReintegro int primary key auto_increment,
Fecha datetime,
Estado boolean
)

create table Categorias (
IdCategoria int primary key auto_increment,
Descripcion varchar (200)not null
)

create table CalificacionPorProducto (
IdCalificacionProducto int primary key auto_increment,
IdProducto int,
Calificacion int
)

create table Talle (
IdTalle int primary key auto_increment,
Talle varchar (10)
)

create table Color (
IdColor int primary key auto_increment,
color varchar (15)
)

create table Historial (
IdHistorial int primary key auto_increment,
IdCliente int,
IdReintegro int,
Fecha datetime,
IdMetodoPago int
)

create table ProductosPorVentas (
IdProductosPorVenta int primary key auto_increment,
IdHistorial int,
IdVariante int,
Cantidad int,
Precio decimal
)

create table Productos (
IdProducto int primary key auto_increment,
IdCategoria int,
IdCalificacionProducto int,
Estado boolean,
Nombre varchar (200),
Descripcion varchar (200),
Precio decimal
)

create table VariantesProductos (
IdVariante  int primary key auto_increment,
IdTalle int,
IdProducto int,
IdColor int,
Cantidad int
)

create table Usuario (
IdUsuario int primary key auto_increment,
Nombre varchar (200),
Apellido varchar (200),
Dni tinyint,
Usuario varchar (200),
Contraseña varchar(200)
)

ALTER TABLE `Historial`
ADD CONSTRAINT `fk_Clientes`
FOREIGN KEY (`IdCliente`)
REFERENCES `Clientes` (`IdCliente`)
ON DELETE CASCADE
ON UPDATE CASCADE;


ALTER TABLE `ProductosPorVentas` ADD CONSTRAINT `fk_Historial` FOREIGN KEY (`IdHistorial`)
REFERENCES `Historial` (`IdHistorial`)
ON DELETE CASCADE
ON UPDATE CASCADE;


alter table `clientes` add constraint   `fk_idSexo` foreign key (`idSexo`) references  `sexo` (`idSexo`) on delete cascade on update cascade;

alter table `ProductosPorVentas` add constraint   `fk_idHistorial` foreign key (`idHistorial`) references  `Historial` (`idHistorial`) on delete cascade on update cascade;

alter table `Historial` add constraint   `fk_idReintegro` foreign key (`idReintegro`) references  `Reintegro` (`idReintegro`) on delete cascade on update cascade;

alter table `Historial` add constraint   `fk_idMetodoPago` foreign key (`idMetodoPago`) references  `MetodoPago` (`idMetodoPago`) on delete cascade on update cascade;

alter table `ProductosPorVentas` add constraint   `fk_idVariante` foreign key (`idVariante`) references  `VariantesProductos` (`idVariante`) on delete cascade on update cascade;

alter table `VariantesProductos` add constraint   `fk_idTalle` foreign key (`idTalle`) references  `Talle` (`idTalle`) on delete cascade on update cascade;

alter table `VariantesProductos` add constraint   `fk_idColor` foreign key (`idColor`) references  `Color` (`idColor`) on delete cascade on update cascade;

alter table `VariantesProductos` add constraint   `fk_idProducto` foreign key (`idProducto`) references  `Productos` (`idProducto`) on delete cascade on update cascade;

alter table `Productos` add constraint   `fk_idCategoria` foreign key (`idCategoria`) references  `Categorias` (`idCategoria`) on delete cascade on update cascade;

alter table `Productos` add constraint   `fk_idCalificacionProducto` foreign key (`idCalificacionProducto`) references  `CalificacionPorProducto` (`idCalificacionProducto`) on delete cascade on update cascade;
