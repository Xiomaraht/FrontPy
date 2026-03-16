import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, DatePicker, TimePicker, Button, message, Steps, Row, Col, Input, Typography } from 'antd';
import { getPetsByCustomerIdApi } from '@/api/petsApi';
import { obtenerServicios } from '@/api/servicesApi';
import { createAppointmentApi } from '@/api/appointmentsApi';
import dayjs from 'dayjs';

const { Step } = Steps;
const { Title, Text } = Typography;

const BookingModalMq = ({ open, onCancel, clinicId, clinicName, customerId }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [pets, setPets] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            fetchInitialData();
            setCurrentStep(0);
            form.resetFields();
        }
    }, [open]);

    const fetchInitialData = async () => {
        try {
            const [petsData, servicesData] = await Promise.all([
                getPetsByCustomerIdApi(customerId),
                obtenerServicios()
            ]);
            setPets(petsData);
            setServices((servicesData || []).filter(s => s.status === true || s.state === 1));
        } catch (error) {
            message.error("Error al cargar datos para el agendamiento");
        }
    };

    const handleNext = async () => {
        try {
            await form.validateFields();
            setCurrentStep(currentStep + 1);
        } catch (error) {
            // Validaciones fallidas
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const appointmentData = {
                appointmentDate: values.date.format('YYYY-MM-DD'),
                appointmentTime: values.time.format('HH:mm'),
                clinicId: clinicId,
                customerId: customerId,
                petId: values.petId,
                serviceId: values.serviceId,
                reason: values.reason || 'Consulta general',
                status: 'PENDING'
            };
            await createAppointmentApi(appointmentData);
            message.success('¡Cita agendada exitosamente! Ya puedes verla en tu historial.');
            onCancel();
        } catch (error) {
            message.error(error.message || "Error al agendar la cita");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={<Title level={4} style={{ margin: 0 }}><span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>medical_services</span> Agendar Cita en {clinicName}</Title>}
            open={open}
            onCancel={onCancel}
            footer={null}
            width={650}
            centered
            className="booking-modal-premium"
        >
            <Steps current={currentStep} style={{ marginBottom: 32, padding: '0 20px' }}>
                <Step title="Servicio" icon={<span className="material-symbols-outlined">medical_services</span>} />
                <Step title="Mascota" icon={<span className="material-symbols-outlined">pets</span>} />
                <Step title="Horario" icon={<span className="material-symbols-outlined">calendar_month</span>} />
            </Steps>

            <Form form={form} layout="vertical" onFinish={onFinish} style={{ padding: '0 10px' }}>
                {currentStep === 0 && (
                    <div className="step-content">
                        <Form.Item label="¿Qué servicio necesitas?" name="serviceId" rules={[{ required: true, message: 'Elige un servicio' }]}>
                            <Select size="large" placeholder="Selecciona un servicio">
                                {services.map(s => (
                                    <Select.Option key={s.id} value={s.id}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{s.name}</span>
                                            <Text type="secondary" strong>${s.price}</Text>
                                        </div>
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Motivo de la consulta" name="reason">
                            <Input.TextArea rows={4} placeholder="Cuéntanos un poco por qué agendas esta cita..." showCount maxLength={200} />
                        </Form.Item>
                        <div style={{ textAlign: 'right', marginTop: 20 }}>
                            <Button type="primary" size="large" onClick={handleNext} style={{ borderRadius: '8px', padding: '0 40px' }}>
                                Siguiente
                            </Button>
                        </div>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="step-content">
                        <Form.Item label="¿Para qué mascota es la cita?" name="petId" rules={[{ required: true, message: 'Elige una mascota' }]}>
                            <Select size="large" placeholder="Selecciona tu mascota">
                                {pets.map(p => (
                                    <Select.Option key={p.id} value={p.id}>
                                        {p.name} <Text type="secondary">({p.breed})</Text>
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
                            <Button size="large" onClick={() => setCurrentStep(0)} style={{ borderRadius: '8px' }}>Regresar</Button>
                            <Button type="primary" size="large" onClick={handleNext} style={{ borderRadius: '8px', padding: '0 40px' }}>
                                Siguiente
                            </Button>
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="step-content">
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item label="Fecha" name="date" rules={[{ required: true, message: 'Elige una fecha' }]}>
                                    <DatePicker 
                                        size="large" 
                                        style={{ width: '100%' }} 
                                        disabledDate={(current) => current && current < dayjs().startOf('day')} 
                                        format="DD/MM/YYYY"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Hora" name="time" rules={[{ required: true, message: 'Elige una hora' }]}>
                                    <TimePicker 
                                        size="large" 
                                        format="HH:mm" 
                                        minuteStep={30} 
                                        style={{ width: '100%' }} 
                                        suffixIcon={<span className="material-symbols-outlined">schedule</span>}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="booking-summary" style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                            <Text type="secondary">Estás agendando en:</Text> <Text strong>{clinicName}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
                            <Button size="large" onClick={() => setCurrentStep(1)} style={{ borderRadius: '8px' }}>Regresar</Button>
                            <Button type="primary" size="large" htmlType="submit" loading={loading} style={{ borderRadius: '8px', padding: '0 40px', background: '#52c41a' }}>
                                Confirmar Agendamiento
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </Modal>
    );
};

export default BookingModalMq;
