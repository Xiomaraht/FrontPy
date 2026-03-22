import { Button, Modal, Row, Col, Form, message, Input, Select, Upload } from 'antd';

// =========================================================================
// SIMULACIÓN DE COMPONENTES Mq (para evitar errores de importación)
// =========================================================================

/**
 * Simulación de InputMq (maneja texto, números, precios y textarea).
 */
const InputMq = ({ placeholder, tipo, ...rest }) => {
    if (tipo === 'textarea') {
        // Usamos TextArea para el campo de Descripción del servicio
        return <Input.TextArea rows={4} placeholder={placeholder} {...rest} />;
    }
    // Para Nombre, usamos Input de texto estándar
    return <Input placeholder={placeholder} type={'text'} {...rest} />;
};

// Opciones de estado para el Selector de Servicios
const serviceStateOptions = [{ value: 1, label: 'Activo' }, { value: 0, label: 'Inactivo' }];

/**
 * Simulación de SelectorMq (fijo para seleccionar el estado del servicio).
 */
const SelectorMq = (props) => (
    <Select placeholder="Selecciona el estado" {...props}>
        {serviceStateOptions.map(option => (
            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
        ))}
    </Select>
);

/**
 * Simulación de UploadImagenMq (convierte la imagen a Base64).
 * En este modal, solo permitimos una imagen por servicio.
 */
const UploadImagenMq = ({ value, onChange }) => {
    const customUpload = (file) => {
        // Asegura que solo se procese un archivo
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => onChange(reader.result); // Base64 string
            reader.onerror = (error) => message.error('Error al leer el archivo de imagen.');
        } else {
            message.error('Solo se permiten archivos de imagen.');
        }
        return false; // Previene la subida automática de Ant Design
    };

    // Determinar si ya hay una imagen seleccionada (Base64 o URL previa)
    const isImageSelected = Boolean(value);

    return (
        <Upload
            name="imagen"
            accept="image/*"
            listType="picture"
            showUploadList={false} // No mostramos la lista de archivos subidos
            beforeUpload={customUpload}
        >
            <Button icon={<span className="material-symbols-outlined" style={{ fontSize: '18px', verticalAlign: 'middle' }}>upload</span>} style={{ width: '100%' }}>
                {isImageSelected ? 'Cambiar Imagen' : 'Subir Imagen'}
            </Button>
            {isImageSelected && <span style={{ marginLeft: 8, color: 'green' }}>Imagen cargada o URL existente.</span>}
        </Upload>
    );
};

// =========================================================================
// COMPONENTE PRINCIPAL ModalServicesLg
// =========================================================================

/**
 * Modal para la creación y edición de Servicios.
 * Estructura y campos fijos: Nombre, Descripción, Estado e Imagen.
 */
const ModalServicesLg = ({ open, onCancel, onSubmit, initialData }) => {
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    // 2. Determina si estamos en modo edición basado en initialData
    const isEditing = Boolean(initialData);

    // 3. useEffect para llenar el formulario cuando abrimos en modo edición
    useEffect(() => {
        if (open) {
            form.resetFields();
            if (isEditing && initialData) {
                // Aseguramos que 'estado' sea numérico para el Select
                const stateValue = initialData.status !== undefined ? (initialData.status ? 1 : 0) : undefined;
                
                form.setFieldsValue({
                    nombre: initialData.name,
                    descripcion: initialData.description,
                    estado: stateValue,
                    // Usamos 'picture' o 'imageUrl' como campo de imagen.
                    // Si es Base64, se envía Base64. Si es URL, se envía la URL.
                    imagen: initialData.picture || initialData.imageUrl, 
                });
            }
        }
    }, [initialData, form, isEditing, open]); 

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            // Lógica para extraer la parte Base64 (si existe)
            const pictureData = values.imagen;
            const imagenBase64 = pictureData?.includes(',') ? pictureData.split(',')[1] : pictureData;

            const serviceData = {
                name: values.nombre,
                description: values.descripcion,
                state: parseInt(values.estado, 10),
                // Usamos el campo 'picture' (o 'imageUrl') para almacenar la imagen/URL
                picture: imagenBase64 || (initialData?.picture ? initialData.picture : undefined), 
            };

            // 4. Llama a la función onSubmit que le pasaron como prop
            await onSubmit(serviceData);
            
        } catch (error) {
            console.error("Error en el formulario de servicios:", error);
            message.error('Hubo un error al procesar el formulario del servicio.');
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
            {/* Clase CSS simulada */}
            <div className='ContentFormModal-Mq' style={{ padding: '20px' }}> 
                <Form layout="vertical" form={form} onFinish={onFinish} initialValues={{ remember: true }}>
                    <Row gutter={16}>
                        {/* 1. Nombre (InputMq) */}
                        <Col span={12}>
                            <Form.Item label="Nombre del servicio" name="nombre" rules={[{ required: true, message: 'El nombre es obligatorio' }]}>
                                <InputMq placeholder={"Nombre"} tipo={"text"} />
                            </Form.Item>
                        </Col>
                        {/* 2. Estado (SelectorMq) */}
                        <Col span={12}>
                            <Form.Item label="Estado del servicio" name="estado" rules={[{ required: true, message: 'El estado es obligatorio' }]}>
                                <SelectorMq />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {/* 3. Descripción (InputMq tipo textarea) */}
                    <Form.Item label="Descripción del servicio" name="descripcion" rules={[{ required: true, message: 'La descripción es obligatoria' }]}>
                        <InputMq placeholder={"Descripción detallada"} tipo={"textarea"} />
                    </Form.Item>

                    {/* 4. Imagen (UploadImagenMq) */}
                    <Form.Item label="Imagen del servicio" name="imagen">
                        <UploadImagenMq />
                    </Form.Item>
                    
                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button type="primary" htmlType="submit" size="large" loading={submitting}>
                            {isEditing ? 'Actualizar Servicio' : 'Crear Servicio'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
};

export default ModalServicesLg;
