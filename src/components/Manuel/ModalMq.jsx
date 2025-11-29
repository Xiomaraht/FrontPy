import { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Form, message } from 'antd';
import InputMq from './InputMq';
import "../styles/ModalMq.css";
import SelectorMq from './SelectorMq';
import UploadImagenMq from './UploadImageMq';

// 1. El modal ahora recibe más props para ser controlado desde fuera
const ModalMq = ({ open, onCancel, onSubmit, initialData }) => {
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    // 2. Determina si estamos en modo edición basado en initialData
    const isEditing = Boolean(initialData);

    // 3. useEffect para llenar el formulario cuando abrimos en modo edición
useEffect(() => {
        if (isEditing && initialData) {
            // Mapeamos los datos del producto a los nombres de los campos del formulario
            form.setFieldsValue({
                nombre: initialData.name,
                marca: initialData.brand,
                stock: initialData.stock,
                precio: initialData.price,
                descripcion: initialData.description,
                selector: initialData.categories?.[0]?.id,
                imagen: initialData.picture || null
                // El campo de imagen no se puede pre-llenar con un archivo, 
                // pero podrías mostrar la imagen actual si tuvieras la URL.
                // Por ahora, lo dejamos así.
            });
        } else {
            // Si no estamos editando, limpiamos el formulario
            form.resetFields();
        }
    // Agregamos 'open' a las dependencias para que el efecto se ejecute cada vez que el modal se abre.
    }, [initialData, form, isEditing, open]); 

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            const imagenUrl = values.imagen;
            
            const productData = {
                name: values.nombre,
                picture: imagenUrl,
                price: parseFloat(values.precio),
                stock: parseInt(values.stock, 10),
                brand: values.marca,
                description: values.descripcion,
                categories: [{ id: parseInt(values.selector, 10) }]
            };

            // 4. Llama a la función onSubmit que le pasaron como prop
            await onSubmit(productData);
            
            // Los mensajes de éxito/error y el cierre del modal ahora se manejan en el padre

        } catch (error) {
            console.error("Error en el formulario:", error);
            message.error('Hubo un error al procesar el formulario.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        // El <Button> para abrir el modal se movió a ContentMq
        <Modal
            title={<p>{isEditing ? 'Editar Producto' : 'Crear un Nuevo Producto'}</p>}
            footer={null}
            open={open}
            onCancel={onCancel}
            destroyOnClose
        >
            <div className='ContentFormModal-Mq'>
                <Form layout="vertical" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
                    {/* Campos del formulario (sin cambios en su estructura) */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Nombre del producto" name="nombre" rules={[{ required: true, message: 'El nombre es obligatorio' }]}>
                                <InputMq placeholder={"Nombre"} tipo={"text"} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Marca del producto" name="marca" rules={[{ required: true, message: 'La marca es obligatoria' }]}>
                                <InputMq placeholder={"Marca"} tipo={"text"} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Stock del producto" name="stock" rules={[{ required: true, message: 'El stock es obligatorio' }]}>
                                <InputMq placeholder={"Stock"} tipo={"number"} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Precio del producto" name="precio" rules={[{ required: true, message: 'El precio es obligatorio' }]}>
                                <InputMq placeholder={"0.00"} tipo={"prices"} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Descripción del producto" name="descripcion" rules={[{ required: true, message: 'La descripción es obligatoria' }]}>
                        <InputMq placeholder={"Descripción"} tipo={"textarea"} />
                    </Form.Item>
                    <Form.Item label="Categoría del producto" name="selector" rules={[{ required: true, message: 'Debes seleccionar una categoría' }]}>
                        <SelectorMq />
                    </Form.Item>
                    <Form.Item label="Imagen del producto" name="imagen">
                        <UploadImagenMq />
                    </Form.Item>
                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button type="primary" htmlType="submit" size="large" loading={submitting}>
                            {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
};

export default ModalMq;