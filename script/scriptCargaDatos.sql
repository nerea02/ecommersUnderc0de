use ecommerce;


select * from categorias;
select * from niveles;
select * from sexo;
select * from calificacionporproducto;
select * from clientes;
select * from colores;
select * from historial;
SELECT * FROM reintegro;
SELECT * FROM metodopago;
select * from productos;
select * from productosporventas;
select * from talle;
select * from variantesproductos;
select * from usuario;


INSERT INTO talle (Talle) 
VALUES 
('S'),  
('M'),   
('L'),   
('XL'); 

INSERT INTO metodopago (Descripcion) VALUES ('Tarjeta de Crédito'),('PayPal'),('Transferencia Bancaria'),('Efectivo');
INSERT INTO reintegro (Fecha, Estado) VALUES ('2024-10-05 14:30:00', true),('2024-10-04 10:15:00', false),('2024-10-03 09:00:00', true);
INSERT INTO colores (color) VALUES ('Rojo'),('Azul'),('Verde'),('Amarillo'),('Negro');
insert into sexo(Descripcion) values ("Masculino"),("Femenino"), ("otros");
insert into categorias(Descripcion)values ("zapato"),("Remeras"),("tazas");
INSERT INTO calificacionporproducto (IdProducto, Calificacion) VALUES (1, 5), (1, 4), (2, 3), (3, 5), (1, 5);
insert into niveles( descripcion) values('Administrador'),('Cliente'),('Vendedor');



INSERT INTO productos (IdCategoria, IdCalificacionProducto, Estado, Nombre, Descripcion, Precio)
VALUES(1, 1, true, 'Camiseta', 'Camiseta de algodón', 19.99),(2, 2, true, 'Zapatos', 'Zapatos deportivos', 49.99),
(1, 3, false, 'Pantalones', 'Pantalones de mezclilla', 39.99);





INSERT INTO VariantesProductos (IdTalle, IdProducto, IdColor, Cantidad)
VALUES
(1, 1, 1, 100),  
(2, 1, 2, 50),   
(1, 2, 1, 200);  



INSERT INTO clientes (IdSexo, IdNivel, Estado, DNI, Nombre, Apellido, Email, Tel, Fecha, Contraseña) 
VALUES (1, 1, true, 12345678, 'Juan', 'Pérez', 'juan.perez@example.com', '123-456-7890', '2024-10-05 14:30:00', 'miPassword123'),
(2, 3, false, 87654321, 'María', 'Gómez', 'maria.gomez@example.com', '098-765-4321', '2024-09-20 09:15:00', 'otroPassword456');

INSERT INTO historial (IdCliente, IdReintegro, Fecha, IdMetodoPago)
VALUES
(1, 1, '2024-10-05 12:45:00', 1), 
(2, 2, '2024-09-30 16:30:00', 2), 
(1, 3, '2024-10-01 10:15:00', 3),  
(2, 1, '2024-10-02 14:00:00', 4);


INSERT INTO productosporventas (IdHistorial, IdVariante, Cantidad, Precio)
VALUES(1, 1, 2, 19.99), 
(3, 1, 3, 15.00); 