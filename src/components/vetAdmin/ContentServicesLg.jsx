import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, message, Row, Col, Form, Select, Upload } from 'antd';
import { uploadImageToCloudinary } from '@/utilities/useImageUploader'
import '@/components/styles/ContentMq.css'; 

// ======================================================================
// 🧩 COMPONENTES AUXILIARES
// ======================================================================

const InputMq = ({ placeholder, tipo, ...rest }) => {
    if (tipo === 'textarea') {
        return <Input.TextArea rows={4} placeholder={placeholder} {...rest} />;
    }
    return <Input placeholder={placeholder} type={'text'} {...rest} />;
};

const serviceStateOptions = [
    { value: 1, label: 'Activo' },
    { value: 0, label: 'Inactivo' }
];

const SelectorMq = (props) => (
    <Select placeholder="Selecciona el estado" {...props}>
        {serviceStateOptions.map(option => (
            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
        ))}
    </Select>
);

/**
 * UploadImagenMq:
 * - Sube la imagen a un servicio en la nube (ej. Cloudinary).
 * - Almacena la URL resultante en el estado del formulario.
 */
const UploadImagenMq = ({ value, onChange }) => {
    const [loading, setLoading] = useState(false);

    const handleCustomRequest = async ({ file, onSuccess, onError }) => {
        setLoading(true);
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('¡Solo puedes subir archivos JPG/PNG!');
            setLoading(false);
            return;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('¡La imagen debe ser menor a 2MB!');
            setLoading(false);
            return;
        }

        try {
            const url = await uploadImageToCloudinary(file);
            onSuccess(url, file); // Notifica a Antd que la subida fue exitosa
            onChange?.(url); // Actualiza el valor del formulario con la URL
            message.success('Imagen subida correctamente.');
        } catch (error) {
            onError(error);
            message.error('Error al subir la imagen.');
        } finally {
            setLoading(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? (
                <span className="material-symbols-outlined spinning">sync</span>
            ) : (
                <span className="material-symbols-outlined">add</span>
            )}
            <div style={{ marginTop: 8 }}>Subir</div>
        </div>
    );

    return (
        <Upload
            name="imagen"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={handleCustomRequest}
        >
            {value ? <img src={value} alt="Vista previa" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
    );
};


// ======================================================================
// 🧰 MODAL PARA CREAR Y EDITAR SERVICIOS
// ======================================================================

const ModalServicesLg = ({ open, onCancel, onSubmit, initialData }) => {
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();
    const isEditing = Boolean(initialData);

    useEffect(() => {
        if (open) {
            form.resetFields();
            if (isEditing && initialData) {
                form.setFieldsValue({
                    nombre: initialData.name,
                    descripcion: initialData.description,
                    estado: initialData.status ? 1 : 0,
                    imagen: initialData.picture, // Usamos picture consistentemente
                });
            }
        }
    }, [initialData, form, isEditing, open]);

    /**
     * onFinish:
     * - Se ejecuta al enviar el formulario.
     * - Prepara los datos, incluyendo la URL de la imagen, y los pasa al padre.
     */
    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            const serviceData = {
                name: values.nombre,
                description: values.descripcion,
                status: values.estado === 1,
                // ✅ Asigna la URL directamente. Si no hay una nueva, se mantiene la anterior o es undefined.
                imageUrl: values.imagen || initialData?.picture || undefined,
            };
            await onSubmit(serviceData);
        } catch (error) {
            console.error("Error en el formulario de servicios:", error);
            message.error('Hubo un error al procesar el formulario.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            title={<p>{isEditing ? 'Editar Servicio' : 'Crear un Nuevo Servicio'}</p>}
            footer={null}
            open={open}
            onCancel={onCancel}
            destroyOnClose
        >
            <div className='ContentFormModal-Mq modal-content-padding-Mq'>
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Nombre del servicio" name="nombre" rules={[{ required: true, message: 'El nombre es obligatorio' }]}>
                                <InputMq placeholder="Nombre" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Estado del servicio" name="estado" rules={[{ required: true, message: 'El estado es obligatorio' }]}>
                                <SelectorMq />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Descripción del servicio" name="descripcion" rules={[{ required: true, message: 'La descripción es obligatoria' }]}>
                        <InputMq placeholder="Descripción detallada" tipo="textarea" />
                    </Form.Item>

                    <Form.Item label="Imagen del servicio" name="imagen">
                        <UploadImagenMq />
                    </Form.Item>

                    <div className="modal-footer-actions-Mq">
                        <Button type="primary" htmlType="submit" size="large" loading={submitting}>
                            {isEditing ? 'Actualizar Servicio' : 'Crear Servicio'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
};


// ======================================================================
// 🧠 COMPONENTE PRINCIPAL DE ADMINISTRACIÓN
// ======================================================================

function ContentServicesLg({ title, data, onCrear, onActualizar, onEliminar, onBuscar, onResetBusqueda }) {
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [modal, contextHolder] = Modal.useModal();

    const handleAbrirModalCrear = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleAbrirModalEditar = () => {
        if (!servicioSeleccionado) {
            message.warning('Por favor, selecciona un servicio para editar.');
            return;
        }
        setEditingService(servicioSeleccionado);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (values) => {
        try {
            if (editingService) {
                await onActualizar(editingService.id, values);
                message.success('Servicio actualizado correctamente.');
            } else {
                await onCrear(values);
                message.success('Servicio creado correctamente.');
            }
            setIsModalOpen(false);
            setServicioSeleccionado(null);
        } catch (error) {
            console.error("Fallo el submit del modal:", error);
            // El error se maneja dentro del modal, no es necesario mostrar otro mensaje aquí.
            throw error;
        }
    };

    const handleConfirmarEliminar = () => {
        if (!servicioSeleccionado) {
            message.warning('Por favor, selecciona un servicio para eliminar.');
            return;
        }
        modal.confirm({
            title: '¿Estás seguro de que quieres eliminar este servicio?',
            content: `Vas a eliminar "${servicioSeleccionado.name}" (ID: ${servicioSeleccionado.id}). Esta acción no se puede deshacer.`,
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'No, cancelar',
            onOk: async () => {
                try {
                    await onEliminar(servicioSeleccionado.id);
                    setServicioSeleccionado(null);
                    message.success('Servicio eliminado correctamente.');
                } catch (error) {
                    console.error("Error durante la eliminación:", error);
                    message.error('Error al eliminar el servicio.');
                }
            },
        });
    };

    return (
        <div className="content-container-CMq">
            {contextHolder}
            <h3>{title.toUpperCase()}</h3>
            <div className="action-bar-CMq">
                <Button type="primary" onClick={handleAbrirModalCrear} size="large">Crear Servicio</Button>
                <Button onClick={handleAbrirModalEditar} disabled={!servicioSeleccionado} size="large">Editar</Button>
                <Button danger onClick={handleConfirmarEliminar} disabled={!servicioSeleccionado} size="large">Eliminar</Button>
                <Input.Search
                    placeholder="Buscar servicio por ID"
                    allowClear
                    enterButton="Buscar"
                    className="search-CMq"
                    onSearch={onBuscar}
                    onChange={(e) => !e.target.value && onResetBusqueda()}
                />
            </div>

            <div className="table-wrapper-CMq">
                <table className="product-table-CMq">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((servicio) => (
                            <tr
                                key={servicio.id}
                                onClick={() => setServicioSeleccionado(servicio)}
                                className={servicioSeleccionado?.id === servicio.id ? 'selected-row' : ''}
                            >
                                <td>{servicio.id}</td>
                                <td>{servicio.name}</td>
                                <td>{servicio.description}</td>
                                <td>{servicio.status ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    {/* ✅ Muestra una miniatura de la imagen */}
                                    {servicio.picture ? (
                                        <img src={servicio.picture} alt={servicio.name} style={{ width: '60px', height: 'auto', borderRadius: '4px' }} />
                                    ) : (
                                        'No'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalServicesLg
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingService}
            />
        </div>
    );
}

export default ContentServicesLg;