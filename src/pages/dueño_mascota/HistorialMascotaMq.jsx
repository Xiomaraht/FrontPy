import HeaderLg from '@/components/common/HeaderLg'
import '@/components/styles/HistorialMascotaMq.css'
import FooterLg from '@/components/common/FooterLg'
import CardsByMq from '@/components/common/CardsByMq'
import MedicalRecordForm from '@/components/vetAdmin/MedicalRecordForm'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { obtenerCitasPorMascota } from '@/api/appointmentsApi';
import { createMedicalRecordApi, getMedicalRecordsByPetIdApi } from '@/api/medicalRecordsApi';
import { message } from 'antd'; // Ensure message is imported for feedback


function HistorialMascotaMq() {
    const locacion = useLocation();
    const [mascota, setMascota] = useState(null); // Initialize with null or an empty object
    const navigate = useNavigate(); // Added for potential navigation
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        if (locacion.state?.mascota) {
            setMascota(locacion.state.mascota);
            if (locacion.state.mascota.id) {
                fetchConsultas(locacion.state.mascota.id);
            }
        } else {
            // If no mascota in state, redirect or show error
            navigate('/miperfil/mascotas'); // Example: redirect to pets list
        }
    }, [locacion, navigate]);

    const fetchConsultas = async (petId) => {
        try {
            const [citasData, recordsData] = await Promise.all([
                obtenerCitasPorMascota(petId),
                getMedicalRecordsByPetIdApi(petId)
            ]);

            // Mapear citas a formato de 'ultconsultas'
            const mappedCitas = citasData.map(cita => ({
                tipo: cita.service?.name || 'Cita Agendada',
                fecha: cita.appointmentDate,
                descripcion: cita.reason,
                isAppointment: true
            }));

            // Organizar records por tipo
            const vacunas = recordsData.filter(r => r.type === 'VACUNA').map(r => ({
                nombre: r.description,
                fechaUlti: r.recordDate,
                fechaProx: 'Pendiente'
            }));

            const consultasPersistentes = recordsData.filter(r => r.type === 'CONSULTA' || r.type === 'HALLAZGO').map(r => ({
                tipo: r.type === 'HALLAZGO' ? 'Hallazgo Clínico' : 'Consulta',
                fecha: r.recordDate,
                descripcion: r.description
            }));

            const receta = recordsData.find(r => r.type === 'RECETA');

            setMascota(prev => ({ 
                ...prev, 
                ultconsultas: [...mappedCitas, ...consultasPersistentes],
                vacunas: vacunas,
                recetasActivas: receta ? {
                    medicamento: receta.description,
                    fechavalidez: 'Ver detalle en receta'
                } : null,
                alergias: recordsData.find(r => r.type === 'ALERGIA')?.description || prev.alergias,
                condicion: recordsData.find(r => r.type === 'CONDICION')?.description || prev.condicion
            }));
        } catch (error) {
            console.error("Error fetching pet consultations and records:", error);
        }
    };
    
    // Obtener info del usuario para manejo de roles
    const userInfoString = localStorage.getItem('userInfo');
    let canEdit = false;
    if (userInfoString) {
        try {
            const userInfo = JSON.parse(userInfoString);
            const userRole = (userInfo.rol || userInfo.role || '').toUpperCase();
            // Permitir edición a ADMIN y VETERINARIAN (incluyendo VETERINARIO hardcodeado en React)
            canEdit = userRole.includes('ADMIN') || userRole.includes('VETERINARIA') || userRole.includes('VETERINARIO');
        } catch (error) {
            console.error(error);
        }
    }

    if(!mascota){
        return <h1>NO SE HA SELECCIONADO UNA MASCOTA</h1>
    }

    const calcularEdad = (birthdate) => {
        if (!birthdate) return 'N/A';
        const today = new Date();
        const birthDate = new Date(birthdate);
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        if (today.getDate() < birthDate.getDate()) months--;
        if (months < 0) {
            years--;
            months += 12;
        }
        if (years > 0 && months === 0) return `${years} años`;
        if (years > 0) return `${years} años y ${months} meses`;
        if (months > 0) return `${months} meses`;
        return 'Menos de 1 mes';
    };

    const openModal = (title) => {
        setModalTitle(title);
        setModalOpen(true);
    };

    const handleAddRecord = async (data) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const clinicId = userInfo.clinicId || userInfo.userId;
        const todayStr = new Date().toISOString().split('T')[0];
        
        const baseRecord = {
            petId: mascota.id,
            clinicId: clinicId,
            recordDate: todayStr,
            description: data.detail
        };

        try {
            let recordType = '';
            switch (modalTitle) {
                case 'Añadir Vacuna': recordType = 'VACUNA'; break;
                case 'Añadir Consulta': recordType = 'CONSULTA'; break;
                case 'Añadir Receta': recordType = 'RECETA'; break;
                case 'Actualizar': recordType = 'ALERGIA'; break; // Se usa para alergias
                case 'Hallazgos': recordType = 'HALLAZGO'; break;
                case 'Editar': recordType = 'CONDICION'; break;
                default: recordType = 'NOTA'; break;
            }

            await createMedicalRecordApi({ ...baseRecord, type: recordType });
            message.success(`${modalTitle} guardado exitosamente en la base de datos ✅`);
            fetchConsultas(mascota.id); // Refresh data from backend
        } catch (error) {
            console.error("Error saving medical record:", error);
            message.error("Error al guardar el registro médico ❌");
        }
    };

    const renderAddButton = (label) => {
        if (!canEdit) return null;
        return (
            <button 
                onClick={() => openModal(label)}
                className="vet-add-btn" 
                style={{ marginLeft: '10px', fontSize: '0.8rem', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
            >
                + {label}
            </button>
        );
    };

    return (
        <>
            <HeaderLg />
            <div className="ContenedorPrincipalHm-Mq">
                <div className='titleGenHm-Mq'>
                    <h1>Historial de {mascota?.name || 'Mascota'}</h1>
                    {mascota?.customerName && <p style={{color: '#666', fontSize: '1.2rem'}}>Dueño: {mascota.customerName}</p>}
                    <Link to={canEdit ? '/adminClient' : '/miperfil/mascotas'} ><button>Volver</button></Link>
                </div>
                <div className="contenedorCardsHm-Mq">
                    <CardsByMq 
                        style={'history'}
                        image={mascota?.imageUrl || mascota?.picture}
                        raza={mascota?.raceName || (mascota?.raza ? mascota?.raza.name : 'N/A')}
                        edad={calcularEdad(mascota?.birthdate)}
                        gen={mascota?.gender}
                    />
                </div>
                <article className="contDatosGenHm-Mq">
                    <h3>Datos Generales {renderAddButton('Editar')}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><i className="bi bi-calendar"></i> Nacimiento</td>
                                <td>{mascota?.birthdate}</td>
                                <td>{calcularEdad(mascota?.birthdate)}</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-cpu"></i> Microchip</td>
                                <td>{mascota?.microchip || 'Sin registrar'}</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-palette"></i> Color</td>
                                <td>{mascota?.color || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-speedometer2"></i> Peso</td>
                                <td>{mascota?.weight} Kg</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
                <article className="contDatosGenHm-Mq">
                    <h3>Vacunas {renderAddButton('Añadir Vacuna')}</h3>
                    {mascota.vacunas && mascota.vacunas.length > 0 ? (
                        <table>
                            <tbody>
                                {mascota.vacunas.map((item, index) => (
                                    <tr key={index}>
                                        <td><i className="bi bi-journal-medical"></i> {item.nombre}</td>
                                        <td>{item.fechaUlti}</td>
                                        <td>{item.fechaProx}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : ( <p>No hay vacunas registradas.</p> )}
                </article> 
                <article className="contBotonerasHm-Mq">
                    <h3>Alergias y Condiciones {renderAddButton('Actualizar')}</h3>
                    <div className="contBotonHm-Mq">
                        <i className="bi bi-check-circle"></i>
                        <strong>{mascota?.alergias || 'Sin alergias registradas'}</strong>
                    </div>
                    <div className="contBotonHm-Mq">
                        <i className="bi bi-bandaid"></i>
                        <div className="contenedorBotoneraIntHm-Mq">
                            <strong>Condicion cronica</strong>
                            <p>{mascota?.condicion || 'Ninguna registrada'}</p>
                        </div>
                    </div>
                </article> 
                <article className="contBotonerasHm-Mq">
                    <h3>Hallazgos y Observaciones {renderAddButton('Hallazgos')}</h3>
                    <div className="contBotonHm-Mq">
                        <i className="bi bi-search"></i>
                        <p>{mascota?.hallazgos || 'No hay hallazgos registrados.'}</p>
                    </div>
                </article>
                <article className="contBotonerasHm-Mq">
                    <h3>Consultas recientes {renderAddButton('Añadir Consulta')}</h3>
                    {mascota?.ultconsultas && mascota.ultconsultas.length > 0 ? mascota.ultconsultas.map((item, index) => (
                        <div className="contBotonHm-Mq" key={index}>
                            <i className="bi bi-calendar-plus"></i>
                            <div className="contenedorBotoneraIntHm-Mq">
                                <strong>{item.tipo}</strong>
                                <p>{item.fecha} - {item.descripcion}</p>
                            </div>
                        </div>
                    )) : <p>No hay consultas recientes.</p>}
                </article> 
                <article className="contBotonerasHm-Mq">
                    <h3>Recetas Activas {renderAddButton('Añadir Receta')}</h3>
                    {mascota?.recetasActivas ? (
                        <div className="contBotonHm-Mq">
                            <i className="bi bi-capsule"></i>
                            <div className="contenedorBotoneraIntHm-Mq">
                                <strong>{mascota.recetasActivas.medicamento}</strong>
                                <p>Receta valida hasta - {mascota.recetasActivas.fechavalidez}</p>
                            </div>        
                        </div>
                    ) : (
                        <div className="contBotonHm-Mq">
                            <i className="bi bi-capsule"></i>
                            <div className="contenedorBotoneraIntHm-Mq">
                                <strong>No hay recetas activas</strong>
                            </div>        
                        </div> 
                    )}
                </article> 
            </div>
            <FooterLg />
            <MedicalRecordForm 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                title={modalTitle} 
                onSubmit={handleAddRecord} 
            />
        </>
    );
}

export default HistorialMascotaMq