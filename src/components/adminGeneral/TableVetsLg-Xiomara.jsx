// src/components/Laura/TableVetsLg.jsx
import React from 'react';
import '@/components/styles/TableVetsLg.css';

// Las columnas por defecto (pueden ser las de veterinarias o un set genérico)
// Ahora se usarán SOLO si no se pasa la prop 'columns'.
const DEFAULT_TABLE_COLUMNS = [
    {
        header: 'Foto',
        accessor: 'imageUrl',
        width: '80px',
        render: (item) => ( // 'item' es el objeto de datos de la fila (ej. un veterinario o un administrador)
            item.imageUrl ? (
                <img
                    src={item.imageUrl}
                    alt={`Foto de ${item.name}`}
                    className="vet-table-image"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
            ) : (
                <span className="material-symbols-outlined vet-placeholder-icon">
                    local_hospital {/* Icono por defecto si no hay foto */}
                </span>
            )
        ),
    },
    { header: 'Nombre', accessor: 'name', width: '250px' },
    { header: 'Identificación', accessor: 'identification', width: '200px' },
    { header: 'Estado', accessor: 'status', width: '120px' },
    { 
        header: 'Suscripción', 
        accessor: 'subscriptionStatus', 
        width: '150px',
        render: (item) => (
            <span style={{ 
                color: item.subscriptionStatus === 'ACTIVE' ? '#52c41a' : '#ff4d4f',
                fontWeight: 'bold'
            }}>
                {item.subscriptionStatus === 'ACTIVE' ? 'ACTIVA' : 'INACTIVA'}
            </span>
        )
    },
    // Puedes añadir más columnas por defecto si lo deseas
];

// Ahora, el componente acepta 'columns' como una prop.
// Si no se pasa, usará DEFAULT_TABLE_COLUMNS.
export default function TableVetsLg({ data, onRowClick, columns = DEFAULT_TABLE_COLUMNS }) {
    // Usamos las columnas pasadas por props, o las por defecto si no se especifican
    const columnsToRender = columns;

    return (
        <div className="custom-table-wrapper">
            {/* Tabla para el encabezado fijo */}
            <table className="vet-header-table">
                <thead>
                    <tr>
                        {columnsToRender.map(col => ( // Usamos columnsToRender
                            <th key={col.accessor || col.header} style={{ width: col.width }}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
            </table>

            {/* Contenedor del cuerpo de la tabla con scroll */}
            <div className="vet-body-scroll-container">
                <table className="vet-body-table">
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} onClick={() => onRowClick(item)}>
                                {columnsToRender.map(col => ( // Usamos columnsToRender
                                    <td key={col.accessor || col.header} style={{ width: col.width }}>
                                        {/* Si la columna tiene una función 'render', la usamos; de lo contrario, mostramos el valor directo */}
                                        {col.render ? col.render(item) : item[col.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}