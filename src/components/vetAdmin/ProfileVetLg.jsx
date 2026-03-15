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
    const [fotoFile, setFotoFile] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);

    useEffect(() => {
        const fetchClinic = async () => {
            try {
                setLoading(true);
                const data = await obtenerClinicaPorId(clinicId);
                setClinicData(data);
                setFotoPreview(data.picture);
                form.setFieldsValue(data);
            } catch (error) {
                message.error("Error al cargar los datos de la clínica");
            } finally {
                setLoading(false);
            }
        };

        if (clinicId) fetchClinic();
    }, [clinicId, form]);

    const handleImagen = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFotoPreview(URL.createObjectURL(file));
            setFotoFile(file);
        }
    };

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnzom8pgh/image/upload';
    const UPLOAD_PRESET = 'ml_default';

    const uploadImageToCloudinary = async (imageFile) => {
        if (!imageFile) return clinicData.picture;
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', UPLOAD_PRESET);
        const response = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
        const data = await response.json();
        return data.secure_url;
    };

    const onFinish = async (values) => {
        try {
            setSaving(true);
            let pictureUrl = clinicData.picture;
            if (fotoFile) {
                pictureUrl = await uploadImageToCloudinary(fotoFile);
            }
            
            const payload = { ...values, picture: pictureUrl };
            await actualizarClinica(clinicId, payload);
            setClinicData(prev => ({ ...prev, ...payload }));
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
                        <div className="profile-cover" style={{ position: 'relative', cursor: 'pointer' }}>
                            {fotoPreview ? (
                                <img src={fotoPreview} alt="Clinic" className="profile-img" />
                            ) : (
                                <div className="profile-placeholder">
                                    <ShoppingOutlined style={{ fontSize: 64, color: '#fff' }} />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImagen}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                            />
                            <div className="edit-overlay" style={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                padding: '5px 10px',
                                borderRadius: '20px',
                                fontSize: '12px'
                            }}>
                                <IdcardOutlined /> Cambiar foto
                            </div>
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
