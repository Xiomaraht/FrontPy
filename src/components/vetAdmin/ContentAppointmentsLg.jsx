import React from 'react';
import { Button, message, Tag } from 'antd';
import '@/components/styles/ContentMq.css'; 

function ContentAppointmentsLg({ title, data, onActualizarEstado }) {
    
    const getStatusTag = (status) => {
        switch (status) {
            case 'PENDING': return <Tag color="gold">Pendiente</Tag>;
            case 'CONFIRMED': return <Tag color="blue">Confirmada</Tag>;
            case 'COMPLETED': return <Tag color="green">Completada</Tag>;
            case 'CANCELLED': return <Tag color="red">Cancelada</Tag>;
            default: return <Tag>{status}</Tag>;
        }
    };

    return (
        <div className="content-container-CMq">
            <h3>{title.toUpperCase()}</h3>
            
            <div className="table-wrapper-CMq">
                <table className="product-table-CMq">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Cliente</th>
                            <th>Servicio</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.appointmentDate}</td>
                                <td>{cita.appointmentTime}</td>
                                <td>{cita.customerName || `Cliente #${cita.customer?.id}`}</td>
                                <td>{cita.serviceName || cita.service?.name}</td>
                                <td>{cita.reason}</td>
                                <td>{getStatusTag(cita.status)}</td>
                                <td>
                                    {cita.status === 'PENDING' && (
                                        <Button 
                                            size="small" 
                                            onClick={() => onActualizarEstado(cita.id, 'CONFIRMED')}
                                        >
                                            Confirmar
                                        </Button>
                                    )}
                                    {cita.status === 'CONFIRMED' && (
                                        <Button 
                                            size="small" 
                                            onClick={() => onActualizarEstado(cita.id, 'COMPLETED')}
                                        >
                                            Completar
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.length === 0 && <p style={{textAlign: 'center', padding: '20px'}}>No hay citas agendadas.</p>}
            </div>
        </div>
    );
}

export default ContentAppointmentsLg;
