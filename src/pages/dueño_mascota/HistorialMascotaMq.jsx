import HeaderLg from '@/components/common/HeaderLg'
import '@/components/styles/HistorialMascotaMq.css'
import FooterLg from '@/components/common/FooterLg'
import CardsByMq from '@/components/common/CardsByMq'
import MedicalRecordForm from '@/components/vetAdmin/MedicalRecordForm'
import { useLocation, Link } from 'react-router-dom'
import { useState } from 'react'



function HistorialMascotaMq() {
    const locacion = useLocation()
    const mascota = locacion.state?.mascota
    
    // Obtener info del usuario para manejo de roles
    const userInfoString = localStorage.getItem('userInfo');
    let isVetAdmin = false;
    if (userInfoString) {
        try {
            const userInfo = JSON.parse(userInfoString);
            isVetAdmin = userInfo.rol === 'ROLE_ADMIN';
        } catch (error) {
            console.error(error);
        }
    }

    if(!mascota){
        return <h1>NO SE HA SELECCIONADO UNA MASCOTA</h1>
    }
    //funcion para la calculacion de la edad
    const calcularEdad = (birthdate) => {
        if (!birthdate) return 'N/A';
        
        // Convertir la fecha de nacimiento a objeto Date
        const today = new Date();
        const birthDate = new Date(birthdate);

        // 1. Calcular la diferencia total en meses
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        
        // Si la fecha actual es anterior al día de nacimiento, restamos 1 mes
        if (today.getDate() < birthDate.getDate()) {
            months--;
        }

        // Ajustar los meses: si es negativo, significa que aún no ha cumplido el mes de su cumpleaños.
        // Ej: Hoy es mayo y nació en agosto. months = 4 - 7 = -3. Se ajusta sumando 12.
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // 2. Formatear el resultado
        
        // Caso 1: Solo años (ej. 5 años)
        if (years > 0 && months === 0) {
            return `${years} años`;
        }
        // Caso 2: Años y meses (ej. 5 años y 3 meses)
        if (years > 0) {
            return `${years} años y ${months} meses`;
        }
        // Caso 3: Solo meses (ej. 8 meses)
        if (months > 0) {
            return `${months} meses`;
        }
        
        // Caso 4: Menos de un mes (ej. Recién nacido o '0 años y 0 meses' si es el mismo día)
        return 'Menos de 1 mes';
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const openModal = (title) => {
        setModalTitle(title);
        setModalOpen(true);
    };

    const handleAddRecord = (data) => {
        // En un futuro esto llamará a la API (POST /api/historial...)
        alert(`Guardando [${modalTitle}]: ${data.detail}`);
    };

    const renderAddButton = (label) => {
        if (!isVetAdmin) return null;
        return (
            <button 
                onClick={() => openModal(label)}
                className="vet-add-btn" 
                style={{ marginLeft: '10px', fontSize: '0.8rem', padding: '5px 10px', cursor: 'pointer' }}
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
                    <h1>Historial de {mascota.name}</h1>
                    <Link to={'/miperfil/mascotas'} ><button>Volver</button></Link>
                </div>
                <div className="contenedorCardsHm-Mq">
                    <CardsByMq 
                    style={'history'}
                    image={mascota.imageUrl}
                    raza={mascota.raceName}
                    edad={calcularEdad(mascota.birthdate)}
                    gen={mascota.gender}
                    />
                </div>
                <article className="contDatosGenHm-Mq">
                    <h3>Datos Generales {renderAddButton('Editar')}</h3>
                    <table>
                        <tbody><tr>
                                <td><i className="bi bi-calendar"></i> Nacimiento</td>
                                <td>{mascota.birthdate}</td>
                                <td>{calcularEdad(mascota.birthdate)}</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-cpu"></i> Microchip</td>
                                <td>{mascota.microchip || 'Sin registrar'}</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-palette"></i> Color</td>
                                <td>{mascota.color}</td>
                            </tr>
                            <tr>
                                <td><i className="bi bi-speedometer2"></i> Peso</td>
                                <td>{mascota.weight} Kg</td>
                            </tr></tbody>
                    </table>
                </article>
                 <article className="contDatosGenHm-Mq">
                    <h3>Vacunas {renderAddButton('Añadir Vacuna')}</h3>
                    {mascota.vacunas && mascota.vacunas.length > 0 ? (
                        <table>
                            <tbody>
                            {mascota.vacunas.map((item,index)=> {
                                return(
                                    <tr key={index}>
                                        <td><i className="bi bi-journal-medical"></i> {item.nombre}</td>
                                        <td>{item.fechaUlti}</td>
                                        <td>{item.fechaProx}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    ) : ( <p>No hay vacunas registradas.</p> )}
                </article> 
                 <article className="contBotonerasHm-Mq">
                    <h3>Alergias y Condiciones {renderAddButton('Actualizar')}</h3>
                    <div className="contBotonHm-Mq">
                        <i className="bi bi-check-circle"></i>
                        <strong>{mascota.alergias || 'Sin alergias registradas'}</strong>
                    </div>
                    <div className="contBotonHm-Mq">
                        <i className="bi bi-bandaid"></i>
                        <div className="contenedorBotoneraIntHm-Mq">
                            <strong>Condicion cronica</strong>
                            <p>{mascota.condicion || 'Ninguna registrada'}</p>
                        </div>
                    </div>
                </article> 
                 <article className="contBotonerasHm-Mq">
                    <h3>Consultas recientes {renderAddButton('Añadir Consulta')}</h3>
                    {mascota.ultconsultas && mascota.ultconsultas.length > 0 ? mascota.ultconsultas.map((item, index)=>{
                        return(
                            <div className="contBotonHm-Mq" key={index}>
                                <i className="bi bi-calendar-plus"></i>
                                <div className="contenedorBotoneraIntHm-Mq">
                                    <strong>{item.tipo}</strong>
                                    <p>{item.fecha} - {item.descripcion}</p>
                                </div>
                            </div>
                        )
                    }) : <p>No hay consultas recientes.</p>}
                </article> 
                 <article className="contBotonerasHm-Mq">
                    <h3>Recetas Activas {renderAddButton('Añadir Receta')}</h3>
                    {mascota.recetasActivas ? (
                        <div className="contBotonHm-Mq">
                            <i className="bi bi-capsule"></i>
                            <div className="contenedorBotoneraIntHm-Mq">
                                <strong>{mascota.recetasActivas?.medicamento}</strong>
                                <p>Receta valida hasta - {mascota.recetasActivas?.fechavalidez}</p>
                            </div>        
                        </div>
                    ):(
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
    )
}

export default HistorialMascotaMq