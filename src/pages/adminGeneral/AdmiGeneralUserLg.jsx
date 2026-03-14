// src/RouteAdminGenMq.jsx
import React, { useState, useMemo } from 'react';

// Componentes generales
import SidebarLg from '@/components/vetAdmin/SidebarLg'; //Esto se esta usando? @Manuel
import HeaderAdmiGeneralLg from '@/components/adminGeneral/HeaderAdmiGeneralLg';
import PaginacionLg from '@/components/common/PaginacionLg';
import DetailCardLg from '@/components/common/DetailCardLg';
import ButtonLg from '@/components/common/ButtonLg';

// Componentes específicos para Administradores
import TableVetsLg from '@/components/adminGeneral/TableVetsLg'; // Reutilizado para mostrar administradores
import UsersRegisterTL from '@/components/common/UsersRegisterTL'; // Para el formulario de registro de administradores
import ProfileCreatedLg from '@/components/common/ProfileCreatedLg'; // Reutilizado para la confirmación de perfil de administrador

// Importamos la data de administradores
import InitialAdminsData from '@/components/Data/AdmiDataLg.json'; // Asegúrate de que este archivo exista con la data de administradores

export default function RouteAdminGenMq() {
    // Estado para controlar la página actual (solo administradores y otras secciones generales)
    const [pagina, setPagina] = useState('Usuarios'); // Inicia en administradores

    // --- Estados y Lógica para Administradores ---
    const [adminsData, setAdminsData] = useState(InitialAdminsData);
    const [adminSearchTerm, setAdminSearchTerm] = useState('');
    const [adminFilterStatus, setAdminFilterStatus] = useState('Todos');
    const [adminCurrentPage, setAdminCurrentPage] = useState(1);
    const adminsItemsPerPage = 8; // Items por página para administradores

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [showAddAdminForm, setShowAddAdminForm] = useState(false); // Para el formulario de registro de admin
    const [showAdminProfileCreated, setShowAdminProfileCreated] = useState(false);
    const [newlyCreatedAdmin, setNewlyCreatedAdmin] = useState(null);


    // Función para cambiar de página y resetear estados relevantes
    const cambioDePagina = (nuevaPagina) => {
        setPagina(nuevaPagina);
        // Resetear estados de administradores
        setSelectedAdmin(null);
        setShowAddAdminForm(false);
        setShowAdminProfileCreated(false);
        setAdminCurrentPage(1);
        setAdminSearchTerm('');
        setAdminFilterStatus('Todos');
    };

    // --- Handlers para Administradores ---
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
            id: Date.now(), // Genera un ID único
            status: 'Pendiente' // Estado inicial para nuevos administradores
        };
        setAdminsData(prevData => [...prevData, simulatedAdmin]);
        setNewlyCreatedAdmin(simulatedAdmin);
        setShowAddAdminForm(false);
        setShowAdminProfileCreated(true);
        // La alerta se gestiona en ProfileCreatedLg si está configurado para ello
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
        alert(`Usuarios ${adminToActivate.name} activado!`);
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
        alert(`Usuarios ${adminToDeactivate.name} desactivado!`);
    };

    const handleDeleteAdmin = (adminToDelete) => {
        const updatedAdminsData = adminsData.filter(admin => admin.id !== adminToDelete.id);
        setAdminsData(updatedAdminsData);
        setSelectedAdmin(null);
        alert(`Usuarios ${adminToDelete.name} eliminado!`);
    };

    const handleEditAdmin = (adminToEdit) => {
        alert(`Funcionalidad de edición para ${adminToEdit.name} (simulada)!`);
    };

    const adminDetailFields = [
        { key: 'identification', label: 'Cédula' },
        { key: 'email', label: 'Correo' },
        { key: 'phone', label: 'Teléfono' },
        { key: 'status', label: 'Estado' },
    ];

    const adminFilters = useMemo(() => [
        { label: 'Todos', value: 'Todos' },
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' },
        { label: 'Pendiente', value: 'Pendiente' },
    ], []);

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


    // --- Renderizado Condicional del Contenido Principal ---
    const renderContenido = () => {
        if (pagina === 'Usuarios') {
            if (showAddAdminForm) {
                return (
                    <UsersRegisterTL
                        titleForm={'Registrar Nuevo Administrador'}
                        casillas={['Nombre', 'Cédula', 'Correo', 'Teléfono', 'Contraseña']}
                        onAddUser={handleAddAdmin}
                        onRegresar={handleHideAddAdminForm}
                    />
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
                            <TableVetsLg // Reutilizamos TableVetsLg para mostrar administradores
                                data={currentAdmins}
                                onRowClick={showAdminDetail}
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
            return (
                <h1>Contenido de Reportes</h1>
            );
        } else if (pagina === 'configuracion') {
            return (
                <h1>Contenido de Configuración</h1>
            );
        } else if (pagina === 'ayuda') {
            return (
                <h1>Contenido de Ayuda</h1>
            );
        } else if (pagina === 'notificaciones') {
            return (
                <h1>Contenido de Notificaciones</h1>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <div className="contRa-Mq">

                <main className="main-content">
                    {renderContenido()}
                </main>
                {/* DetailCard para Administrador */}
                {selectedAdmin && !showAddAdminForm && !showAdminProfileCreated && (
                    <DetailCardLg
                        data={selectedAdmin}
                        fields={adminDetailFields}
                        onClose={hideAdminDetail}
                        showEditIcon={true}
                        onEditClick={handleEditAdmin}
                        actionMode={'actions'}
                        titleField="name"
                        subtitleField="identification"
                        profileImage={selectedAdmin.imageUrl || null} // Asumimos que los admins pueden tener imageUrl o no
                        onActivateClick={handleActivateAdmin}
                        onDeactivateClick={handleDeactivateAdmin}
                        onDeleteClick={handleDeleteAdmin}
                    />
                )}
            </div>
        </>
    );
}