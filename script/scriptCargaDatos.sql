use ecommerce;


INSERT INTO Niveles (Descripcion, Estado) VALUES 
('Básico', true),
('Intermedio', true),
('Avanzado', true);

INSERT INTO Sexo (Descripcion, Estado) VALUES 
('Masculino', true),
('Femenino', true),
('Otro', true);

INSERT INTO Clientes (IdSexo, IdNivel, DNI, Nombre, Apellido, Email, Tel, Contraseña, Estado) VALUES 
(1, 2, 12345678, 'Juan', 'Pérez', 'juanperez@email.com', '1234567890', 'contraseña123', true),
(2, 1, 23456789, 'Ana', 'Gómez', 'anagomez@email.com', '0987654321', 'contraseña456', true),
(3, 3, 34567890, 'Alex', 'Martínez', 'alexmartinez@email.com', '5678901234', 'contraseña789', true);

INSERT INTO MetodoPago (Descripcion, Estado) VALUES 
('Tarjeta de crédito', true),
('PayPal', true),
('Transferencia bancaria', true);

INSERT INTO Reintegro (Fecha, Estado) VALUES 
('2024-11-15 10:30:00', true),
('2024-11-16 14:00:00', true),
('2024-11-17 16:30:00', true);

INSERT INTO Categorias (Descripcion, Estado) VALUES 
('Electrónica', true),
('Ropa', true),
('Hogar', true);

INSERT INTO CalificacionPorProducto (IdProducto, Calificacion, Estado) VALUES 
(1, 4, true),
(2, 5, true),
(3, 3, true);

INSERT INTO Talle (Talle, Estado) VALUES 
('S', true),
('M', true),
('L', true);

INSERT INTO Colores (Color, Estado) VALUES 
('Rojo', true),
('Azul', true),
('Negro', true);

INSERT INTO Historial (IdCliente, IdReintegro, IdMetodoPago, Estado) VALUES 
(1, 1, 2, true),
(2, 2, 1, true),
(3, 3, 3, true);

INSERT INTO ProductosPorVentas (IdHistorial, IdVariante, Cantidad, Precio, Estado) VALUES 
(1, 1, 2, 100.50, true),
(2, 2, 1, 50.75, true),
(3, 3, 3, 25.00, true);

INSERT INTO Productos (IdCategoria, IdCalificacionProducto, Nombre, Descripcion, Imagen, Precio, Estado) VALUES 
(1, 1, 'Smartphone', 'Teléfono móvil inteligente', 'smartphone.jpg', 599.99, true),
(2, 2, 'Camiseta', 'Camiseta de algodón', 'camiseta.jpg', 19.99, true),
(3, 3, 'Sofá', 'Sofá de tres plazas', 'sofa.jpg', 299.99, true);

INSERT INTO VariantesProductos (IdTalle, IdProducto, IdColor, Cantidad, Estado) VALUES 
(1, 1, 1, 50, true),
(2, 2, 2, 100, true),
(3, 3, 3, 10, true);

INSERT INTO Usuario (Nombre, Apellido, Dni, Usuario, Contraseña, Estado) VALUES 
('Admin', 'Super', 1, 'admin', 'admin123', true),
('Juan', 'González', 2, 'juangonzalez', 'juan123', true),
('Maria', 'Lopez', 3, 'marialopez', 'maria123', true);



DELIMITER $$

CREATE PROCEDURE AgregarProductoCantidadCalificacionConImagen(
    IN nombre VARCHAR(255),
    IN descripcion TEXT,
    IN color INT,
    IN categoria INT,
    IN cantidad INT,
    IN talle INT,
    IN precio DECIMAL(10, 2),
    IN calificacion INT,
    IN imagen VARCHAR(255)
)
BEGIN
    DECLARE idProducto INT;

    -- Inserta el producto en la tabla Productos
    INSERT INTO Productos (IdCategoria, IdCalificacionProducto, Nombre, Descripcion, Precio, Imagen)
    VALUES (categoria, calificacion, nombre, descripcion, precio, imagen);

    -- Obtiene el ID del producto insertado
    SET idProducto = LAST_INSERT_ID();

    -- Inserta la variante del producto en la tabla VariantesProductos
    INSERT INTO VariantesProductos (IdProducto, Cantidad, IdTalle, IdColor)
    VALUES (idProducto, cantidad, talle, color);

    -- Retorna el id del producto insertado
    SELECT idProducto AS ProductoId;

END$$

DELIMITER ;

