import { useState } from 'react'
import '@/components/styles/RegisterMq.css'
import { registerVeterinaryApi } from '@/api/veterinaryClinicApi'

export default function RegisterVeterinariaMq({setChange, datosUsuario}) {
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState(datosUsuario.current?.email || '')
    const [documentNumber, setDocumentNumber] = useState('')
    
    //Estado de carga
    const [isLoading, setIsLoading] = useState(false);

    //Manejo de error por mensaje
    const [mensaje, setMensaje] = useState('')

    const handleRegisterVeterinary = async (e) => {
        e.preventDefault()
        setMensaje('')

        const userId = datosUsuario.current?.userId;
        if (!userId) {
            setMensaje("Error: ID de usuario no encontrado.");
            return;
        }

        const vetData = {
            address: address,
            phone: phone,
            email: email,
            documentNumber: documentNumber,
            userId: userId,
            idDocumentType: 6 // NIT por defecto
        };
        
        console.log("Payload a enviar a /api/veterinary-clinics:", JSON.stringify(vetData));
        setIsLoading(true);

        try{
            await registerVeterinaryApi(vetData);
            setChange("exito");
        } catch (error) {
            console.error("Fallo en el registro de la veterinaria:", error);
            const detail = error.response?.data?.detalle || error.response?.data?.message || error.message;
            setMensaje(`Fallo en el registro de la clínica: ${detail}`);
        } finally {
            setIsLoading(false); 
        }
    }

    return (
        <div className="contentForm3">
            <form className='formRU-Mq' onSubmit={handleRegisterVeterinary}>
                <div className="contTitle">
                    <h1>PetCare</h1>
                </div>
                <div className="contSubtitle">
                    <h3>Información de tu Veterinaria</h3>
                    <p>Completa los datos corporativos de la clínica</p>
                </div>
                <article>
                    <div className="infoPersonalOneL-Mq">
                        <div className="contUser3" >
                            <p>NIT o Documento de Identidad</p>
                            <input type="text" placeholder='Ingresa el NIT' required onChange={(e) => setDocumentNumber(e.target.value)}/>
                        </div>
                        <div className="contUser3" >
                            <p>Teléfono Corporativo</p>
                            <input type="text" placeholder='Ej: +57 320 000 0000' required onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className="contUser3">
                            <p>Dirección de la Veterinaria</p>
                            <input type="text" placeholder='Ej: Carrera 15 #123-45' required onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                        <div className="contUser3">
                            <p>Correo de Contacto</p>
                            <input type="email" value={email} placeholder='clinica@ejemplo.com' required onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        
                        {mensaje && <p className="message-error" style={{color: 'red'}}>{mensaje}</p>}
                        
                        <div className="contBtnThreeL-Mq">
                            <button type="submit" disabled={isLoading} >{isLoading ? 'Registrando...' : 'Finalizar Registro'}</button>
                        </div>
                    </div>
                </article>
            </form>
        </div>
    )
}
