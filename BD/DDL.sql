DROP DATABASE IF EXISTS petcare;
CREATE DATABASE Petcare;

USE Petcare;

CREATE TABLE TipoDoc (
    idTip INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    PRIMARY KEY (idTip)
);

CREATE TABLE Localidades (
	idLocalidad INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
	PRIMARY KEY (idLocalidad)
);
    

CREATE TABLE Barrio (
	idBarr INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (20) NOT NULL,
    idLocalidad INT NOT NULL,
	PRIMARY KEY (idBarr)
);

CREATE TABLE Clientes ( 
	numDo VARCHAR (15) NOT NULL,
	tipoDoc INT NOT NULL,
	nom VARCHAR (50) NOT NULL,
	ape1 VARCHAR(30) NOT NULL,
	ape2 VARCHAR (30),
	tel BIGINT NOT NULL UNIQUE,
	correo VARCHAR (100) NOT NULL UNIQUE,
	contrasena VARBINARY (255) NOT NULL,
	fecNa DATE NOT NULL,
	direccion VARCHAR (255) NOT NULL,
	detDirec VARCHAR (30),
	barrio INT NOT NULL
);

CREATE TABLE Especie (
	idEspecie INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
	PRIMARY KEY (idEspecie)
);

CREATE TABLE Raza (
	idRaza INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
    especie INT NOT NULL,
	PRIMARY KEY (idRaza)
);

CREATE TABLE Mascota (
	idMasc INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    raza INT NOT NULL,
    fecNa DATE NOT NULL,
    clientesNumDo VARCHAR (15) NOT NULL,
    clientesTipDoc INT NOT NULL,
	PRIMARY KEY (idMasc)
);

CREATE TABLE Veterinarias (
    nit VARCHAR (20) NOT NULL,
    nomVet VARCHAR (100) NOT NULL,
    direccion VARCHAR (255) NOT NULL,
    telVet BIGINT NOT NULL UNIQUE,
    correo VARCHAR (100) NOT NULL UNIQUE,
    veterinariasBarrio INT NOT NULL, 
	PRIMARY KEY (nit)
);

CREATE TABLE Roles (
	idRol INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (100) NOT NULL,
	PRIMARY KEY (idRol)
);

CREATE TABLE Empleados (
	numDoc INT NOT NULL,
    tipoDoc INT NOT NULL,
    nombre VARCHAR (50) NOT NULL,
    ape1 VARCHAR (30) NOT NULL,
    ape2 VARCHAR (30),
    veterinariaNit VARCHAR (20) NOT NULL,
    rolesIdRol INT NOT NULL,
    correo VARCHAR (100) NOT NULL,
    contrasena VARBINARY (255) NOT NULL
);
    
CREATE TABLE Citas (
	idAgenda INT NOT NULL AUTO_INCREMENT,
	fechaYhora DATETIME NOT NULL UNIQUE,
	clientesNumDo VARCHAR (15) NOT NULL,
	clientesTipDoc INT NOT NULL,
    empleadosNumDo INT NOT NULL,
    empleadosTipDoc INT NOT NULL,
	PRIMARY KEY (idAgenda)
);

CREATE TABLE Consultas (
	idConsulta INT NOT NULL AUTO_INCREMENT,
	fecCon DATE NOT NULL,
	reporConsult TEXT NOT NULL,
	empleadosNumDoc INT NOT NULL,
	empleadosTipDoc INT NOT NULL,
	idMasc INT NOT NULL,
	PRIMARY KEY (idConsulta)
);

CREATE TABLE Examenes (
	idExam INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
    PRIMARY KEY (idExam)
);

CREATE TABLE Servicios (
	idServicios INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (30) NOT NULL,
    PRIMARY KEY (idServicios)
);

CREATE TABLE Proveedores(
	nit VARCHAR (20) NOT NULL,
	nombreEmpresa VARCHAR (100) NOT NULL,
    nombreContacto VARCHAR (200) NOT NULL,
    direccion VARCHAR (255) NOT NULL,
    telefono BIGINT NOT NULL UNIQUE,
    correo VARCHAR (100) NOT NULL UNIQUE,
    PRIMARY KEY (nit)
);

-- CREATE TABLE Inventario (
-- 	idInventario INT NOT NULL AUTO_INCREMENT,
--     productoID INT NOT NULL,
--     cantidadActual DECIMAL (10,2) NOT NULL, 
--     fechaUltimaActualizacion DATE NOT NULL, 
--     veterinariaNit VARCHAR (20) NOT NULL, 
--     PRIMARY KEY (idInventario)
-- );

-- CREATE TABLE Producto (
-- 	idProducto INT NOT NULL AUTO_INCREMENT,
-- 	image BLOB,
-- 	precio DECIMAL (10,2) NOT NULL,
-- 	stock INT NOT NULL,
-- 	idInventario INT NOT NULL, 
-- 	PRIMARY KEY (idProducto)
-- );

CREATE TABLE Producto (
    idProducto INT NOT NULL AUTO_INCREMENT,
    image BLOB,
    descripcion VARCHAR(200) NOT NULL,
    PRIMARY KEY (idProducto)
);

CREATE TABLE Suscripcion (
	idSuscripcion INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (100) NOT NULL,
    descripcion VARCHAR (255) NOT NULL UNIQUE,
    costoMensual VARCHAR (50) NOT NULL,
    estado CHAR (30),
    PRIMARY KEY (idSuscripcion)
);

CREATE TABLE SuscripcionesVeterinarias (
	idSuscripcionVeterinaria INT NOT NULL AUTO_INCREMENT,
    veterinariaNit VARCHAR (20) NOT NULL,
    idSuscripcion INT NOT NULL, 
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    estadoSuscripcion CHAR (30) NOT NULL,
    fechaUltimoPago TIMESTAMP NOT NULL,
    proximoPago DATE NOT NULL,
    PRIMARY KEY (idSuscripcionVeterinaria)
);

CREATE TABLE PagosSuscripcion (
	idPagoSuscripcion INT NOT NULL AUTO_INCREMENT,
    idSuscripcionVeterinaria INT NOT NULL, 
    montoPagado CHAR (10) NOT NULL,
    fechaPagado TIMESTAMP NOT NULL, 
    peridoFacturadoInicio DATE NOT NULL,
    periodoFacturadoFin DATE NOT NULL,
    metodoPago VARCHAR (30) NOT NULL,
    estadoPago CHAR (40) NOT NULL,
    referenciaTransaccion VARCHAR (200),
    PRIMARY KEY (idPagoSuscripcion)
);

CREATE TABLE Facturas (
	idFactura INT NOT NULL AUTO_INCREMENT,
    fechaFactura DATE NOT NULL,
    fechaVencimiento DATE NOT NULL,
    subtotal DECIMAL (10,2) NOT NULL,
    impuestos DECIMAL (10,2) NOT NULL,
    totalFactura DECIMAL (10.3) NOT NULL,
    veterinariaNit VARCHAR (20) NOT NULL,
    PRIMARY KEY (idFactura)
);

CREATE TABLE ClientesVeterinaria (
	clientesNumDo VARCHAR (15) NOT NULL,
    clientesTipDoc INT NOT NULL,
    VeterinariaNit VARCHAR (20) NOT NULL, 
    
    PRIMARY KEY(clientesNumDo, clientesTipDoc, VeterinariaNit)
);

CREATE TABLE ConsultasExamenes(
	consultasIdConsulta INT NOT NULL,
    examenesIdExam INT NOT NULL,
    PRIMARY KEY(consultasIdConsulta, examenesIdExam)
);

CREATE TABLE ServiciosVeterinarias (
	serviciosIdServicios INT NOT NULL,
    veterinariaNit VARCHAR (20) NOT NULL,
    PRIMARY KEY (serviciosIdServicios, veterinariaNit)
);

-- CREATE TABLE ProductosInventario (
-- 	productoId INT NOT NULL,
--     inventarioId INT NOT NULL,
--     PRIMARY KEY(productoId, inventarioId)
-- );

CREATE TABLE ProveedoresProductos (
	productosIdProducto INT NOT NULL,
	proveedoresNit VARCHAR (30) NOT NULL,
	PRIMARY KEY(productosIdProducto, proveedoresNit)
);

CREATE TABLE ProductosVeterinarias (
    idProductosVeterinarias INT NOT NULL AUTO_INCREMENT,
	productosIdProducto INT NOT NULL, 
    veterinariaNit VARCHAR (30) NOT NULL,
    precio DECIMAL (10,2) NOT NULL,
    stock DECIMAL (10,2) NOT NULL,
    PRIMARY KEY(idProductosVeterinarias)
);

CREATE TABLE MovimientosProductos (
    idMovimientosProductos INT NOT NULL AUTO_INCREMENT, 
    idProductosVeterinarias INT NOT NULL,
    cantidad DECIMAL (10,2) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    PRIMARY KEY(idMovimientosProductos)
);


ALTER TABLE Clientes
ADD CONSTRAINT PK_Clientes PRIMARY KEY (numDo, tipoDoc);

ALTER TABLE Empleados
ADD CONSTRAINT PK_Empleados PRIMARY KEY (numDoc, tipoDoc);

ALTER TABLE Barrio
ADD CONSTRAINT FK_Barrio_Localidad FOREIGN KEY (idLocalidad) REFERENCES Localidades(idLocalidad);

ALTER TABLE Clientes
ADD CONSTRAINT FK_Clientes_TipoDoc FOREIGN KEY (tipoDoc) REFERENCES TipoDoc(idTip),
ADD CONSTRAINT FK_Clientes_Barrio FOREIGN KEY (barrio) REFERENCES Barrio(idBarr);

ALTER TABLE Raza
ADD CONSTRAINT FK_Raza_Especie FOREIGN KEY (especie) REFERENCES Especie(idEspecie);

ALTER TABLE Mascota
ADD CONSTRAINT FK_Mascota_Raza FOREIGN KEY (raza) REFERENCES Raza(idRaza),
ADD CONSTRAINT FK_Mascota_Cliente FOREIGN KEY (clientesNumDo, clientesTipDoc) REFERENCES Clientes(numDo, tipoDoc);

ALTER TABLE Empleados
ADD CONSTRAINT FK_Empleados_TipoDoc FOREIGN KEY (tipoDoc) REFERENCES TipoDoc(idTip),
ADD CONSTRAINT FK_Empleados_Veterinaria FOREIGN KEY (veterinariaNit) REFERENCES Veterinarias(nit),
ADD CONSTRAINT FK_Empleados_Rol FOREIGN KEY (rolesIdRol) REFERENCES Roles(idRol);

ALTER TABLE Citas
ADD CONSTRAINT FK_Citas_Cliente FOREIGN KEY (clientesNumDo, clientesTipDoc) REFERENCES Clientes(numDo, tipoDoc),
ADD CONSTRAINT FK_Citas_Empleado FOREIGN KEY (empleadosNumDo, empleadosTipDoc) REFERENCES Empleados(numDoc, tipoDoc);

ALTER TABLE Consultas
ADD CONSTRAINT FK_Consultas_Empleado FOREIGN KEY (empleadosNumDoc, empleadosTipDoc) REFERENCES Empleados(numDoc, tipoDoc),
ADD CONSTRAINT FK_Consultas_Mascota FOREIGN KEY (idMasc) REFERENCES Mascota(idMasc);

-- ALTER TABLE Inventario
-- ADD CONSTRAINT FK_Inventario_Veterinaria FOREIGN KEY (veterinariaNit) REFERENCES Veterinarias(nit);

-- ALTER TABLE Producto
-- ADD CONSTRAINT FK_Producto_Inventario FOREIGN KEY (idInventario) REFERENCES Inventario(idInventario);

ALTER TABLE SuscripcionesVeterinarias
ADD CONSTRAINT FK_SuscripVet_Veterinaria FOREIGN KEY (veterinariaNit) REFERENCES Veterinarias(nit),
ADD CONSTRAINT FK_SuscripVet_Suscripcion FOREIGN KEY (idSuscripcion) REFERENCES Suscripcion(idSuscripcion);

ALTER TABLE PagosSuscripcion
ADD CONSTRAINT FK_PagosSuscrip_SuscripVet FOREIGN KEY (idSuscripcionVeterinaria) REFERENCES SuscripcionesVeterinarias(idSuscripcionVeterinaria);

ALTER TABLE Facturas
ADD CONSTRAINT FK_Facturas_Veterinaria FOREIGN KEY (veterinariaNit) REFERENCES Veterinarias(nit);

ALTER TABLE ClientesVeterinaria
ADD CONSTRAINT FK_ClientesVet_Cliente FOREIGN KEY (clientesNumDo, clientesTipDoc) REFERENCES Clientes(numDo, tipoDoc),
ADD CONSTRAINT FK_ClientesVet_Veterinaria FOREIGN KEY (VeterinariaNit) REFERENCES Veterinarias(nit);

ALTER TABLE ConsultasExamenes
ADD CONSTRAINT FK_ConsExam_Consulta FOREIGN KEY (consultasIdConsulta) REFERENCES Consultas(idConsulta),
ADD CONSTRAINT FK_ConsExam_Examen FOREIGN KEY (examenesIdExam) REFERENCES Examenes(idExam);

ALTER TABLE ServiciosVeterinarias
ADD CONSTRAINT FK_ServVet_Servicio FOREIGN KEY (serviciosIdServicios) REFERENCES Servicios(idServicios),
ADD CONSTRAINT FK_ServVet_Veterinaria FOREIGN KEY (veterinariaNit) REFERENCES Veterinarias(nit);

ALTER TABLE ProveedoresProductos
ADD CONSTRAINT FK_ProvProd_Producto FOREIGN KEY (productosIdProducto) REFERENCES Producto(idProducto),
ADD CONSTRAINT FK_ProvProd_Proveedor FOREIGN KEY (proveedoresNit) REFERENCES Proveedores(nit);

ALTER TABLE ProductosVeterinarias
ADD CONSTRAINT FK_ProdVet_Producto FOREIGN KEY (productosIdProducto) REFERENCES Producto(idProducto),
ADD CONSTRAINT FK_ProdVet_Veterinaria FOREIGN KEY (veterinariaNit) REFERENCES Veterinarias(nit);

ALTER TABLE MovimientosProductos
ADD CONSTRAINT FK_Movim_ProdVet FOREIGN KEY (idProductosVeterinarias) REFERENCES ProductosVeterinarias(idProductosVeterinarias);

# LLaves foraneas de la tabla intermedia entre inventario y producto
 
-- ALTER TABLE ProductosInventario
-- ADD CONSTRAINT FK_ProdInven_Producto 
-- FOREIGN KEY (productoId) REFERENCES Producto(idProducto);

-- ALTER TABLE ProductosInventario
-- ADD CONSTRAINT FK_ProdInven_Inventario 
-- FOREIGN KEY (inventarioId) REFERENCES Inventario(idInventario);

-- Modificacion 

-- USE petcare;

-- ALTER TABLE Producto DROP CONSTRAINT FK_Producto_Inventario;
-- ALTER TABLE Producto DROP COLUMN precio, DROP COLUMN stock, DROP COLUMN idInventario;
-- ALTER TABLE Producto ADD COLUMN descripcion VARCHAR(200);

-- DROP TABLE ProductosInventario;
-- DROP TABLE ProductosVeterinarias; 
-- DROP TABLE Inventario;

-- CREATE TABLE ProductosVeterinarias (
--     idProductosVeterinarias INT NOT NULL,
--     productosIdProducto INT NOT NULL, 
--     veterinariaNit VARCHAR (30) NOT NULL,
--     precio DECIMAL (10,2) NOT NULL,
--     stock DECIMAL (10,2) NOT NULL,
--     PRIMARY KEY(idProductosVeterinarias)
-- );

-- CREATE TABLE MovimientosProductos (
--     idMovimientosProductos INT NOT NULL, 
--     idProductosVeterinarias INT NOT NULL,
--     cantidad DECIMAL (10,2) NOT NULL,
--     descripcion VARCHAR(100) NOT NULL,
--     PRIMARY KEY(idMovimientosProductos)
-- );

-- ALTER TABLE ProductosVeterinarias
-- ADD CONSTRAINT FK_ProdVet_Producto FOREIGN KEY (productosIdProducto) REFERENCES Producto(idProducto),
-- ADD CONSTRAINT FK_ProdVet_Veterinaria FOREIGN KEY (veterinariaNit) REFERENCES Veterinarias(nit);

-- ALTER TABLE MovimientosProductos
-- ADD CONSTRAINT FK_Movim_ProdVet FOREIGN KEY (idProductosVeterinarias) REFERENCES ProductosVeterinarias(idProductosVeterinarias);
