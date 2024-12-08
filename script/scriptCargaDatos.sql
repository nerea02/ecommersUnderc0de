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

INSERT INTO Categorias (Descripcion, Estado) VALUES 
('Electrónica', true),
('Ropa', true),
('Hogar', true);


INSERT INTO Talle (Talle, Estado) VALUES 
('S', true),
('M', true),
('L', true),
('N/necesita', true);


INSERT INTO Colores (Color, Estado) VALUES 
('Rojo', true),
('Azul', true),
('Negro', true);

INSERT INTO Productos (IdCategoria,  Nombre, Descripcion, Imagen, Precio, Estado) VALUES 
(1,  'Smartphone', 'Teléfono móvil inteligente', 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6487/6487403_sd.jpg', 599.99, true),
(2,  'Camiseta', 'Camiseta de algodón', 'https://www.80scasualclassics.co.uk/images/lacoste-logo-t-shirt-navy-p12846-74227_image.jpg', 19.99, true),
(3, 'Sofá', 'Sofá de tres plazas', 'https://images.samsung.com/is/image/samsung/hk-en_UA55JS8000JXZK_017_Silver_silver?$L1-Thumbnail$', 299.99, true);

INSERT INTO VariantesProductos (IdTalle, IdProducto, IdColor, Cantidad, Estado) VALUES 
(4, 1, 1, 50, true),
(2, 2, 2, 100, true),
(3, 3, 3, 10, true);

INSERT INTO Usuario (Nombre, Apellido, Dni, Usuario, Contraseña, Estado) VALUES 
('Admin', 'Super', 1, 'admin', 'admin123', true),
('Juan', 'González', 2, 'juangonzalez', 'juan123', true),
('Maria', 'Lopez', 3, 'marialopez', 'maria123', true);



