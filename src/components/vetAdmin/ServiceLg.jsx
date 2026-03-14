import "@/components/styles/ServiceLg.css"
import imgVetConsult from "@/assets/images/service_vet_consult.png"

export default function ServiceLg() {
    return (
        <section className="servicios-favoritos">
            <h2 className="titulo-servicios">¡Los mejores cuidados para tu mascota! 🐾</h2>
            <p className="descripcion-servicios">Brindamos amor y bienestar con cada servicio. 💖</p>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img src={imgVetConsult} alt="Consulta Veterinaria" style={{ maxWidth: '100%', borderRadius: '15px' }} />
            </div>

            <div className="contenedor-servicios">
                <div className="servicio">
                    <i className="bi bi-scissors"></i>
                    <h3>Peluquería</h3>
                    <p>Cortes, baños y spa para consentir a tu mascota.</p>
                </div>

                <div className="servicio">
                    <i className="bi bi-shield-check"></i>
                    <h3>Esterilización</h3>
                    <p>Un procedimiento seguro para su bienestar y salud.</p>
                </div>

                <div className="servicio">
                    <i className="bi bi-heart-pulse"></i>
                    <h3>Consulta Veterinaria</h3>
                    <p>Atención médica especializada para tu mejor amigo.</p>
                </div>
            </div>
        </section>
    )
}

