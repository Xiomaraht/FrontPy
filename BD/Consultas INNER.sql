-- Consulta 1: Obtener el nombre del cliente y el nombre de sus mascotas
-- Esta consulta combina la tabla 'Clientes' con la tabla 'Mascota'
-- para mostrar qué mascotas pertenecen a cada cliente.
SELECT
    C.nom AS NombreCliente,
    C.ape1 AS ApellidoCliente,
    M.nombre AS NombreMascota,
    M.fecNa AS FechaNacimientoMascota
FROM
    Clientes AS C
INNER JOIN
    Mascota AS M ON C.numDo = M.clientesNumDo AND C.tipoDoc = M.clientesTipDoc;

-- Consulta 2: Obtener información de los empleados, su rol y la veterinaria donde trabajan
-- Esta consulta combina las tablas 'Empleados', 'Roles' y 'Veterinarias'
-- para proporcionar una vista completa de cada empleado.
SELECT
    E.nombre AS NombreEmpleado,
    E.ape1 AS ApellidoEmpleado,
    R.nombre AS Rol,
    V.nomVet AS NombreVeterinaria,
    V.direccion AS DireccionVeterinaria
FROM
    Empleados AS E
INNER JOIN
    Roles AS R ON E.rolesIdRol = R.idRol
INNER JOIN
    Veterinarias AS V ON E.veterinariaNit = V.nit;

-- Consulta 3: Obtener detalles de las consultas, incluyendo el nombre de la mascota y el nombre del veterinario
-- Esta consulta combina las tablas 'Consultas', 'Mascota' y 'Empleados'
-- para mostrar quién realizó la consulta y a qué mascota.
SELECT
    Con.idConsulta AS IDConsulta,
    Con.fecCon AS FechaConsulta,
    Con.reporConsult AS ReporteConsulta,
    M.nombre AS NombreMascota,
    E.nombre AS NombreVeterinario,
    E.ape1 AS ApellidoVeterinario
FROM
    Consultas AS Con
INNER JOIN
    Mascota AS M ON Con.idMasc = M.idMasc
INNER JOIN
    Empleados AS E ON Con.empleadosNumDoc = E.numDoc AND Con.empleadosTipDoc = E.tipoDoc;
