import HeaderLg from '../components/Laura/HeaderLg'
import '../components/styles/HistorialMascotaMq.css'
import FooterLg from '../components/Laura/FooterLg'
import CardsByMq from '../components/Manuel/CardsByMq'
import { useLocation, Link } from 'react-router-dom'



function HistorialMascotaMq() {
    const locacion = useLocation()
    const mascota = locacion.state?.mascota
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
                    <h3>Datos Generales</h3>
                    <table>
                         {/* 💡 Recomienda usar <tbody> en las tablas de React */}
                        <tbody><tr>
                                <td><i className="bi bi-calendar"></i> Nacimiento</td>
                                <td>{mascota.birthdate}</td> {/* 👈 Usar birthdate */}
                                <td>{calcularEdad(mascota.birthdate)}</td> {/* 👈 Usar edad calculada */}
                            </tr>
                            <tr>
                                <td><i className="bi bi-cpu"></i> Microchip</td>
                                <td>{mascota.microchip || 'Sin registrar'}</td> {/* 👈 Usar microchip */}
                            </tr>
                            <tr>
                                <td><i className="bi bi-palette"></i> Color</td>
                                <td>{mascota.color}</td> {/* 👈 Usar color */}
                            </tr>
                            <tr>
                                <td><i className="bi bi-speedometer2"></i> Peso</td>
                                <td>{mascota.weight} Kg</td> {/* 👈 Usar weigth */}
                            </tr></tbody>
                    </table>
                </article>
                {/* <article className="contDatosGenHm-Mq">
                    <h3>Vacunas</h3>
                    <table>
                        {mascota.vacunas.map((item,index)=> {
                            return(
                                <tr key={index}>
                                    <td><i class="bi bi-journal-medical"></i> {item.nombre}</td>
                                    <td>{item.fechaUlti}</td>
                                    <td>{item.fechaProx}</td>
                                </tr>
                            )
                        })}
                    </table>
                </article> */}
                {/* <article className="contBotonerasHm-Mq">
                    <h3>Alergias y Condiciones</h3>
                    <div className="contBotonHm-Mq">
                        <i class="bi bi-check-circle"></i>
                        <strong>{mascota.alergias || 'Sin alergias registradas'}</strong>
                    </div>
                    <div className="contBotonHm-Mq">
                        <i class="bi bi-bandaid"></i>
                        <div className="contenedorBotoneraIntHm-Mq">
                            <strong>Condicion cronica</strong>
                            <p>{mascota.condicion || 'Ninguna registrada'}</p>
                        </div>
                    </div>
                </article> */}
                {/* <article className="contBotonerasHm-Mq">
                    <h3>Consultas recientes</h3>
                    {mascota.ultconsultas.map((item, index)=>{
                        return(
                            <div className="contBotonHm-Mq" key={index}>
                                <i class="bi bi-calendar-plus"></i>
                                <div className="contenedorBotoneraIntHm-Mq">
                                    <strong>{item.tipo}</strong>
                                    <p>{item.fecha} - {item.descripcion}</p>
                                </div>
                            </div>
                        )
                    })}
                </article> */}
                {/* <article className="contBotonerasHm-Mq">
                    <h3>Recetas Activas</h3>
                    {mascota.recetasActivas ? (
                        <div className="contBotonHm-Mq">
                            <i class="bi bi-capsule"></i>
                            <div className="contenedorBotoneraIntHm-Mq">
                                <strong>{mascota.recetasActivas?.medicamento}</strong>
                                <p>Receta valida hasta - {mascota.recetasActivas?.fechavalidez}</p>
                            </div>        
                        </div>
                    ):(
                        <div className="contBotonHm-Mq">
                            <i class="bi bi-capsule"></i>
                            <div className="contenedorBotoneraIntHm-Mq">
                                <strong>No hay recetas activas</strong>
                            </div>        
                        </div> 
                    )}
                </article> */}
            </div>
            <FooterLg />
        </>


    )
}

export default HistorialMascotaMq