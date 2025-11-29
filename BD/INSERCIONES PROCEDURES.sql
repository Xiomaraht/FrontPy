# This is DML

  -- DATOS DE INSERCION PARA VETERINARIAS USANDO EL PROCEDIMIENTO 
  
  CALL nueva_veterinaria(
    '900.123.456-7', 
    'Clínica Veterinaria Pecitas Felices', 
    'Carrera 15 # 82-20', 
    3101234567, 
    'contacto@pecitasfelices.com', 
    1 -- ID del barrio, ej: 1 para 'Usaquén'
);

CALL nueva_veterinaria(
    '901.234.567-8', 
    'Centro Médico Animalia', 
    'Calle 10A # 40-15', 
    3219876543, 
    'citas@animaliamedellin.co', 
    2 -- ID del barrio, ej: 2 para 'El Poblado'
);


CALL nueva_veterinaria(
    '805.345.678-9', 
    'VetSalud del Sur', 
    'Avenida 6N # 25-50', 
    3158765432, 
    'info@vetsaludsur.com', 
    3 -- ID del barrio, ej: 3 para 'Granada'
);


CALL nueva_veterinaria(
    '900.456.789-0', 
    'Hospital Veterinario Costa Caribe', 
    'Carrera 58 # 72-10', 
    3001122334, 
    'urgencias@costacaribevet.com.co', 
    4 -- ID del barrio, ej: 4 para 'El Prado'
);


CALL nueva_veterinaria(
    '800.567.890-1', 
    'Mascotas Sanas', 
    'Carrera 33 # 50-05', 
    3187654321, 
    'atencion@mascotassanasbga.net', 
    5 -- ID del barrio, ej: 5 para 'Cabecera del Llano'
);

  -- DATOS DE INSERCION PARA PROVEEDORES USANDO EL PROCEDIMIENTO 

-- Ejemplo 1: Proveedor de productos farmacéuticos
CALL nuevo_proveedor(
    '860.069.284-2', 
    'DistriVet Colombia',
    'Carlos Rodriguez',
    'Avenida El Dorado # 100-20, Bogotá', 
    3123456789,
    'ventas.corporativas@distrivet.com.co'
);

-- Ejemplo 2: Proveedor de equipos médicos y quirúrgicos
CALL nuevo_proveedor(
    '900.555.123-4',
    'Equipos Vet-Tech',
    'Ana Maria Gutierrez',
    'Parque Industrial Celta, Bodega 5, Funza, Cundinamarca',
    3156789012,
    'ana.gutierrez@vet-tech.com'
);

-- Ejemplo 3: Proveedor de alimentos y nutrición animal
CALL nuevo_proveedor(
    '830.111.987-6',
    'NutriCan S.A.S.',
    'Sofia Castro',
    'Carrera 43A # 1-50, Oficina 801, Medellín',
    3109876543,
    'sofia.castro@nutrican.co'
);

-- Ejemplo 4: Laboratorio de diagnóstico
CALL nuevo_proveedor(
    '901.888.345-2',
    'BioAnimal Labs',
    'Javier Moreno',
    'Zona Franca del Pacífico, Lote 12, Palmira, Valle del Cauca',
    3201234567,
    'javier.moreno@bioanimallabs.com'
);

-- Ejemplo 5: Proveedor de accesorios y juguetes
CALL nuevo_proveedor(
    '900.777.654-3',
    'Todo para Mascotas Ltda.',
    'Laura Jimenez',
    'Calle 98 # 15-20, Local 3, Bogotá',
    3198765432,
    'laura.j@todoparamascotas.com'
);

# INSERCION DE CLIENTES POR PROCEDIMIENTO

 -- Cliente 1
 CALL nuevo_cliente(
    123456789,
    1,
    'Ana',
    'Gómez',
    'Pérez',
    3101234567,
    'ana.gomez@email.com',
    'loMaloDeSerBueno',
    '1985-03-15',
    'Carrera 7 # 12-34 Norte, Apto 501',
    'Edificio Sol',
    1
);

-- Cliente 2
CALL nuevo_cliente(
    987654321 ,
    2,
    'Juan',
    'Rodriguez',
    'Castro',
    3209876543,
    'juan.rodriguez@email.com',
    'HombreConAlas',
    '1990-07-22',
    'Calle 80 # 45-67 Sur, Casa 2B',
    'Conjunto Luna',
    2
);

-- Cliente 3
CALL nuevo_cliente(
	456789123, 
	1, 
	'María', 
	'López', 
	'Vargas', 
	3001112233, 
	'maria.lopez@email.com',
    'Rorsarch',
	'1978-11-01', 
	'Avenida Boyacá # 60-10 Oeste, Interior 3', 
	'Torres del Río',
	3
);

-- Cliente 4
CALL nuevo_cliente(
    '789123456',
    1,
    'Pedro',
    'Díaz',
    'Rojas',
    3154445566,
    'pedro.diaz@email.com',
    'InviernoDel92',
    '1995-04-05',
    'Transversal 22 # 30-05 Este, Local 102',
    'Centro Comercial',
    2
);

-- Cliente 5
CALL nuevo_cliente(
    '321654987',
    2,
    'Laura',
    'Sánchez',
    'Morales',
    3127778899,
    'laura.sanchez@email.com',
    'marioNeta',
    '1982-09-10',
    'Diagonal 50 # 10-20 Norte, Bodega 3',
    'Parque Industrial',
    1
);

-- Cliente 6
CALL nuevo_cliente(
    '654987321',
    1,
    'Carlos',
    'Hernández',
    'Guerrero',
    3012345678,
    'carlos.hernandez@email.com',
    'AsiSoyYo',
    '1970-01-20',
    'Calle 100 # 25-01 Este, Oficina 803',
    'Edificio Central',
    2
);

-- Cliente 7
CALL nuevo_cliente(
    '147258369',
    1,
    'Sofía',
    'Ruiz',
    'Jiménez',
    3189990011,
    'sofia.ruiz@email.com',
    'ElHijoDeHernandez',
    '1998-06-30',
    'Carrera 15 # 90-15 Oeste, Apto 204',
    'Apartamentos Altos',
    3
);

-- Cliente 8
CALL nuevo_cliente(
    '258369147',
    2,
    'Andrés',
    'Torres',
    'Acosta',
    3056667788,
    'andres.torres@email.com',
    'Almejas',
    '1980-12-08',
    'Calle 13 # 70-50 Sur, Casa 1A',
    'Villa Hermosa',
    1
);

-- Cliente 9
CALL nuevo_cliente(
    '369147258',
    1,
    'Valentina',
    'Salazar',
    'Montoya',
    3132223344,
    'valentina.s@email.com',
    'Anonimo',
    '1993-02-14',
    'Avenida Caracas # 40-80 Norte, Local 7',
    'Centro Comercial',
    2
);

-- Cliente 10
CALL nuevo_cliente(
    '741852963',
    1,
    'Felipe',
    'Castro',
    'Valencia',
    3045556677,
    'felipe.castro@email.com',
    'YendoALaCasaDeDamian',
    '1975-05-25',
    'Transversal 90 # 140-20 Oeste, Apto 901',
    'Conjunto Residencial',
    1
);

# INSERCION DE MASCOTAS USANDO PROCEDIMIENTO

 -- Mascotas para Ana Gómez (numDo: 123456789, tipoDoc: 1)
CALL nueva_mascota(
    'Max',
    1, -- Raza: Perro (ejemplo)
    '2020-05-10',
    '123456789',
    1
);
CALL nueva_mascota(
    'Luna',
    1, -- Raza: Perro (ejemplo)
    '2022-01-20',
    '123456789',
    1
);

-- Mascotas para Juan Rodríguez (numDo: 987654321, tipoDoc: 2)
CALL nueva_mascota(
    'Garfield',
    2, -- Raza: Gato (ejemplo)
    '2019-08-01',
    '987654321',
    2
);

-- Mascotas para María López (numDo: 456789123, tipoDoc: 1)
CALL nueva_mascota(
    'Kiara',
    1, -- Raza: Perro (ejemplo)
    '2021-03-05',
    '456789123',
    1
);

-- Mascotas para Pedro Díaz (numDo: 789123456, tipoDoc: 1)
CALL nueva_mascota(
    'Piolín',
    1, -- Raza: Perro (ejemplo)
    '2023-01-15',
    '789123456',
    1
);

-- Mascotas para Laura Sánchez (numDo: 321654987, tipoDoc: 2)
CALL nueva_mascota(
    'Mishi',
    2, -- Raza: Gato (ejemplo)
    '2020-07-28',
    '321654987',
    2
);

-- Mascotas para Carlos Hernández (numDo: 654987321, tipoDoc: 1)
CALL nueva_mascota(
    'Thor',
    1, -- Raza: Perro (ejemplo)
    '2018-11-11',
    '654987321',
    1
);

-- Mascotas para Sofía Ruiz (numDo: 147258369, tipoDoc: 1)
CALL nueva_mascota(
    'Pelusa',
    2, -- Raza: Gato (ejemplo)
    '2021-09-03',
    '147258369',
    1
);

-- Mascotas para Andrés Torres (numDo: 258369147, tipoDoc: 2)
CALL nueva_mascota(
    'Rocky',
    1, -- Raza: Perro (ejemplo)
    '2019-02-14',
    '258369147',
    2
);

-- Mascotas para Valentina Salazar (numDo: 369147258, tipoDoc: 1)
CALL nueva_mascota(
    'Coco',
    2, -- Raza: Gato (ejemplo)
    '2022-04-20',
    '369147258',
    1
);

-- Mascotas para Felipe Castro (numDo: 741852963, tipoDoc: 1)
CALL nueva_mascota(
    'Bingo',
    1, -- Raza: Perro (ejemplo)
    '2017-06-01',
    '741852963',
    1
);
CALL nueva_mascota(
    'Salem',
    2, -- Raza: Gato (ejemplo)
    '2020-10-10',
    '741852963',
    1
);

# INSERCION DE EMPLEADOS POR MEDIO DEL PROCEDIMIENTO

-- 1. Médico Veterinario Principal para "Pecitas Felices"
CALL nuevo_empleado(
    10101010,                       -- p_numDoc
    1,                              -- p_tipoDoc (Cédula de Ciudadanía)
    'Alejandro',                    -- p_nombre
    'Gómez',                        -- p_ape1
    'Pineda',                       -- p_ape2
    '900.123.456-7',                -- p_veterinariaNit
    1,                              -- p_rolesIdRol (Médico Veterinario)
    'alejandro.gomez@pecitasfelices.com', -- p_correo
    'VetAlejo2025*'                 -- p_contrasena (en texto plano)
);

-- 2. Recepcionista para "Pecitas Felices" (sin segundo apellido)
CALL nuevo_empleado(
    20202020,
    1,
    'Beatriz Elena',
    'Fernández',
    NULL,                           -- p_ape2 (NULL para campos opcionales)
    '900.123.456-7',
    2,                              -- p_rolesIdRol (Recepcionista)
    'recepcion@pecitasfelices.com',
    'RecepBeatriz#1'
);

-- 3. Veterinaria especialista en felinos para "Centro Médico Animalia"
CALL nuevo_empleado(
    30303030,
    2,                              -- p_tipoDoc (Cédula de Extranjería)
    'Isabella',
    'Rojas',
    'Santana',
    '901.234.567-8',
    1,
    'isabella.rojas@animaliamedellin.co',
    'IsaVetMed_33'
);

-- 4. Administrador General para "Centro Médico Animalia"
CALL nuevo_empleado(
    40404040,
    1,
    'Ricardo',
    'Mendoza',
    'Casas',
    '901.234.567-8',
    3,                              -- p_rolesIdRol (Administrador)
    'admin@animaliamedellin.co',
    'AdminRicardo.M'
);

-- 5. Médico Veterinario para "VetSalud del Sur"
CALL nuevo_empleado(
    50505050,
    1,
    'David',
    'Ospina',
    'Ramírez',
    '805.345.678-9',
    1,
    'david.ospina@vetsaludsur.com',
    'DavidOspinaVet!'
);

-- 6. Recepcionista para "VetSalud del Sur"
CALL nuevo_empleado(
    60606060,
    1,
    'Carolina',
    'Cruz',
    'Vega',
    '805.345.678-9',
    2,
    'atencion.sur@vetsaludsur.com',
    'CaroCruz_Sur'
);

-- 7. Cirujano Veterinario para "Hospital Veterinario Costa Caribe"
CALL nuevo_empleado(
    70707070,
    1,
    'Sergio',
    'Valderrama',
    'Acosta',
    '900.456.789-0',
    1,
    'sergio.valderrama@costacaribevet.com.co',
    'CirujanoSergio77'
);

-- 8. Veterinario de turno noche para "Hospital Veterinario Costa Caribe"
CALL nuevo_empleado(
    80808080,
    3,                              -- p_tipoDoc (Pasaporte)
    'Martina',
    'Di Stefano',
    NULL,
    '900.456.789-0',
    1,
    'martina.distefano@costacaribevet.com.co',
    'MartinaNoche24h'
);

-- 9. Administradora para "Mascotas Sanas"
CALL nuevo_empleado(
    90909090,
    1,
    'Laura',
    'Jiménez',
    'Soto',
    '800.567.890-1',
    3,
    'laura.jimenez@mascotassanasbga.net',
    'LauraAdminBGA'
);

-- 10. Médico Veterinario general para "Mascotas Sanas"
CALL nuevo_empleado(
    12312312,
    1,
    'Andrés',
    'García',
    'Martelo',
    '800.567.890-1',
    1,
    'andres.garcia@mascotassanasbga.net',
    'AndresG_Mascotas'
);