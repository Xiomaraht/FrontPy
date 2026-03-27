// ServicesItemsMq.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerServicioPorId } from "@/api/servicesApi"; 
import { obtenerClinicasVeterinarias } from "@/api/veterinaryClinicApi"; // Added API
import HeaderLg from '@/components/common/HeaderLg';
import FooterLg from '@/components/common/FooterLg';
import AppointmentModal from '@/components/common/AppointmentModal';
import '@/components/styles/ServicesItemsMq.css'; 

export default function ServicesItemsMq() {
    const { serviceid } = useParams(); 
    const serviceId = parseInt(serviceid); 
    
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [isScheduling, setIsScheduling] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchService = async () => {
            setIsLoading(true);
            setError(null);
            setService(null);

            if (isNaN(serviceId) || serviceId <= 0) {
                setIsLoading(false);
                setError("Error: ID de servicio no válido en la URL."); 
                return;
            }

            try {
                const foundService = await obtenerServicioPorId(serviceId); 
                setService(foundService);
            } catch (err) {
                console.error("Error fetching service:", err);
                setError(err.message || "Error desconocido al cargar el servicio.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [serviceId]); 

    const handleSchedule = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (!userInfo.id) {
            alert("Debes iniciar sesión para agendar un servicio.");
            navigate('/auth/login?action=login');
            return;
        }

        try {
            const clinics = await obtenerClinicasVeterinarias();
            if (clinics && clinics.length > 0) {
                navigate(`/agendar-cita/${serviceId}`);
            } else {
                alert("Este servicio no está disponible porque no hay clínicas veterinarias registradas en el sistema.");
            }
        } catch (err) {
            console.error("Error fetching clinics for scheduling:", err);
            alert("Hubo un error al intentar conectarse con las clínicas.");
        }
    };

    if (isLoading) {
        return (
            <div className="page-container">
                <HeaderLg />
                <main className="service-detail-container loading">
                    <p style={{textAlign: 'center', padding: '50px'}}>Cargando detalles del servicio...</p>
                </main>
                <FooterLg />
            </div>
        );
    }

    if (error || !service) {
         return (
            <div className="page-container">
                <HeaderLg />
                <main className="service-detail-container error">
                    <p style={{textAlign: 'center', padding: '50px', color: 'red'}}>
                        {error ? `Error: ${error}` : 'Servicio no encontrado.'}
                    </p>
                </main>
                <FooterLg />
            </div>
        );
    }
    
    const serviceName = service.nombre || service.name || 'Servicio Desconocido';
    const serviceDescription = service.descripcion || service.description || 'No hay descripción disponible.';
    const serviceImage = service.imagenUrl || service.imageUrl || 'URL_IMAGEN_DEFAULT';

    return (
        <div className="page-container">
            <HeaderLg />
            
            <main className="service-detail-container">
                <div className="service-layout">
                    
                    {/* Columna Izquierda: Imagen Principal */}
                    <div className="service-image-section">
                        <img 
                            src={serviceImage} 
                            alt={`Imagen del servicio ${serviceName}`}
                            className="main-service-image"
                        />
                    </div>

                    {/* Columna Derecha: Información y Botón */}
                    <div className="service-info-section">
                        <h2 className="description-title">{serviceName}</h2>
                        <p className="service-description-full">
                            {serviceDescription}
                        </p>
                        
                        <hr className='hrP-Lw'/>

                        <div className="service-actions">
                            <button 
                                className="schedule-service-btn" 
                                onClick={handleSchedule}
                            >
                                Agendar Servicio
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {isScheduling && (
                <AppointmentModal 
                    service={service} 
                    clinic={selectedClinic || service.veterinaryClinics[0]} 
                    onClose={() => setIsScheduling(false)} 
                />
            )}

            <FooterLg />
        </div>
    );
}
