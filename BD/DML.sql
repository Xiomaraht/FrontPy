# ESTOS DATOS SON NECESARIOS PARA PROBAR LOS PPROCEDIMIENTOS
-- 1. Tabla: TipoDoc
INSERT INTO TipoDoc(nombre) VALUES
('Cédula de Ciudadanía'),
('Cédula de Extranjería'),
('Pasaporte'),
('Tarjeta de Identidad'),
('NIT'),
('Registro Civil'),
('Permiso Especial de Permanencia');

-- 2. Tabla: Localidades
-- Se insertan 5 localidades de Bogotá como ejemplo.
INSERT INTO Localidades (nombre) VALUES
('Usaquén'),
('Chapinero'),
('Teusaquillo'),
('Puente Aranda'),
('Kennedy');

-- 3. Tabla: Barrio
-- Se insertan barrios y se asocian a las localidades creadas anteriormente (IDs 1-5).
INSERT INTO Barrio(nombre, idLocalidad) VALUES
('Santa Bárbara', 1),   -- Usaquén
('Quinta Camacho', 2),  -- Chapinero
('Galerías', 3),        -- Teusaquillo
('Salazar Gómez', 4),   -- Puente Aranda
('Castilla', 5);         -- Kennedy

-- 4. Tabla: Especie
INSERT INTO Especie (nombre) VALUES
('Perro'),
('Gato'),
('Ave'),
('Roedor'),
('Reptil');

-- 5. Tabla: Raza
-- Se asocian a las especies creadas anteriormente (IDs 1-5).
INSERT INTO Raza(nombre, especie) VALUES
('Golden Retriever', 1), -- Perro
('Siamés', 2),           -- Gato
('Canario', 3),          -- Ave
('Hámster Sirio', 4),    -- Roedor
('Tortuga de Orejas Rojas', 5); -- Reptil

-- 6. Tabla: Roles
INSERT INTO Roles(nombre) VALUES
('Médico'),
('Recepcionista'),
('Admin'),
('Auxiliar Veterinario'),
('Peluquero Canino'),
('Cirujano Veterinario'),
('Especialista en Comportamiento'),
('Gerente de Tienda');

-- 7. Tabla: Examenes
INSERT INTO Examenes(nombre) VALUES
('Perfil Sanguíneo Completo'),
('Análisis de Orina(Urianálisis)'),
('Radiografía de Tórax'),
('Ecografía Abdominal'),
('Prueba de Alergias');

-- 8. Tabla: Servicios
INSERT INTO Servicios(nombre) VALUES
('Consulta General'),
('Vacunación Anual'),
('Baño y Peluquería'),
('Cirugía de Esterilización'),
('Guardería por Día');

-- 9. Tabla: Suscripcion
INSERT INTO Suscripcion(idSuscripcion, nombre, descripcion, costoMensual, estado) VALUES
(1, 'Plan Básico', 'Acceso a descuentos en consultas y productos básicos.', '30000', 'Activo'),
(2, 'Plan Bienestar', 'Incluye consultas ilimitadas y un chequeo anual.', '75000', 'Activo'),
(3, 'Plan Premium', 'Cobertura completa incluyendo exámenes y descuentos en cirugías.', '150000', 'Activo'),
(4, 'Plan Cachorros', 'Plan especial para el primer año de vida de la mascota.', '90000', 'Activo'),
(5, 'Plan Geriátrico', 'Cuidado especializado para mascotas mayores de 7 años.', '110000', 'Activo');

-- 10. Tabla: Citas
INSERT INTO Citas(fechaYhora, clientesNumDo, clientesTipDoc, empleadosNumDo, empleadosTipDoc) VALUES
("2025-06-24 10:00:10", 123456789, 1, 10101010, 1),
("2025-07-24 10:00:00", 987654321, 2, 10101010, 1),
("2025-08-24 10:00:00", 456789123, 1, 10101010, 1),
("2025-09-24 10:00:00", 789123456, 1, 10101010, 1),
("2025-10-24 10:00:00", 321654987, 2, 10101010, 1);

-- 11. Tabla: Consultas ( resultExam se quito por indefinidamente)
INSERT INTO Consultas(fecCon, reporConsult, empleadosNumDoc, empleadosTipDoc, idMasc) VALUES 
("2025-06-24", 'lorem ipsum', 10101010, 1, 1),
("2025-07-24", 'lorem ipsum', 10101010, 1, 2),
("2025-08-24", 'lorem ipsum', 10101010, 1, 3),
("2025-09-24", 'lorem ipsum', 10101010, 1, 4),
("2025-10-24", 'lorem ipsum', 10101010, 1, 5);

 -- 12. Tabla: Inventario
-- INSERT INTO Inventario(productoID, cantidadActual, fechaUltimaActualizacion, veterinariaNit) VALUES
-- (1, 10, "2025-06-24", '900.123.456-7'),
-- (2, 16, "2025-06-24", '901.234.567-8'),
-- (3, 11, "2025-06-24", '805.345.678-9'),
-- (4, 17, "2025-06-24", '900.456.789-0'),
-- (5, 12, "2025-06-24", '800.567.890-1');

 -- 12. Tabla: Producto
-- INSERT INTO Producto (image, precio, stock, idInventario) VALUES
-- ('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 85000, 10, 1), -- Alimento Premium para Perros Adultos.jpg
-- ('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 32000, 23, 2), -- Juguete Interactivo para Gatos.jpg
-- ('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 45000, 16, 3), -- Champú Hipoalergénico para Mascotas Sensibles.jpg
-- ('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 68000, 11, 4), -- Collar Antipulgas y Garrapatas.jpg
-- ('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 20000, 27, 5); -- Snacks Dentales para Perros Pequeños.jpg

INSERT INTO Producto (image, descripcion) VALUES
('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 'Alimento Premium para Perros Adultos'), -- Alimento Premium para Perros Adultos.jpg
('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 'Juguete Interactivo para Gatos'), -- Juguete Interactivo para Gatos.jpg
('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 'Champú Hipoalergénico para Mascotas Sensibles'), -- Champú Hipoalergénico para Mascotas Sensibles.jpg
('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 'Collar Antipulgas y Garrapatas'), -- Collar Antipulgas y Garrapatas.jpg
('FFD8FFE000104A46494600010100000100010000FFDB0043000503040404030504040405050506070C08070707070F0B0B090C110F1212110F111110121412131313121111131518171513161313141414161C1A1616181B1D1D1D12131517171714151B1C1A1C1C1C', 'Snacks Dentales para Perros Pequeños'); -- Snacks Dentales para Perros Pequeños.jpg


 -- 14. Tabla: suscripciónesVeterinarias
INSERT INTO suscripcionesVeterinarias(veterinariaNit, idSuscripcion, fechaInicio, fechaFin, estadoSuscripcion, fechaUltimoPago, proximoPago) VALUES
("800.567.890-1", 1, "2025-06-24", "2025-07-24","Activo","2025-05-24","2025-01-24"),
("805.345.678-9", 2, "2025-06-24", "2025-07-24","Cancelada","2025-05-24","2025-01-24"),
("900.123.456-7", 3, "2025-06-24", "2025-07-24","Activo","2025-05-24","2025-01-24"),
("900.456.789-0", 4, "2025-06-24", "2025-07-24","Activo","2025-05-24","2025-01-24"),
("901.234.567-8", 5, "2025-06-24", "2025-07-24","Cancelada","2025-05-24","2025-01-24");

 -- 15. Tabla: PagosSuscripcion
INSERT INTO PagosSuscripcion(idSuscripcionVeterinaria, montoPagado, fechaPagado, peridoFacturadoInicio, periodoFacturadoFin, metodoPago, estadoPago, referenciaTransaccion) VALUES
(1, 15000, "2025-06-24", "2025-07-24", "2025-08-24","Efectivo","recibido","Efectivo"),
(2, 20000, "2025-06-24", "2025-07-24", "2025-08-24","Tarjeta débito o crédito","cancelado","M1708252"),
(3, 22000, "2025-06-24", "2025-07-24", "2025-08-24","Transferencias bancarias","cancelado","824139512"),
(4, 17500, "2025-06-24", "2025-07-24", "2025-08-24","Efectivo","recibido","Efectivo"),
(5, 24000, "2025-06-24", "2025-07-24", "2025-08-24","Efectivo","recibido","Efectivo");

 -- 15. Tabla: Facturas
INSERT INTO Facturas(fechaFactura, fechaVencimiento, subtotal, impuestos, totalFactura, veterinariaNit) VALUES
("2025-06-24", "2025-10-24", 15000, 2850, 17850, "800.567.890-1"),
("2025-06-24", "2025-10-24", 20000, 3800, 23800, "805.345.678-9"),
("2025-06-24", "2025-10-24", 22500, 4275, 26775, "900.123.456-7"),
("2025-06-24", "2025-10-24", 11250, 2137, 13387, "900.456.789-0"),
("2025-06-24", "2025-10-24", 5500, 1045, 6545, "901.234.567-8");



-- Tablas intermedias

-- 16. Tabla Clientes_veterinaria
INSERT INTO ClientesVeterinaria (clientesNumDo, clientesTipDoc, VeterinariaNit) VALUES
('123456789', 1, '800.567.890-1'),
('147258369', 1, '805.345.678-9'),
('258369147', 2, '900.123.456-7'),
('321654987', 2, '900.456.789-0'),
('369147258', 1, '901.234.567-8');

-- 17. Tabla Consultas_examenes
INSERT INTO ConsultasExamenes (consultasIdConsulta, examenesIdExam) VALUES
(1, 1),
(2, 4),
(3, 2),
(4, 5),
(5, 3);

-- 18. Servicios_veterinarias
INSERT INTO ServiciosVeterinarias (serviciosIdServicios, veterinariaNit) VALUES
(1, '800.567.890-1'),
(2, '805.345.678-9'),
(3, '900.123.456-7'),
(4, '900.456.789-0'),}
(5, '901.234.567-8');

-- 19. Productos_inventarios
-- INSERT INTO ProductosInventario (productoId, inventarioId) VALUES
-- (1, 1),
-- (2, 2),
-- (3, 3),
-- (4, 4),
-- (5, 5);

-- 20. Proveedores_productos
INSERT INTO ProveedoresProductos (productosIdProducto, proveedoresNit) VALUES
(1, '830.111.987-6'),
(2, '860.069.284-2'),
(3, '900.555.123-4'),
(4, '900.777.654-3'),
(5, '901.888.345-2');

-- 21. Productos_veterinaria
-- INSERT INTO ProductosVeterinarias (productosIdProducto, veterinariaNit) VALUES
-- (1, '800.567.890-1'),
-- (2, '805.345.678-9'),
-- (3, '900.123.456-7'),
-- (4, '900.456.789-0'),
-- (5, '901.234.567-8');

INSERT INTO ProductosVeterinarias (productosIdProducto, veterinariaNit, precio, stock) VALUES
(1, '800.567.890-1', 85000, 10),
(2, '805.345.678-9', 32000, 23),
(3, '900.123.456-7', 45000, 16),
(4, '900.456.789-0', 68000, 11),
(5, '901.234.567-8', 20000, 27);

-- 22. MovimientosProductos
INSERT INTO MovimientosProductos (idProductosVeterinarias, cantidad, descripcion) VALUES
(1, -2, "Se realiza venta de este producto"),
(2, -4, "Se realiza venta de este producto"),
(3, -3, "Se realiza venta de este producto"),
(4, -6, "Se realiza venta de este producto"),
(5, -1, "Se realiza venta de este producto");
