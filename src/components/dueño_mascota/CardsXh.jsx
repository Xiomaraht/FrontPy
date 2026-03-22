import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Form, Input, Select, DatePicker, message, Upload, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { updatePetApi } from '@/api/petsApi';
import { getSpeciesApi, getRacesBySpecieIdApi } from '@/api/dataApi';
import '@/components/styles/CardsXh.css';

const { Option } = Select;

export default function CardsXh({ mascota, onUpdate }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [species, setSpecies] = useState([]);
    const [races, setRaces] = useState([]);
    const [loadingRaces, setLoadingRaces] = useState(false);

    useEffect(() => {
        if (isModalVisible) {
            fetchSpecies();
            // Pre-cargar valores en el formulario
            form.setFieldsValue({
                ...mascota,
                birthdate: mascota.birthdate ? dayjs(mascota.birthdate) : null,
                // Si la raza está disponible, intentar cargar las razas de esa especie
                // Nota: necesitaríamos saber el specieId de la mascota si el API lo requiere
            });
        }
    }, [isModalVisible, mascota]);

    const fetchSpecies = async () => {
        try {
            const data = await getSpeciesApi();
            setSpecies(data);
        } catch (error) {
            console.error("Error fetching species:", error);
        }
    };

    const handleSpeciesChange = async (specieId) => {
        setLoadingRaces(true);
        form.setFieldsValue({ raceId: undefined });
        try {
            const data = await getRacesBySpecieIdApi(specieId);
            setRaces(data);
        } catch (error) {
            message.error("Error al cargar las razas");
        } finally {
            setLoadingRaces(false);
        }
    };

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const payload = {
                ...values,
                birthdate: values.birthdate ? values.birthdate.format('YYYY-MM-DD') : null,
                customerId: mascota.customerId,
                status: mascota.status ?? true
            };
            await updatePetApi(mascota.id, payload);
            message.success("Mascota actualizada correctamente");
            setIsModalVisible(false);
            if (onUpdate) onUpdate(); // Callback para refrescar la lista
        } catch (error) {
            message.error(error.message || "Error al actualizar la mascota");
        } finally {
            setLoading(false);
        }
    };

    const calcularEdad = (birthdate) => {
      if (!birthdate) return 'N/A';
      const today = new Date();
      const birthDate = new Date(birthdate);
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      if (today.getDate() < birthDate.getDate()) months--;
      if (months < 0) { years--; months += 12; }
      if (years > 0 && months === 0) return `${years} años`;
      if (years > 0) return `${years} años y ${months} meses`;
      if (months > 0) return `${months} meses`;
      return 'Menos de 1 mes';
    };

    return (
        <>
            <div className="cardXh_1">
                <img 
                    className="Img_Xh1" 
                    src={mascota.imageUrl || '/placeholder-pet.png'} 
                    alt={`Foto de ${mascota.name}`} 
                />
                <p className="nombre">{mascota.name}</p>
                <p className="detalle">{mascota.raceName}</p>
                <p className="detalle">{calcularEdad(mascota.birthdate)}</p>
                <p className="detalle">{mascota.gender}</p>
                <div className="botones_Xh"> 
                    <button className="bton_1" onClick={showModal}>Editar</button>
                    <Link to={'/historial'} state={{mascota : mascota}} >
                        <button className="bton_2">Historial</button>
                    </Link>
                </div>
            </div>

            <Modal
                title={`Editar Información de ${mascota.name}`}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Especie y Raza">
                        <Input.Group compact>
                            <Select 
                                style={{ width: '50%' }} 
                                placeholder="Especie" 
                                onChange={handleSpeciesChange}
                            >
                                {species.map(s => <Option key={s.id} value={s.id}>{s.name}</Option>)}
                            </Select>
                            <Form.Item
                                name="raceId"
                                noStyle
                                rules={[{ required: true, message: 'Seleccione la raza' }]}
                            >
                                <Select 
                                    style={{ width: '50%' }} 
                                    placeholder="Raza" 
                                    loading={loadingRaces}
                                    disabled={!races.length}
                                >
                                    {races.map(r => <Option key={r.id} value={r.id}>{r.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Form.Item name="birthdate" label="Fecha de Nacimiento">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item name="gender" label="Género" rules={[{ required: true }]}>
                            <Select>
                                <Option value="MACHO">Macho</Option>
                                <Option value="HEMBRA">Hembra</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Form.Item name="color" label="Color">
                            <Input />
                        </Form.Item>
                        <Form.Item name="weight" label="Peso">
                            <Input placeholder="Ej: 5kg" />
                        </Form.Item>
                    </div>

                    <Form.Item name="microchip" label="Microchip (Opcional)">
                        <Input placeholder="Número de microchip" />
                    </Form.Item>

                     <Form.Item name="imageUrl" label="URL de Imagen">
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block style={{ background: '#024059' }}>
                            Guardar Cambios
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
