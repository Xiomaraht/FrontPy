import React, { useEffect, useState } from 'react';
import { Card, Button, message, Spin, Tag, Typography, Row, Col } from 'antd';
import { obtenerPlanes, obtenerSuscripcionClinica, suscribirClinica } from '@/api/subscriptionApi';
import '@/components/styles/ContentSubscriptionLg.css';

const { Title, Text, Paragraph } = Typography;

const ContentSubscriptionLg = ({ clinicId }) => {
    const [planes, setPlanes] = useState([]);
    const [suscripcionActual, setSuscripcionActual] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [planesData, subData] = await Promise.all([
                obtenerPlanes(),
                obtenerSuscripcionClinica(clinicId).catch(() => null)
            ]);
            setPlanes(planesData);
            setSuscripcionActual(subData);
        } catch (error) {
            message.error("Error al cargar datos de suscripción");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (clinicId) fetchData();
    }, [clinicId]);

    const handleSuscribir = async (planId) => {
        try {
            await suscribirClinica(clinicId, planId);
            message.success("Suscripción actualizada correctamente");
            fetchData();
        } catch (error) {
            message.error("Error al procesar la suscripción: " + (error.message || error));
        }
    };

    if (loading) return <div className="loading-container"><Spin size="large" /></div>;

    return (
        <div className="subscription-container-Lg">
            <header className="subscription-header">
                <Title level={2}>Gestión de Suscripción</Title>
                {suscripcionActual ? (
                    <Card className="current-sub-card">
                        <Row gutter={16} align="middle">
                            <Col span={16}>
                                <Title level={4}>Plan Actual: <Text type="primary">{suscripcionActual.planName}</Text></Title>
                                <Paragraph>
                                    Estado: <Tag color={suscripcionActual.status === 'ACTIVE' ? 'green' : 'red'}>
                                        {suscripcionActual.status === 'ACTIVE' ? 'ACTIVO' : suscripcionActual.status}
                                    </Tag>
                                </Paragraph>
                                <Text>Vence el: <strong>{new Date(suscripcionActual.endDate).toLocaleDateString()}</strong></Text>
                            </Col>
                            <Col span={8} className="text-right">
                                <Button type="default" danger>Cancelar Suscripción</Button>
                            </Col>
                        </Row>
                    </Card>
                ) : (
                    <Card className="no-sub-card">
                        <Text type="warning">No tienes una suscripción activa. Elige un plan para comenzar.</Text>
                    </Card>
                )}
            </header>

            <section className="plans-section">
                <Title level={3}>Planes Disponibles</Title>
                <Row gutter={[24, 24]}>
                    {planes.map(plan => (
                        <Col key={plan.id} xs={24} sm={12} lg={8}>
                            <Card 
                                hoverable 
                                className={`plan-card ${suscripcionActual?.planId === plan.id ? 'active-plan' : ''}`}
                                title={plan.name}
                                extra={<Text strong>${plan.price}</Text>}
                            >
                                <Paragraph>{plan.description}</Paragraph>
                                <Text type="secondary">Duración: {plan.durationDays} días</Text>
                                <div className="plan-actions">
                                    <Button 
                                        type="primary" 
                                        block 
                                        onClick={() => handleSuscribir(plan.id)}
                                        disabled={suscripcionActual?.planId === plan.id}
                                    >
                                        {suscripcionActual?.planId === plan.id ? 'Plan Actual' : 'Seleccionar Plan'}
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </div>
    );
};

export default ContentSubscriptionLg;
