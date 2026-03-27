import React, { useState, useMemo } from 'react';
import { VetsDataLg as InitialVetsData } from '@/components/adminGeneral/VetsDataLg';
import SidebarLg from '@/components/vetAdmin/SidebarLg';
import HeaderAdmiGeneralLg from '@/components/adminGeneral/HeaderAdmiGeneralLg';
import FilterLg from '@/components/common/FilterLg';
import TableVetsLg from '@/components/adminGeneral/TableVetsLg';
import PaginacionLg from '@/components/common/PaginacionLg';
import AddVetLg from '@/components/adminGeneral/AddVetLg';
import DetailCardLg from '@/components/common/DetailCardLg';
import ProfileCreatedLg from '@/components/common/ProfileCreatedLg';
import { obtenerClinicasVeterinarias, eliminarClinica } from '@/api/veterinaryClinicApi';
import { useEffect } from 'react';
import { message } from 'antd';

const AdmiGeneralVetLg = () => {
  const [vetsData, setVetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVet, setSelectedVet] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchVets = async () => {
    try {
      setLoading(true);
      const data = await obtenerClinicasVeterinarias();
      setVetsData(data);
    } catch (error) {
      message.error("Error al cargar las veterinarias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVets();
  }, []);
  const [showAddVetForm, setShowAddVetForm] = useState(false);
  const [showProfileCreated, setShowProfileCreated] = useState(false);
  const [newlyCreatedVet, setNewlyCreatedVet] = useState(null);
  const itemsPerPage = 8;

  const filteredVets = useMemo(() => {
    if (filterStatus === 'Todos') {
      return vetsData;
    } else {
      return vetsData.filter(vet => vet.status === filterStatus);
    }
  }, [filterStatus, vetsData]);

  const totalPages = Math.ceil(filteredVets.length / itemsPerPage);

  const currentVets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredVets.slice(startIndex, endIndex);
  }, [currentPage, filteredVets, itemsPerPage]);

  const showDetail = (index) => {
    const clickedVet = currentVets[index];
    setSelectedVet(clickedVet);
    setShowAddVetForm(false);
    setShowProfileCreated(false);
  };

  const hideDetail = () => {
    setSelectedVet(null);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
    setSelectedVet(null);
    setShowAddVetForm(false);
    setShowProfileCreated(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedVet(null);
    setShowAddVetForm(false);
    setShowProfileCreated(false);
  };

  const handleShowAddVetForm = () => {
    setShowAddVetForm(true);
    setSelectedVet(null);
    setShowProfileCreated(false);
  };

  const handleHideAddVetForm = () => {
    setShowAddVetForm(false);
  };

  const handleProfileCreatedDone = () => {
    setShowProfileCreated(false);
    setShowAddVetForm(false);
    setSelectedVet(null);
    setCurrentPage(1);
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
    setShowProfileCreated(true);
  };

  // --- Funciones para los botones de acción de DetailCardLg ---
  // Estas funciones deben actualizar el estado 'vetsData' de forma INMUTABLE.
  const handleActivateVet = (vetToActivate) => {
    console.log("Activar veterinaria:", vetToActivate.name);
    setVetsData(prevData =>
      prevData.map(vet =>
        vet.id === vetToActivate.id ? { ...vet, status: 'Activo', suspend: 'N/A' } : vet
      )
    );
    // Para que la tarjeta de detalle refleje el cambio inmediatamente
    setSelectedVet(prev => prev && prev.id === vetToActivate.id ? { ...prev, status: 'Activo', suspend: 'N/A' } : prev);
    alert(`Veterinaria ${vetToActivate.name} activada!`);
  };

  const handleDeactivateVet = (vetToDeactivate) => {
    console.log("Desactivar veterinaria:", vetToDeactivate.name);
    setVetsData(prevData =>
      prevData.map(vet =>
        vet.id === vetToDeactivate.id ? { ...vet, status: 'Suspendido', suspend: new Date().toLocaleDateString('es-CO') } : vet
      )
    );
    // Para que la tarjeta de detalle refleje el cambio inmediatamente
    setSelectedVet(prev => prev && prev.id === vetToDeactivate.id ? { ...prev, status: 'Suspendido', suspend: new Date().toLocaleDateString('es-CO') } : prev);
    alert(`Veterinaria ${vetToDeactivate.name} desactivada!`);
  };

  const handleDeleteVet = async (vetToDelete) => {
    try {
      await eliminarClinica(vetToDelete.id);
      message.success(`Veterinaria ${vetToDelete.name} eliminada correctamente. 👍`);
      fetchVets();
      setSelectedVet(null);
    } catch (error) {
      message.error("Error al eliminar la veterinaria: " + error.message);
    }
  };

  const handleEditVet = (vetToEdit) => {
    console.log("Editar veterinaria:", vetToEdit.name);
    // Aquí puedes implementar la lógica para abrir un formulario de edición
    // Por ejemplo, podrías tener otro estado como `showEditForm` y pasar `vetToEdit` a ese formulario.
    alert(`Funcionalidad de edición para ${vetToEdit.name} (simulada)!`);
  };

  // Definición de los campos para DetailCardLg
  const vetDetailFields = [
    { key: 'admin', label: 'Administrador' },
    { key: 'email', label: 'Correo' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'address', label: 'Dirección' },
    { key: 'status', label: 'Estado' },
    { key: 'registered', label: 'Fecha de Registro' },
    { key: 'suspend', label: 'Fecha de Suspensión' },
  ];

  // Definición de los ítems del menú para SidebarLg
  const sidebarMenuItems = [
    { id: 'veterinarias', icon: 'pets', text: 'Veterinarias' },
    { id: 'usuarios', icon: 'group', text: 'Usuarios' },
    { id: 'reportes', icon: 'request_page', text: 'Reportes' },
    { id: 'configuracion', icon: 'settings', text: 'Configuración' },
    { id: 'ayuda', icon: 'help', text: 'Ayuda' },
    { id: 'notificaciones', icon: 'notifications', text: 'Notificaciones' },
    { id: 'salir', icon: 'logout', text: 'Salir' },
  ];

  const [activeSidebarMenuItem, setActiveSidebarMenuItem] = useState('veterinarias');

  const handleSidebarMenuItemClick = (itemId) => {
    setActiveSidebarMenuItem(itemId);
    setSelectedVet(null);
    setShowAddVetForm(false);
    setShowProfileCreated(false);
  };

  return (
    <div className="containerAg-Lg">
      <SidebarLg
        menuItems={sidebarMenuItems}
        activeMenuItemId={activeSidebarMenuItem}
        onMenuItemClick={handleSidebarMenuItemClick}
      />
      <main className="main-content">
        <HeaderAdmiGeneralLg />
        {showAddVetForm ? (
          <AddVetLg onRegresar={handleHideAddVetForm} onAddVet={handleAddVet} />
        ) : showProfileCreated && newlyCreatedVet ? (
          <ProfileCreatedLg vet={newlyCreatedVet} onRegresar={handleProfileCreatedDone} />
        ) : (
          <>
            <FilterLg onFilterChange={handleFilterChange} />
            <TableVetsLg vets={currentVets} onRowClick={showDetail} />
            <PaginacionLg
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <div className="add-btn-container">
              <button className="add-btn" onClick={handleShowAddVetForm}>
                <span className="material-symbols-outlined">add_circle</span>Agregar Veterinaria
              </button>
            </div>
          </>
        )}
      </main>
      {selectedVet && !showAddVetForm && !showProfileCreated && (
        <DetailCardLg
          data={selectedVet}
          fields={vetDetailFields}
          onClose={hideDetail}
          showEditIcon={true} // Siempre mostrar el icono de edición en este modo
          onEditClick={handleEditVet}
          actionMode={'view'} // <--- Aquí controlas el modo: 'view' para solo datos/editar
          onDeactivateClick={handleDeactivateVet}
          onActivateClick={handleActivateVet}
          onDeleteClick={handleDeleteVet}
          titleField="name"
          subtitleField="nit"
        />
      )}
    </div>
  );
};

export default AdmiGeneralVetLg;