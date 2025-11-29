 # This is PROCEDURES
DROP PROCEDURE IF EXISTS nuevo_empleado;
DROP PROCEDURE IF EXISTS nuevo_cliente;
DROP PROCEDURE IF EXISTS nuevo_proveedor;
DROP PROCEDURE IF EXISTS nueva_veterinaria;
DROP PROCEDURE IF EXISTS nueva_mascota;
-- PROCEDIMIENTO PARA INSERCION DE EMPLEADOS

DELIMITER $$
CREATE PROCEDURE nuevo_empleado(
	IN p_numDoc INT(11), 
    IN p_tipoDoc INT(11),
    IN p_nombre VARCHAR(50),
    IN p_ape1 VARCHAR(30),
    IN p_ape2 VARCHAR(30),
    IN p_veterinariaNit VARCHAR(20),
    IN p_rolesIdRol INT(11),
    IN p_correo VARCHAR(100), 
    IN p_contrasena VARBINARY(255)
)
BEGIN
	INSERT INTO empleados(numDoc, tipoDoc, nombre, ape1, ape2, veterinariaNit, rolesIdRol, correo, contrasena)
    VALUES(p_numDoc,p_tipoDoc,p_nombre,p_ape1,p_ape2,p_veterinariaNit,p_rolesIdRol,p_correo, cifrado(p_contrasena));
END$$
DELIMITER ;
 
 -- Procedimiento para insercion de proveedores
 
 DELIMITER $$
 CREATE PROCEDURE nuevo_proveedor(
	IN p_nit VARCHAR(20), 
    IN p_nombreEmpresa VARCHAR(100),
    IN p_nombreContacto VARCHAR(200),
    IN p_direccion VARCHAR(255),
    IN p_telefono BIGINT,
    IN p_correo VARCHAR(100)
 )
 BEGIN
	INSERT INTO proveedores(nit, nombreEmpresa, nombreContacto, direccion, telefono, correo)
    VALUES(p_nit, p_nombreEmpresa, p_nombreContacto, p_direccion, p_telefono, p_correo);
 END$$
 DELIMITER ;
 
 
 -- procedimiento para la insercion de veterinarias
 
 DELIMITER $$
 CREATE PROCEDURE nueva_veterinaria(
	IN p_nit VARCHAR(20),
    IN p_nomVet VARCHAR(100),
    IN p_direccion VARCHAR(255),
    IN p_telVet BIGINT,
    IN p_correo VARCHAR(100), 
    IN p_veterinariasBarrio INT(11)
 )
 BEGIN
	INSERT INTO veterinarias(nit, nomVet, direccion, telVet, correo, veterinariasBarrio)
    VALUES(p_nit, p_nomVet, p_direccion, p_telVet, p_correo, p_veterinariasBarrio);
 END$$
 DELIMITER ;
 

-- Procedimiento para insercion de clientes
DELIMITER $$
CREATE PROCEDURE nuevo_cliente(
    IN p_numDo VARCHAR(15),
    IN p_tipoDoc INT(11),
    IN p_nom VARCHAR(50),
    IN p_ape1 VARCHAR(30),
    IN p_ape2 VARCHAR(30),
    IN p_tel BIGINT(20),
    IN p_correo VARCHAR(100),
    IN p_contrasena VARBINARY (255),
    IN p_fecNa DATE,
    IN p_direccion VARCHAR(255),
    IN p_detDirec VARCHAR(30),
    IN p_barrio INT(11)
)
BEGIN
	INSERT INTO clientes(numDo, tipoDoc, nom, ape1, ape2, tel, correo, contrasena, fecNa, direccion,detDirec, barrio)
    VALUES(p_numDo, p_tipoDoc, p_nom, p_ape1, p_ape2, p_tel, p_correo, cifrado(p_contrasena), p_fecNa, p_direccion, p_detDirec, p_barrio);
 END$$
 DELIMITER ;
 

-- Procedimiento para insercion de mascotas
 DELIMITER $$
 CREATE PROCEDURE nueva_mascota(
    IN p_nombre VARCHAR(50),
    IN p_raza INT(11),
    IN p_fecNa DATE,
    IN p_clientesNumDo VARCHAR(15),
    IN p_clientesTipDoc INT(11)
)
BEGIN
    INSERT INTO mascota (nombre, raza, fecNa, clientesNumDo, clientesTipDoc)
    VALUES (p_nombre, p_raza, p_fecNa, p_clientesNumDo, p_clientesTipDoc);
 END$$
 DELIMITER ;
 

-- Trigger Para Ingreso el Stock
DELIMITER //
DROP TRIGGER IF EXISTS IngresarStock;
CREATE TRIGGER IngresarStock
AFTER INSERT ON ProductosVeterinarias
FOR EACH ROW
BEGIN
    INSERT INTO MovimientosProductos (idProductosVeterinarias, cantidad, descripcion) 
    VALUES (NEW.idProductosVeterinarias, NEW.stock, 'Se realiza un ingreso de stock del producto');
END
//


-- Trigger Para actualizar el Stock
DELIMITER //
DROP TRIGGER IF EXISTS ActualizarStock;
CREATE TRIGGER ActualizarStock
AFTER INSERT ON MovimientosProductos
FOR EACH ROW
BEGIN
    IF NEW.cantidad < 0 THEN
        UPDATE ProductosVeterinarias SET stock = (stock + NEW.cantidad) WHERE idProductosVeterinarias = NEW.idProductosVeterinarias;
    END IF;
END
//