// ContentMq.jsx

import { useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
import ModalMq from "./ModalMq";
import '../styles/ContentMq.css';

const { Search } = Input;

// No hay cambios en las props que recibe el componente
function ContentMq({ title, data, onCrear, onActualizar, onEliminar, onBuscar, onResetBusqueda }) {
    // 1. CAMBIO PRINCIPAL: Guardamos el objeto completo del producto, no solo el ID.
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [modal, contextHolder] = Modal.useModal();

    const handleAbrirModalCrear = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleAbrirModalEditar = () => {
        // 2. La validación ahora es más directa.
        if (!productoSeleccionado) {
            message.warning('Por favor, selecciona un producto para editar.');
            return;
        }
        setEditingProduct(productoSeleccionado);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (values) => {
        try {
            if (editingProduct) {
                // Pasamos el ID y los nuevos datos
                await onActualizar(editingProduct.id, values);
            } else {
                await onCrear(values);
            }
            setIsModalOpen(false); // Cierra el modal en éxito
            setProductoSeleccionado(null); // Deseleccionamos la fila
        } catch (error) {
            // El error ya se maneja en NavigationAdminMq, aquí no es necesario hacer más.
            console.error("Fallo el submit del modal:", error);
        }
    };



const handleConfirmarEliminar = () => {
    if (!productoSeleccionado) {
        message.warning('Por favor, selecciona un producto para eliminar.');
        return;
    }

        modal.confirm({
        title: '¿Estás seguro de que quieres eliminar este producto?',
        content: `Vas a eliminar "${productoSeleccionado.name}" (ID: ${productoSeleccionado.id}). Esta acción no se puede deshacer.`,
        okText: 'Sí, eliminar',
        okType: 'danger',
        cancelText: 'No, cancelar',
        onOk: async () => {
            try {
                await onEliminar(productoSeleccionado.id);
                setProductoSeleccionado(null);
            } catch (error) {
                console.error("Error durante la ejecución de onOk:", error);
            }
        },
    });
};

    return (
        // Se añade el nuevo className para aplicar los estilos mejorados.
        <div className="content-container-CMq">
            {contextHolder}
            <h3>{title.toUpperCase()}</h3>
            <div className="action-bar-CMq">
                <Button type="primary" onClick={handleAbrirModalCrear}>Crear Producto</Button>
                {/* 5. Los botones se habilitan/deshabilitan basados en si productoSeleccionado existe. */}
                <Button onClick={handleAbrirModalEditar} disabled={!productoSeleccionado}>Editar</Button>
                <Button danger onClick={handleConfirmarEliminar} disabled={!productoSeleccionado}>Eliminar</Button>
                <Search
                    placeholder="Buscar producto por ID"
                    allowClear
                    enterButton="Buscar"
                    style={{ width: 250 }}
                    onSearch={onBuscar}
                    onChange={(e) => !e.target.value && onResetBusqueda()}
                />
            </div>
            
            <div className="table-wrapper-CMq">
                <table className="product-table-CMq">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((producto) => (
                            // 6. Al hacer clic, guardamos el objeto 'producto' completo.
                            <tr 
                                key={producto.id} 
                                // La clase 'selected' se aplica si el ID del producto en el map coincide con el del estado.
                                className={productoSeleccionado?.id === producto.id ? 'selected-row' : ''}
                                onClick={() => setProductoSeleccionado(producto)}
                            >
                                <td>{producto.id}</td>
                                <td>
                                    {/* Mostrar la imagen pequeña usando la URL */}
                                    {producto.picture && <img src={producto.picture} alt="prod" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />}
                                </td>
                                <td>{producto.name}</td>
                                <td>{producto.brand}</td>
                                <td>${producto.price.toFixed(2)}</td>
                                <td>{producto.stock} Und</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalMq
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingProduct}
            />
        </div>
    );
}

export default ContentMq;