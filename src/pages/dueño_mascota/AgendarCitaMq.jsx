import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderLg from '@/components/common/HeaderLg';
import FooterLg from '@/components/common/FooterLg';
import api from '@/api/axios';
import { obtenerServicioPorId } from "@/api/servicesApi";
import { getPetsByCustomerIdApi } from '@/api/petsApi';
import { createAppointmentApi } from '@/api/appointmentsApi';
import { obtenerClinicasVeterinarias } from "@/api/veterinaryClinicApi";
import '@/components/styles/AgendarCitaMq.css';

export default function AgendarCitaMq() {
    const { serviceid } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [pets, setPets] = useState([]);
    const [clinic, setClinic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [cleanCustomerId, setCleanCustomerId] = useState(null);

    // Form states
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [petId, setPetId] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Service details (must include clinics)
                const serviceData = await obtenerServicioPorId(serviceid);
                setService(serviceData);

                // 2. Fetch User Info
                const storedUserInfo = localStorage.getItem('userInfo');
                console.log("DEBUG: storedUserInfo:", storedUserInfo);
                const userInfo = JSON.parse(storedUserInfo || '{}');
                console.log("DEBUG: parsed userInfo:", userInfo);
                
                if (!userInfo.userId && !userInfo.id) {
                    console.error("DEBUG: No userId found in userInfo, redirecting to login");
                    navigate('/auth/login');
                    return;
                }

                // 3. Get Clean Customer ID
                let rawCustomerId = userInfo.customerId;
                console.log("DEBUG: rawCustomerId from userInfo:", rawCustomerId);
                let cid = null;

                if (rawCustomerId) {
                    if (typeof rawCustomerId === 'string' && rawCustomerId.includes(':')) {
                        cid = parseInt(rawCustomerId.split(':')[0]);
                    } else {
                        cid = parseInt(rawCustomerId);
                    }
                }
                console.log("DEBUG: cid after initial check:", cid);

                if (!cid) {
                    try {
                        const targetUserId = userInfo.userId || userInfo.id;
                        console.log("DEBUG: Falling back to fetch customer by userId:", targetUserId);
                        const custResp = await api.get(`/api/customers/user/${targetUserId}`);
                        console.log("DEBUG: Customer fetch response:", custResp.data);
                        cid = custResp.data.id;
                    } catch (err) {
                        console.error("DEBUG: Could not fetch customer by user ID", err);
                    }
                }

                console.log("DEBUG: Final cid:", cid);

                if (cid) {
                    setCleanCustomerId(cid);
                    try {
                        const petsData = await getPetsByCustomerIdApi(cid);
                        console.log("DEBUG: Pets fetch response:", petsData);
                        setPets(petsData);
                        if (petsData.length > 0) {
                            setPetId(petsData[0].id);
                            console.log("DEBUG: Initial petId set to:", petsData[0].id);
                        }
                    } catch (petErr) {
                        console.error("DEBUG: Error fetching pets:", petErr);
                    }
                }

                // 4. Set Clinic from Service
                console.log("DEBUG: ServiceData clinicas:", serviceData.veterinaryClinics);
                if (serviceData.veterinaryClinics && serviceData.veterinaryClinics.length > 0) {
                    setClinic(serviceData.veterinaryClinics[0]);
                    console.log("DEBUG: Clinic set from service:", serviceData.veterinaryClinics[0].id);
                } else {
                    console.log("DEBUG: Fallback to global clinic list");
                    const clinics = await obtenerClinicasVeterinarias();
                    const fallbackClinic = clinics.find(c => c.name.toLowerCase().includes("petitos")) || clinics[0];
                    setClinic(fallbackClinic);
                    console.log("DEBUG: Fallback clinic set:", fallbackClinic?.id);
                }

            } catch (error) {
                console.error("Error loading scheduling data:", error);
                setMessage({ text: 'Error al cargar los datos del servicio o mascota.', type: 'error' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [serviceid, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!petId || !cleanCustomerId || !service?.id || !clinic?.id) {
            console.error("Missing IDs for appointment:", { petId, cleanCustomerId, serviceId: service?.id, clinicId: clinic?.id });
            setMessage({ text: 'Error: Datos incompletos (ID de mascota, cliente o clínica faltante). Refresca la página.', type: 'error' });
            return;
        }

        setIsSubmitting(true);
        setMessage({ text: '', type: '' });

        try {
            const appointmentData = {
                appointmentDate: date,
                appointmentTime: time + ":00",
                reason: reason || "Cita de servicio: " + (service.name || service.nombre),
                customerId: cleanCustomerId,
                clinicId: clinic.id,
                serviceId: service.id,
                petId: parseInt(petId),
                status: 'PENDING'
            };

            console.log("Sending appointment data:", appointmentData);

            await createAppointmentApi(appointmentData);
            setMessage({ text: '¡Cita agendada con éxito! Revisa tu historial en un momento.', type: 'success' });
            setTimeout(() => navigate('/miperfil'), 2000);
        } catch (error) {
            console.error("Error creating appointment:", error);
            setMessage({ text: error.message || 'Hubo un error al procesar tu cita.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="loading-screen">Cargando plataforma de agendamiento...</div>;

    return (
        <div className="agendar-page">
            <HeaderLg />
            <main className="agendar-container">
                <div className="agendar-glass-card">
                    <header className="agendar-header">
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            <i className="bi bi-arrow-left"></i> Volver
                        </button>
                        <h1>Agendar Servicio</h1>
                        <p>Reserva tu espacio de manera rápida y segura</p>
                    </header>

                    <div className="agendar-content">
                        {/* Service Preview */}
                        <section className="service-preview">
                            <img src={service?.imageUrl || '/default-service.jpg'} alt={service?.name} />
                            <div className="service-details">
                                <h3>{service?.name}</h3>
                                <p><i className="bi bi-hospital"></i> {clinic?.name}</p>
                                <p className="service-desc">{service?.description?.substring(0, 100)}...</p>
                            </div>
                        </section>

                        {/* Scheduling Form */}
                        <form onSubmit={handleSubmit} className="agendar-form">
                            <div className="form-section">
                                <h4><i className="bi bi-1-circle"></i> Selecciona tu Mascota</h4>
                                <div className="pet-selector">
                                    {pets.length > 0 ? (
                                        <select value={petId} onChange={(e) => setPetId(e.target.value)} required>
                                            {pets.map(p => (
                                                <option key={p.id} value={p.id}>{p.name} ({p.raceName || 'Mestizo'})</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="no-pets-warning">
                                            <p>No tienes mascotas registradas.</p>
                                            <button type="button" onClick={() => navigate('/registerPet')}>Registrar Mascota</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-section">
                                <h4><i className="bi bi-2-circle"></i> Fecha y Hora</h4>
                                <div className="datetime-grid">
                                    <div className="input-group">
                                        <label>Fecha</label>
                                        <input 
                                            type="date" 
                                            required 
                                            value={date} 
                                            onChange={(e) => setDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Hora</label>
                                        <input 
                                            type="time" 
                                            required 
                                            value={time} 
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h4><i className="bi bi-3-circle"></i> Información Adicional</h4>
                                <textarea 
                                    value={reason} 
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Escribe el motivo de la cita o cualquier observación importante..."
                                ></textarea>
                            </div>

                            {message.text && (
                                <div className={`alert-msg ${message.type}`}>
                                    {message.text}
                                </div>
                            )}

                            <button type="submit" className="submit-booking-btn" disabled={isSubmitting || pets.length === 0}>
                                {isSubmitting ? 'Procesando...' : 'Confirmar Reserva'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <FooterLg />
        </div>
    );
}
