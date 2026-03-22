import React, { useState, useEffect } from 'react';
import { obtenerCitasPorCliente } from '@/api/appointmentsApi';
import { Table, Tag, Spin, Empty, Card, Typography } from 'antd';
import '@/components/styles/HistorialPe_Xh.css'; // Reuso estilos base

const { Title } = Typography;

export default function ConsultasSectionXh({ customerId }) {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        if (!customerId) return;
        const data = await obtenerCitasPorCliente(customerId);
        setConsultas(data);
      } catch (error) {
        console.error("Error fetching internal appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultas();
  }, [customerId]);

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'appointmentDate',
      key: 'date',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Hora',
      dataIndex: 'appointmentTime',
      key: 'time',
    },
    {
      title: 'Veterinaria',
      dataIndex: 'veterinaryClinic',
      key: 'clinic',
      render: (clinic) => clinic?.name || 'N/A',
    },
    {
      title: 'Servicio',
      dataIndex: 'service',
      key: 'service',
      render: (service) => service?.name || 'Consulta General',
    },
    {
      title: 'Motivo',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'gold';
        if (status === 'COMPLETED' || status === 'CONFIRMED') color = 'green';
        if (status === 'CANCELLED') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;

  return (
    <div className="Consultas">
      <h2 className="titulo-seccion">Mis Consultas y Citas</h2>
      <p className="subtitulo-seccion" style={{marginBottom: '20px'}}>Aquí puedes ver el estado de tus citas programadas en diferentes veterinarias.</p>
      
      <div className="table-container-xh">
           <Table 
            dataSource={consultas} 
            columns={columns} 
            rowKey="id" 
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
          />
      </div>
    </div>
  );
}
