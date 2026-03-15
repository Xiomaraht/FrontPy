import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Spin, Row, Col, Typography, Divider } from 'antd';
import { ShoppingOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined, InfoCircleOutlined, IdcardOutlined } from '@ant-design/icons';
import { obtenerClinicaPorId, actualizarClinica } from '@/api/veterinaryClinicApi';
import '@/components/styles/ProfileVetLg.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ProfileVetLg = ({ clinicId }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [clinicData, setClinicData] = useState(null);

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                setLoading(true);
                const data = await obtenerClinicaPorId(clinicId);
                setClinicData(data);
                form.setFieldsValue(data);
            } catch (error) {
                message.error("Error al cargar los datos de la clínica");
            } finally {
                setLoading(false);
            }
        };

        if (clinicId) fetchClinic();
    }, [clinicId, form]);

    const onFinish = async (values) => {
        try {
            setSaving(true);
            await actualizarClinica(clinicId, values);
            message.success("Perfil de la clínica actualizado correctamente");
        } catch (error) {
            message.error("Error al actualizar el perfil");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading-container"><Spin size="large" /></div>;

    return (
        <div className="profile-vet-container">
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={8}>
                    <Card className="profile-info-card" cover={
                        <div className="profile-cover">
                            {clinicData?.picture ? (
                                <img src={clinicData.picture} alt="Clinic" className="profile-img" />
                            ) : (
                                <div className="profile-placeholder">
                                    <ShoppingOutlined style={{ fontSize: 64, color: '#fff' }} />
                                </div>
                            )}
                        </div>
                    }>
                        <div className="profile-card-content">
                            <Title level={3}>{clinicData?.name || 'Veterinaria'}</Title>
                            <Text type="secondary"><IdcardOutlined /> NIT: {clinicData?.nit || 'No definido'}</Text>
                            <Divider />
                            <div className="info-item">
                                <EnvironmentOutlined /> <Text>{clinicData?.address}</Text>
                            </div>
                            <div className="info-item">
                                <PhoneOutlined /> <Text>{clinicData?.phone}</Text>
                            </div>
                            <div className="info-item">
                                <MailOutlined /> <Text>{clinicData?.email}</Text>
                            </div>
                            <div className="info-item">
                                <ClockCircleOutlined /> <Text>{clinicData?.openingHours || 'No definido'}</Text>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={16}>
                    <Card className="profile-edit-card" title="Editar Información de la Clínica">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={clinicData}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="name"
                                        label="Nombre de la Clínica"
                                        rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
                                    >
                                        <Input prefix={<ShoppingOutlined />} placeholder="Nombre comercial" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="nit"
                                        label="NIT"
                                        rules={[{ required: true, message: 'Por favor ingrese el NIT' }]}
                                    >
                                        <Input prefix={<IdcardOutlined />} placeholder="NIT de la empresa" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Teléfono de Contacto"
                                        rules={[{ required: true, message: 'Por favor ingrese el teléfono' }]}
                                    >
                                        <Input prefix={<PhoneOutlined />} placeholder="Teléfono" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="email"
                                        label="Correo Electrónico"
                                        rules={[{ required: true, type: 'email', message: 'Por favor ingrese un email válido' }]}
                                    >
                                        <Input prefix={<MailOutlined />} placeholder="Email de contacto" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name="address"
                                label="Dirección"
                                rules={[{ required: true, message: 'Por favor ingrese la dirección' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="Dirección completa" />
                            </Form.Item>

                            <Form.Item
                                name="openingHours"
                                label="Horario de Atención"
                            >
                                <Input prefix={<ClockCircleOutlined />} placeholder="Ej: Lunes a Viernes 8:00 AM - 6:00 PM" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Descripción de la Clínica"
                            >
                                <TextArea 
                                    rows={4} 
                                    placeholder="Cuéntanos sobre tu veterinaria, especialidades, etc."
                                    maxLength={1000}
                                    showCount
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={saving} block size="large">
                                    Guardar Cambios
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProfileVetLg;
