import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Sidebar from '@/components/vetAdmin/SidebarMq';
import ContentMq from '@/components/vetAdmin/ContentMq';
import ContentServicesLg from '@/components/vetAdmin/ContentServicesLg'; // 1. IMPORTAR COMPONENTE DE SERVICIOS
import ContentAppointmentsLg from '@/components/vetAdmin/ContentAppointmentsLg';
import '@/components/styles/NavigationAdminMq.css';
import { 
    obtenerProductos, 
    eliminarProducto, 
    actualizarProducto, 
    crearProducto,
    obtenerProductoPorId
} from '@/api/productsApi';
// 2. IMPORTAR FUNCIONES DE API PARA SERVICIOS
import {
    obtenerServicios,
    eliminarServicio,
    actualizarServicio,
    crearServicio,
    obtenerServicioPorId
} from '@/api/servicesApi'; 

import { 
    obtenerCitasPorClinica, 
    actualizarEstadoCita 
} from '@/api/appointmentsApi';

import { logout } from '@/api/authApi';
import ContentSubscriptionLg from '@/components/vetAdmin/ContentSubscriptionLg';
import ContentClientsLg from '@/components/vetAdmin/ContentClientsLg';
import ContentPetsLg from '@/components/vetAdmin/ContentPetsLg';
import ContentOrdersLg from '@/components/vetAdmin/ContentOrdersLg';
import ProfileVetLg from '@/components/vetAdmin/ProfileVetLg';

// APIs para Clientes, Mascotas y Pedidos
import { obtenerClientesPorClinica } from '@/api/customerApi'; // Necesitará ser creada
import { obtenerMascotasPorClinica } from '@/api/petsApi'; // Necesitará ser creada
import { obtenerFacturasPorClinica } from '@/api/veterinaryClinicApi'; // Necesitará ser creada

function NavigationAdminMq() {
    const [productos, setProductos] = useState([]);
    const [servicios, setServicios] = useState([]); // 3. ESTADO PARA SERVICIOS
    const [citas, setCitas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState(null); 
    const [activeContent, setActiveContent] = useState('productos');
    const closeSession = async () =>{await logout()};
    const redireccion = useNavigate();

    // 4. Función centralizada para recargar los productos
    const refrescarProductos = () => {
        obtenerProductos()
            .then(setProductos)
            .catch((fallo) => {
                setError(fallo.message);
                message.error(`Error al obtener productos: ${fallo.message}`);
            });
    };

    // 5. Función centralizada para recargar los servicios (Lógica clonada)
    const refrescarServicios = () => {
        obtenerServicios()
            .then(setServicios)
            .catch((fallo) => {
                setError(fallo.message);
                message.error(`Error al obtener servicios: ${fallo.message}`);
            });
    };
    
    // 7. Función para recargar citas
    const refrescarCitas = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const clinicId = userInfo.clinicId || userInfo.id; 
        obtenerCitasPorClinica(clinicId)
            .then(setCitas)
            .catch((fallo) => {
                message.error(`Error al obtener citas: ${fallo.message}`);
            });
    };

    const refrescarClientes = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const clinicId = userInfo.clinicId;
        obtenerClientesPorClinica(clinicId)
            .then(setClientes)
            .catch(err => message.error("Error al obtener clientes"));
    };

    const refrescarMascotas = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const clinicId = userInfo.clinicId;
        obtenerMascotasPorClinica(clinicId)
            .then(setMascotas)
            .catch(err => message.error("Error al obtener mascotas"));
    };

    const refrescarPedidos = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const clinicId = userInfo.clinicId;
        obtenerFacturasPorClinica(clinicId)
            .then(setPedidos)
            .catch(err => message.error("Error al obtener pedidos"));
    };
    
    // Carga inicial y refresco al cambiar de vista
    useEffect(() => {
        if (activeContent === 'productos') {
            refrescarProductos();
        } else if (activeContent === 'servicios') {
            refrescarServicios();
        } else if (activeContent === 'citas') {
            refrescarCitas();
        } else if (activeContent === 'clientes') {
            refrescarClientes();
        } else if (activeContent === 'mascotas') {
            refrescarMascotas();
        } else if (activeContent === 'pedidos') {
            refrescarPedidos();
        }
    }, [activeContent]);

    // LÓGICA CRUD PARA PRODUCTOS (Sin cambios)
    const handleCrearProducto = async (data) => {
        try {
            await crearProducto(data);
            message.success('¡Producto creado exitosamente! ✅');
            refrescarProductos(); 
        } catch (err) {
            message.error("Error al crear el producto. ❌");
            throw err;
        }
    };

    const handleEliminarProducto = async (id) => {
        try {
            await eliminarProducto(id);
            message.success('Producto eliminado exitosamente. 👍');
            refrescarProductos(); 
        } catch (err) {
            message.error("Error al eliminar el producto. ❌");
            throw err;
        }
    };

    const handleActualizarProducto = async (id, data) => {
        try {
            await actualizarProducto(id, data);
            message.success('Producto actualizado exitosamente. ✨');
            refrescarProductos(); 
        } catch (err) {
            message.error("Error al actualizar el producto. ❌");
            throw err;
        }
    };

    const handleBuscarProducto = async (id) => {
        if (!id) {
            refrescarProductos(); 
            return;
        }
        try {
            const productoEncontrado = await obtenerProductoPorId(id);
            setProductos([productoEncontrado]); 
            message.info(`Mostrando resultado para el ID: ${id}`);
        } catch (err) {
            message.error(`No se encontró un producto con el ID: ${id}`);
            refrescarProductos(); 
        }
    };

    // 6. LÓGICA CRUD PARA SERVICIOS (Clonado de Productos)
    const handleCrearServicio = async (data) => {
        try {
            await crearServicio(data);
            message.success('¡Servicio creado exitosamente! ✅');
            refrescarServicios(); 
        } catch (err) {
            message.error("Error al crear el servicio. ❌");
            throw err;
        }
    };

    const handleEliminarServicio = async (id) => {
        try {
            await eliminarServicio(id);
            message.success('Servicio eliminado exitosamente. 👍');
            refrescarServicios(); 
        } catch (err) {
            message.error("Error al eliminar el servicio. ❌");
            throw err;
        }
    };

    const handleActualizarServicio = async (id, data) => {
        try {
            await actualizarServicio(id, data);
            message.success('Servicio actualizado exitosamente. ✨');
            refrescarServicios(); 
        } catch (err) {
            message.error("Error al actualizar el servicio. ❌");
            throw err;
        }
    };

    const handleBuscarServicio = async (id) => {
        if (!id) {
            refrescarServicios(); 
            return;
        }
        try {
            const servicioEncontrado = await obtenerServicioPorId(id);
            setServicios([servicioEncontrado]); 
            message.info(`Mostrando resultado para el ID: ${id}`);
        } catch (err) {
            message.error(`No se encontró un servicio con el ID: ${id}`);
            refrescarServicios(); 
        }
    };
    // 7. FIN DE LÓGICA CRUD PARA SERVICIOS

    const handleActualizarEstadoCita = async (id, status) => {
        try {
            await actualizarEstadoCita(id, status);
            message.success('Estado de la cita actualizado. ✅');
            refrescarCitas();
        } catch (err) {
            message.error("Error al actualizar la cita. ❌");
        }
    };

    const handleSidebarClick = (content) => {
        if (content === 'cerrar sesion') {
            console.log('Cerrando sesión...');
            closeSession();
            redireccion('/auth/login')
        } else {
            setActiveContent(content);
        }
    };

return (
    <div className="app-container-NA-Mq">
        <Sidebar onItemClick={handleSidebarClick} />
        
        <div className="main-content-wrapper-NA-Mq">
            {activeContent === 'productos' && (
                <ContentMq 
                    title={activeContent} 
                    data={productos}
                    onCrear={handleCrearProducto}
                    onActualizar={handleActualizarProducto}
                    onEliminar={handleEliminarProducto}
                    onBuscar={handleBuscarProducto}
                    onResetBusqueda={refrescarProductos}
                />
            )}
            {activeContent === 'servicios' && (
                <ContentServicesLg
                    title={activeContent} 
                    data={servicios}
                    onCrear={handleCrearServicio}
                    onActualizar={handleActualizarServicio}
                    onEliminar={handleEliminarServicio}
                    onBuscar={handleBuscarServicio}
                    onResetBusqueda={refrescarServicios}
                />
            )}
            {activeContent === 'clientes' && (
                <ContentClientsLg data={clientes} />
            )}
            {activeContent === 'mascotas' && (
                <ContentPetsLg data={mascotas} />
            )}
            {activeContent === 'pedidos' && (
                <ContentOrdersLg data={pedidos} />
            )}
            {activeContent === 'citas' && (
                <ContentAppointmentsLg 
                    title={activeContent}
                    data={citas}
                    onActualizarEstado={handleActualizarEstadoCita}
                />
            )}
            {activeContent === 'suscripcion' && (
                <ContentSubscriptionLg 
                    clinicId={JSON.parse(localStorage.getItem('userInfo') || '{}').clinicId} 
                />
            )}
            {activeContent === 'perfil' && (
                <ProfileVetLg 
                    clinicId={JSON.parse(localStorage.getItem('userInfo') || '{}').clinicId} 
                />
            )}
        </div>
    </div>
);
}

export default NavigationAdminMq;