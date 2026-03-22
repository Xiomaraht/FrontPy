import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

// Componentes generales
import SidebarLg from '@/components/vetAdmin/SidebarLg';
import HeaderAdmiGeneralLg from '@/components/adminGeneral/HeaderAdmiGeneralLg';
import TableVetsLg from '@/components/adminGeneral/TableVetsLg'; // Ahora una tabla genérica
import PaginacionLg from '@/components/common/PaginacionLg';
import DetailCardLg from '@/components/common/DetailCardLg';
import ButtonLg from '@/components/common/ButtonLg';

// Componentes específicos de Veterinarias
import AddVetLg from '@/components/adminGeneral/AddVetLg';
// import ProfileCreatedLg from '@/components/common/ProfileCreatedLg'; // Comentado por si no existe
import InitialVetsData from '@/components/Data/VetsDataLg.json';
import ContenidoAdminGeneralMq from '@/components/adminGeneral/ContenidoAdminGeneralMq';
import VetsAddTl from '@/components/common/VetsAddTl'; //Esto se esta usando? @Manuel

import UsersRegisterTL from '@/components/common/UsersRegisterTL'; // Formulario de registro de administradores
import InitialAdminsData from '@/components/Data/AdmiDataLg.json'; // Data de administradores
import ContentSubscriptionsGenLg from '@/components/adminGeneral/ContentSubscriptionsGenLg';
import { obtenerClinicasVeterinarias } from '@/api/veterinaryClinicApi';
import { obtenerUsuarios } from '@/api/userApi'; // Assuming this exists or I'll check

// Componentes de otras secciones (mantenidos para estructura)
// import VetRegisterTL from '@/components/common/VetRegisterTL'; // Parece no usarse, lo dejo comentado si no lo necesitas
//import AdmiGeneralUserLg from '@/components/Laura/??'; // Contenido de la sección de Usuarios/Administradores ?? mucho comentario de IAAA


export default function RouteAdminGenMq() {
    // --- Estado principal para la navegación ---
    const [pagina, setPagina] = useState('veterinarias');

    // --- Estados y Lógica para VETERINARIAS ---
    const [vetsData, setVetsData] = useState([]);
    const [vetSearchTerm, setVetSearchTerm] = useState('');
    const [vetFilterStatus, setVetFilterStatus] = useState('Todos');
    const [vetCurrentPage, setVetCurrentPage] = useState(1);
    const vetsItemsPerPage = 8;

    const [selectedVet, setSelectedVet] = useState(null);
    const [showAddVetForm, setShowAddVetForm] = useState(false);
    const [showVetProfileCreated, setShowVetProfileCreated] = useState(false);
    const [newlyCreatedVet, setNewlyCreatedVet] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const fetchVets = async () => {
        try {
            setIsLoading(true);
            const data = await obtenerClinicasVeterinarias();
            // Map real clinics to match table structure and filter for 'Petitos'
            const mappedVets = data
                .filter(v => v.name && v.name.toLowerCase().includes('petitos'))
                .map(v => ({
                    id: v.id,
                    name: v.name,
                    admin: v.owner?.firstName ? `${v.owner.firstName} ${v.owner.lastName || ''}`.trim() : (v.user?.username || 'prueba'),
                    email: v.email,
                    phone: v.phone || 'N/A',
                    address: v.address || 'N/A',
                    nit: v.documentNumber || v.nit || 'N/A',
                    status: 'Activo', // Defaulting to active if it comes from DB
                    registered: v.createdAt ? new Date(v.createdAt).toLocaleDateString('es-CO') : 'N/A',
                    suspend: 'N/A',
                    imageUrl: v.picture
                }));
            setVetsData(mappedVets);
        } catch (error) {
            console.error("Error loading vets:", error);
            message.error("Error al cargar veterinarias reales");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (pagina === 'veterinarias') {
            fetchVets();
        }
    }, [pagina]);

    // --- Estados y Lógica para ADMINISTRADORES (Sección 'users') ---
    const [adminsData, setAdminsData] = useState([]);
    const [adminSearchTerm, setAdminSearchTerm] = useState('');
    const [adminFilterStatus, setAdminFilterStatus] = useState('Todos');
    const [adminCurrentPage, setAdminCurrentPage] = useState(1);
    const adminsItemsPerPage = 8;

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [showAddAdminForm, setShowAddAdminForm] = useState(false);
    const [showAdminProfileCreated, setShowAdminProfileCreated] = useState(false);
    const [newlyCreatedAdmin, setNewlyCreatedAdmin] = useState(null);

    const fetchAdmins = async () => {
        try {
            const data = await obtenerUsuarios();
            // Map real users and filter out veterinarians, keeping only 'prueba'
            const mappedAdmins = data
                .filter(u => u.username === 'prueba')
                .map(u => ({
                    id: u.id,
                    name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username,
                    identification: u.username,
                    email: u.email,
                    phone: u.phone || 'N/A',
                    status: 'Activo',
                    role: u.role,
                    imageUrl: u.picture
                }));
            setAdminsData(mappedAdmins);
        } catch (error) {
            message.error("Error al cargar administradores reales");
        }
    };

    useEffect(() => {
        if (pagina === 'users') {
            fetchAdmins();
        }
    }, [pagina]);


    // --- Columnas y campos de detalle para VETERINARIAS ---
    // Aquí defines EXPLICITAMENTE qué columnas quieres mostrar y en qué orden.
    // Si una propiedad existe en tus datos (e.g., 'phone', 'address'), pero no está listada aquí,
    // NO se mostrará en la tabla.
    const VET_TABLE_COLUMNS = useMemo(() => [
        {
            header: 'Foto',
            accessor: 'imageUrl',
            width: '80px',
            render: (vet) => (
                vet.imageUrl ? (
                    <img
                        src={vet.imageUrl}
                        alt={`Foto de ${vet.name}`}
                        className="vet-table-image"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                ) : (
                    <span className="material-symbols-outlined vet-placeholder-icon">
                        local_hospital
                    </span>
                )
            ),
        },
        { header: 'Veterinaria', accessor: 'name', width: '250px' },
        { header: 'Administrador', accessor: 'admin', width: '200px' },
        { header: 'Estado', accessor: 'status', width: '120px' },
    ], []);

    const vetDetailFields = useMemo(() => [
        { key: 'admin', label: 'Administrador' },
        { key: 'email', label: 'Correo' },
        { key: 'phone', label: 'Teléfono' },
        { key: 'address', label: 'Dirección' },
        { key: 'status', label: 'Estado' },
        { key: 'registered', label: 'Fecha de Registro' },
        { key: 'suspend', label: 'Fecha de Suspensión' },
    ], []);

    const vetFilters = useMemo(() => [
        { label: 'Todos', value: 'Todos' },
        { label: 'Activo', value: 'Activo' },
        { label: 'Pendiente', value: 'Pendiente' },
        { label: 'Suspendido', value: 'Suspendido' },
        { label: 'Cancelado', value: 'Cancelado' },
    ], []);

    // --- Columnas y campos de detalle para ADMINISTRADORES ---

    const ADMIN_TABLE_COLUMNS = useMemo(() => [
        {
            header: 'Foto',
            accessor: 'imageUrl',
            width: '80px',
            render: (admin) => (
                admin.imageUrl ? (
                    <img
                        src={admin.imageUrl}
                        alt={`Foto de ${admin.name}`}
                        className="admin-table-image"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                ) : (
                    <span className="material-symbols-outlined admin-placeholder-icon">
                        person
                    </span>
                )
            ),
        },
        { header: 'Nombre', accessor: 'name', width: '200px' },
        { header: 'Identificación', accessor: 'identification', width: '150px' },
        { header: 'Contacto', accessor: 'phone', width: '150px' },
        { header: 'Estado', accessor: 'status', width: '120px' },
    ], []);

    const adminDetailFields = useMemo(() => [
        { key: 'veterinary', label: 'Veterinaria' }, // Assuming 'veterinaria' is the key in your admin data
        { key: 'email', label: 'Correo' },
        { key: 'phone', label: 'Teléfono' },
        { key: 'status', label: 'Estado' },
    ], []);


    const adminFilters = useMemo(() => [
        { label: 'Todos', value: 'Todos' },
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' },
        { label: 'Pendiente', value: 'Pendiente' },
    ], []);


    // --- MANEJADORES GENERALES DE NAVEGACIÓN Y RESETEO ---
    const redireccion = useNavigate();

    const cambioDePagina = useCallback((nuevaPagina) => {
        if (nuevaPagina === 'salir') {
            localStorage.clear();
            redireccion('/auth/login');
            return;
        }
        setPagina(nuevaPagina);
        // Resetear TODOS los estados relevantes al cambiar de sección principal
        // Estados de Veterianrias
        setSelectedVet(null);
        setShowAddVetForm(false);
        setShowVetProfileCreated(false);
        setVetCurrentPage(1);
        setVetSearchTerm('');
        setVetFilterStatus('Todos');
        // Estados de Administradores
        setSelectedAdmin(null);
        setShowAddAdminForm(false);
        setShowAdminProfileCreated(false);
        setAdminCurrentPage(1);
        setAdminSearchTerm('');
        setAdminFilterStatus('Todos');
    }, []);

    // --- MANEJADORES para VETERINARIAS ---
    const handleVetSearchChange = (term) => {
        setVetSearchTerm(term);
        setVetCurrentPage(1);
        setSelectedVet(null);
        setShowAddVetForm(false);
        setShowVetProfileCreated(false);
    };

    const handleVetFilterChange = (status) => {
        setVetFilterStatus(status);
        setVetCurrentPage(1);
        setSelectedVet(null);
        setShowAddVetForm(false);
        setShowVetProfileCreated(false);
    };

    const handleVetPageChange = (page) => {
        setVetCurrentPage(page);
        setSelectedVet(null);
        setShowAddVetForm(false);
        setShowVetProfileCreated(false);
    };

    const showVetDetail = (item) => {
        setSelectedVet(item);
        setShowAddVetForm(false);
        setShowVetProfileCreated(false);
    };

    const hideVetDetail = () => {
        setSelectedVet(null);
    };

    const handleShowAddVetForm = () => {
        setShowAddVetForm(true);
        setSelectedVet(null);
        setShowVetProfileCreated(false);
    };

    const handleHideAddVetForm = () => {
        setShowAddVetForm(false);
    };

    const handleVetProfileCreatedDone = () => {
        setShowVetProfileCreated(false);
        setShowAddVetForm(false);
        setSelectedVet(null);
        setVetCurrentPage(1);
    };

    const handleAddVet = (newVetData) => {
        const simulatedVet = {
            ...newVetData,
            admin: newVetData.admin || 'Sin Administrador',
            id: Date.now(),
            status: 'Pendiente',
            registered: new Date().toLocaleDateString('es-CO'),
            suspend: 'N/A'
        };
        setVetsData(prevData => [...prevData, simulatedVet]);
        setNewlyCreatedVet(simulatedVet);
        setShowAddVetForm(false);
        setShowVetProfileCreated(true);
    };

    const handleActivateVet = (vetToActivate) => {
        const updatedVetsData = vetsData.map(vet =>
            vet.id === vetToActivate.id
                ? { ...vet, status: 'Activo', suspend: 'N/A' }
                : vet
        );
        setVetsData(updatedVetsData);
        setSelectedVet(prevSelectedVet =>
            prevSelectedVet && prevSelectedVet.id === vetToActivate.id
                ? { ...prevSelectedVet, status: 'Activo', suspend: 'N/A' }
                : prevSelectedVet
        );
        alert(`Veterinaria ${vetToActivate.name} activada!`);
    };

    const handleDeactivateVet = (vetToDeactivate) => {
        const updatedVetsData = vetsData.map(vet =>
            vet.id === vetToDeactivate.id
                ? { ...vet, status: 'Suspendido', suspend: new Date().toLocaleDateString('es-CO') }
                : vet
        );
        setVetsData(updatedVetsData);
        setSelectedVet(prevSelectedVet =>
            prevSelectedVet && prevSelectedVet.id === vetToDeactivate.id
                ? { ...prevSelectedVet, status: 'Suspendido', suspend: new Date().toLocaleDateString('es-CO') }
                : prevSelectedVet
        );
        alert(`Veterinaria ${vetToDeactivate.name} desactivada!`);
    };

    const handleDeleteVet = (vetToDelete) => {
        const updatedVetsData = vetsData.filter(vet => vet.id !== vetToDelete.id);
        setVetsData(updatedVetsData);
        setSelectedVet(null);
        alert(`Veterinaria ${vetToDelete.name} eliminada!`);
    };

    const handleEditVet = (vetToEdit) => {
        alert(`Funcionalidad de edición para ${vetToEdit.name} (simulada)!`);
    };

    // --- MANEJADORES para ADMINISTRADORES ---
    const handleAdminSearchChange = (term) => {
        setAdminSearchTerm(term);
        setAdminCurrentPage(1);
        setSelectedAdmin(null);
        setShowAddAdminForm(false);
        setShowAdminProfileCreated(false);
    };

    const handleAdminFilterChange = (status) => {
        setAdminFilterStatus(status);
        setAdminCurrentPage(1);
        setSelectedAdmin(null);
        setShowAddAdminForm(false);
        setShowAdminProfileCreated(false);
    };

    const handleAdminPageChange = (page) => {
        setAdminCurrentPage(page);
        setSelectedAdmin(null);
        setShowAddAdminForm(false);
        setShowAdminProfileCreated(false);
    };

    const showAdminDetail = (item) => {
        setSelectedAdmin(item);
        setShowAddAdminForm(false);
        setShowAdminProfileCreated(false);
    };

    const hideAdminDetail = () => {
        setSelectedAdmin(null);
    };

    const handleShowAddAdminForm = () => {
        setShowAddAdminForm(true);
        setSelectedAdmin(null);
        setShowAdminProfileCreated(false);
    };

    const handleHideAddAdminForm = () => {
        setShowAddAdminForm(false);
    };

    const handleAdminProfileCreatedDone = () => {
        setShowAdminProfileCreated(false);
        setShowAddAdminForm(false);
        setSelectedAdmin(null);
        setAdminCurrentPage(1);
    };

    const handleAddAdmin = (newAdminData) => {
        const simulatedAdmin = {
            ...newAdminData,
            id: Date.now(),
            status: 'Pendiente'
        };
        setAdminsData(prevData => [...prevData, simulatedAdmin]);
        setNewlyCreatedAdmin(simulatedAdmin);
        setShowAddAdminForm(false);
        setShowAdminProfileCreated(true);
    };

    const handleActivateAdmin = (adminToActivate) => {
        const updatedAdminsData = adminsData.map(admin =>
            admin.id === adminToActivate.id
                ? { ...admin, status: 'Activo' }
                : admin
        );
        setAdminsData(updatedAdminsData);
        setSelectedAdmin(prevSelectedAdmin =>
            prevSelectedAdmin && prevSelectedAdmin.id === adminToActivate.id
                ? { ...prevSelectedAdmin, status: 'Activo' }
                : prevSelectedAdmin
        );
        alert(`Administrador ${adminToActivate.name} activado!`);
    };

    const handleDeactivateAdmin = (adminToDeactivate) => {
        const updatedAdminsData = adminsData.map(admin =>
            admin.id === adminToDeactivate.id
                ? { ...admin, status: 'Inactivo' }
                : admin
        );
        setAdminsData(updatedAdminsData);
        setSelectedAdmin(prevSelectedAdmin =>
            prevSelectedAdmin && prevSelectedAdmin.id === adminToDeactivate.id
                ? { ...prevSelectedAdmin, status: 'Inactivo' }
                : prevSelectedAdmin
        );
        alert(`Administrador ${adminToDeactivate.name} desactivado!`);
    };

    const handleDeleteAdmin = (adminToDelete) => {
        const updatedAdminsData = adminsData.filter(admin => admin.id !== adminToDelete.id);
        setAdminsData(updatedAdminsData);
        setSelectedAdmin(null);
        alert(`Administrador ${adminToDelete.name} eliminada!`);
    };

    const handleEditAdmin = (adminToEdit) => {
        alert(`Funcionalidad de edición para ${adminToEdit.name} (simulada)!`);
    };

    // --- Lógica de Filtrado y Paginación para VETERINARIAS ---
    const filteredAndSearchedVets = useMemo(() => {
        let result = vetsData;
        if (vetFilterStatus !== 'Todos') {
            result = result.filter(vet => vet.status === vetFilterStatus);
        }
        if (vetSearchTerm) {
            const lowerCaseSearchTerm = vetSearchTerm.toLowerCase();
            result = result.filter(vet =>
                vet.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                vet.admin.toLowerCase().includes(lowerCaseSearchTerm) ||
                vet.email.toLowerCase().includes(lowerCaseSearchTerm) ||
                vet.address.toLowerCase().includes(lowerCaseSearchTerm) ||
                vet.nit.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
        return result;
    }, [vetFilterStatus, vetSearchTerm, vetsData]);

    const totalVetPages = Math.ceil(filteredAndSearchedVets.length / vetsItemsPerPage);

    const currentVets = useMemo(() => {
        const startIndex = (vetCurrentPage - 1) * vetsItemsPerPage;
        const endIndex = startIndex + vetsItemsPerPage;
        return filteredAndSearchedVets.slice(startIndex, endIndex);
    }, [vetCurrentPage, filteredAndSearchedVets, vetsItemsPerPage]);

    // --- Lógica de Filtrado y Paginación para ADMINISTRADORES ---
    const filteredAndSearchedAdmins = useMemo(() => {
        let result = adminsData;
        if (adminFilterStatus !== 'Todos') {
            result = result.filter(admin => admin.status === adminFilterStatus);
        }
        if (adminSearchTerm) {
            const lowerCaseSearchTerm = adminSearchTerm.toLowerCase();
            result = result.filter(admin =>
                admin.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                admin.identification.toLowerCase().includes(lowerCaseSearchTerm) ||
                admin.email.toLowerCase().includes(lowerCaseSearchTerm) ||
                admin.phone.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }
        return result;
    }, [adminFilterStatus, adminSearchTerm, adminsData]);

    const totalAdminPages = Math.ceil(filteredAndSearchedAdmins.length / adminsItemsPerPage);

    const currentAdmins = useMemo(() => {
        const startIndex = (adminCurrentPage - 1) * adminsItemsPerPage;
        const endIndex = startIndex + adminsItemsPerPage;
        return filteredAndSearchedAdmins.slice(startIndex, endIndex);
    }, [adminCurrentPage, filteredAndSearchedAdmins, adminsItemsPerPage]);


    // --- Renderizado del Contenido Principal (Veterinarias, Administradores, Reportes) ---
    const renderContenido = () => {
        if (pagina === 'veterinarias') {
            if (showAddVetForm) {
                return <AddVetLg onRegresar={handleHideAddVetForm} onAddVet={handleAddVet} />;
            } else if (showVetProfileCreated && newlyCreatedVet) {
                return <ProfileCreatedLg vet={newlyCreatedVet} onRegresar={handleVetProfileCreatedDone} />;
            } else {
                return (
                    <>
                        <HeaderAdmiGeneralLg
                            onSearchChange={handleVetSearchChange}
                            onFilterChange={handleVetFilterChange}
                            filterOptions={vetFilters}
                            searchTerm={vetSearchTerm}
                            filterStatus={vetFilterStatus}
                        />
                        <div className='boxtable-container'>
                            <TableVetsLg
                                data={currentVets}
                                onRowClick={showVetDetail}
                                columns={VET_TABLE_COLUMNS} // Se usan las columnas definidas para veterinarias
                            />
                            <PaginacionLg
                                currentPage={vetCurrentPage}
                                totalPages={totalVetPages}
                                onPageChange={handleVetPageChange}
                            />
                        </div>
                        <div className="add-btn-container">
                            <ButtonLg onClick={handleShowAddVetForm} icon='add_circle' textbutton={'Agregar Veterinaria'}/>
                        </div>
                    </>
                );
            }
        } else if (pagina === 'users') {
            // --- Contenido para la sección de ADMINISTRADORES ---
            if (showAddAdminForm) {
                return (
                <UsersRegisterTL

                    /*vista regitro usuario */
                    titleForm={'Administrador Clinicos'}
                    casillas={['NIT', 'Correo', "Nombre", "Apellido", "contraseña"]}
                    registrar={["registrar"]}
                    confirmar={["exito"]}
                    /*vista exito regitro usuario */
                    exito={["¡Perfil Creado Exitosamente!"]}
                    infoExito={["Juan Torres "]}
                    infoExito2={["C.C. 1001.199.287"]}
                    correoActivacion={["Enviar Correo de Activacion"]}
                    enviar={["Enviar"]} />
                );
            } else if (showAdminProfileCreated && newlyCreatedAdmin) {
                return <ProfileCreatedLg vet={newlyCreatedAdmin} onRegresar={handleAdminProfileCreatedDone} />;
            } else {
                return (
                    <>
                        <HeaderAdmiGeneralLg
                            onSearchChange={handleAdminSearchChange}
                            onFilterChange={handleAdminFilterChange}
                            filterOptions={adminFilters}
                            searchTerm={adminSearchTerm}
                            filterStatus={adminFilterStatus}
                        />
                        <div className='boxtable-container'>
                            <TableVetsLg // Reutilizamos TableVetsLg para administradores
                                data={currentAdmins}
                                onRowClick={showAdminDetail}
                                columns={ADMIN_TABLE_COLUMNS} // Se usan las columnas definidas para administradores
                            />
                            <PaginacionLg
                                currentPage={adminCurrentPage}
                                totalPages={totalAdminPages}
                                onPageChange={handleAdminPageChange}
                            />
                        </div>
                        <div className="add-btn-container">
                            <ButtonLg onClick={handleShowAddAdminForm} icon='person_add' textbutton={'Agregar Administrador'} />
                        </div>
                    </>
                );
            }
        } else if (pagina === 'reportes') {
            /* Aquí iría el código de reportes */
            return (
                <ContenidoAdminGeneralMq tituloReporte={'Suscripcion'} buttonOne={'Exportar'} buttonTwo={'Visualizar'} alterButton={'Historial de reportes'}/>
            );
        } else if (pagina === 'suscripciones') {
            return <ContentSubscriptionsGenLg />;
        } else {
            return null;
        }
    };

    // --- Lógica para determinar qué datos y campos pasar a DetailCardLg ---
    const activeDetailData = useMemo(() => {
        if (pagina === 'veterinarias' && selectedVet && !showAddVetForm && !showVetProfileCreated) {
            return {
                data: selectedVet,
                fields: vetDetailFields,
                onClose: hideVetDetail,
                onEditClick: handleEditVet,
                titleField: "name",
                subtitleField: "nit",
                profileImage: selectedVet.imageUrl || null,

            };
        } else if (pagina === 'users' && selectedAdmin && !showAddAdminForm && !showAdminProfileCreated) {
            return {
                data: selectedAdmin,
                fields: adminDetailFields,
                onClose: hideAdminDetail,
                onEditClick: handleEditAdmin,
                titleField: "name",
                subtitleField: "identification",
                profileImage: selectedAdmin.imageUrl || null,
                onActivateClick: handleActivateAdmin,
                onDeactivateClick: handleDeactivateAdmin,
                onDeleteClick: handleDeleteAdmin,
            };
        }
        return null; // No hay tarjeta de detalle activa
    }, [
        pagina, selectedVet, showAddVetForm, showVetProfileCreated, vetDetailFields, handleEditVet, handleActivateVet, handleDeactivateVet, handleDeleteVet,
        selectedAdmin, showAddAdminForm, showAdminProfileCreated, adminDetailFields, handleEditAdmin, handleActivateAdmin, handleDeactivateAdmin, handleDeleteAdmin
    ]);


    return (
        <>
            <div className="contRa-Mq">
                <SidebarLg
                    parametroDeCambio={cambioDePagina}
                    activeMenuItemId={pagina}
                    menuItems={[
                        { id: 'veterinarias', icon: 'pets', text: 'Veterinarias' },
                        { id: 'users', icon: 'group', text: 'Administradores' },
                        { id: 'suscripciones', icon: 'subscriptions', text: 'Suscripciones' },
                        { id: 'reportes', icon: 'request_page', text: 'Reportes' },
                        { id: 'configuracion', icon: 'settings', text: 'Configuración' },
                        { id: 'ayuda', icon: 'help', text: 'Ayuda' },
                        { id: 'notificaciones', icon: 'notifications', text: 'Notificaciones' },
                        { id: 'salir', icon: 'logout', text: 'Salir' },
                    ]}
                />
                <main className="main-content">
                    {renderContenido()}
                </main>
                {/* La DetailCardLg se renderiza si hay 'activeDetailData' */}
                {activeDetailData && (
                    <DetailCardLg
                        data={activeDetailData.data}
                        fields={activeDetailData.fields}
                        onClose={activeDetailData.onClose}
                        showEditIcon={true} // Siempre mostrar icono de editar, la funcionalidad es manejada por onEditClick
                        onEditClick={activeDetailData.onEditClick}
                        actionMode={'actions'} // O 'info' si no hay acciones
                        titleField={activeDetailData.titleField}
                        subtitleField={activeDetailData.subtitleField}
                        profileImage={activeDetailData.profileImage}
                        onActivateClick={activeDetailData.onActivateClick}
                        onDeactivateClick={activeDetailData.onDeactivateClick}
                        onDeleteClick={activeDetailData.onDeleteClick}
                    />
                )}
            </div>
        </>
    );
}