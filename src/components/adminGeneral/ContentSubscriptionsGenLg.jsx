import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, message, Modal, Select } from 'antd';
import { obtenerTodasLasSuscripcionesGen, actualizarEstadoSuscripcionGen, cancelarSuscripcionGen } from '@/api/subscriptionApi';
import '@/components/adminGeneral/ContentSubscriptionsGenLg.css';

const { Option } = Select;

const ContentSubscriptionsGenLg = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscriptions = async () => {
        try {
            setLoading(true);
            const data = await obtenerTodasLasSuscripcionesGen();
            setSubscriptions(data);
        } catch (error) {
            message.error("Error al cargar las suscripciones");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await actualizarEstadoSuscripcionGen(id, newStatus);
            message.success("Estado actualizado correctamente");
            fetchSubscriptions();
        } catch (error) {
            message.error("Error al actualizar estado");
        }
    };

    const handleCancel = (id) => {
        Modal.confirm({
            title: '¿Estás seguro de que deseas cancelar esta suscripción?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, cancelar',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await cancelarSuscripcionGen(id);
                    message.success("Suscripción cancelada");
                    fetchSubscriptions();
                } catch (error) {
                    message.error("Error al cancelar la suscripción");
                }
            },
        });
    };

    const columns = [
        {
            title: 'Clínica',
            dataIndex: 'clinicName',
            key: 'clinicName',
            render: (text, record) => (
                <div className="clinic-info">
                    <strong>{text}</strong>
                    <div className="clinic-subtext">ID: {record.clinicId}</div>
                </div>
            )
        },
        {
            title: 'Plan',
            dataIndex: 'planName',
            key: 'planName',
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Fecha Inicio',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => new Date(date).toLocaleDateString()
        },
        {
            title: 'Fecha Fin',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => new Date(date).toLocaleDateString()
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    defaultValue={status}
                    style={{ width: 120 }}
                    onChange={(value) => handleStatusChange(record.id, value)}
                >
                    <Option value="ACTIVE">Activa</Option>
                    <Option value="EXPIRED">Expirada</Option>
                    <Option value="CANCELLED">Cancelada</Option>
                    <Option value="PENDING">Pendiente</Option>
                </Select>
            )
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        danger 
                        type="link" 
                        onClick={() => handleCancel(record.id)}
                        disabled={record.status === 'CANCELLED'}
                    >
                        Cancelar
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="subscriptions-gen-container">
            <div className="subscriptions-header">
                <h2>Gestión de Suscripciones</h2>
                <p>Monitorea y controla el estado de las suscripciones de todas las veterinarias registradas.</p>
            </div>
            
            <div className="subscriptions-stats">
              <div className="stat-card">
                <h3>Total Suscripciones</h3>
                <span>{subscriptions.length}</span>
              </div>
              <div className="stat-card active">
                <h3>Activas</h3>
                <span>{subscriptions.filter(s => s.status === 'ACTIVE').length}</span>
              </div>
              <div className="stat-card pending">
                <h3>Pendientes</h3>
                <span>{subscriptions.filter(s => s.status === 'PENDING').length}</span>
              </div>
            </div>

            <Table 
                columns={columns} 
                dataSource={subscriptions} 
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                className="custom-table"
            />
        </div>
    );
};

export default ContentSubscriptionsGenLg;
