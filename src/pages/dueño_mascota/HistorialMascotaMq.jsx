import HeaderLg from '@/components/common/HeaderLg'
import '@/components/styles/HistorialMascotaMq.css'
import FooterLg from '@/components/common/FooterLg'
import CardsByMq from '@/components/common/CardsByMq'
import MedicalRecordForm from '@/components/vetAdmin/MedicalRecordForm'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { obtenerCitasPorMascota } from '@/api/appointmentsApi';


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
            const data = await obtenerCitasPorMascota(petId);
            // Mapear citas a formato de 'ultconsultas' si es necesario
            const mappedConsultas = data.map(cita => ({
                tipo: cita.service?.name || 'Consulta General',
                fecha: cita.appointmentDate,
                descripcion: cita.reason
            }));
            setMascota(prev => ({ ...prev, ultconsultas: mappedConsultas }));
        } catch (error) {
            console.error("Error fetching pet consultations:", error);
        }
    };
    
    // Obtener info del usuario para manejo de roles
    const userInfoString = localStorage.getItem('userInfo');
    let canEdit = false;
    if (userInfoString) {
        try {
            const userInfo = JSON.parse(userInfoString);
            // Permitir edición a ADMIN y VETERINARIAN
            canEdit = userInfo.rol === 'ROLE_ADMIN' || userInfo.rol === 'ROLE_VETERINARIAN' || userInfo.role === 'ROLE_ADMIN' || userInfo.role === 'ROLE_VETERINARIAN';
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

    const handleAddRecord = (data) => {
        const todayStr = new Date().toLocaleDateString('es-CO');
        
        switch (modalTitle) {
            case 'Añadir Vacuna':
                const nuevaVacuna = {
                    nombre: data.detail,
                    fechaUlti: todayStr,
                    fechaProx: 'Pendiente'
                };
                setMascota({
                    ...mascota,
                    vacunas: [...(mascota.vacunas || []), nuevaVacuna]
                });
                break;
            case 'Añadir Consulta':
                const nuevaConsulta = {
                    tipo: 'Consulta General',
                    fecha: todayStr,
                    descripcion: data.detail
                };
                setMascota({
                    ...mascota,
                    ultconsultas: [...(mascota.ultconsultas || []), nuevaConsulta]
                });
                break;
            case 'Añadir Receta':
                setMascota({
                    ...mascota,
                    recetasActivas: {
                        medicamento: data.detail,
                        fechavalidez: '3 meses desde hoy'
                    }
                });
                break;
            case 'Actualizar': // Alergias
                setMascota({
                    ...mascota,
                    alergias: data.detail
                });
                break;
            case 'Editar': // Datos Generales / Condicion
                setMascota({
                    ...mascota,
                    condicion: data.detail
                });
                break;
            default:
                break;
        }
        message.success(`${modalTitle} guardado exitosamente`);
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