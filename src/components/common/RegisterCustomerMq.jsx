import { useState, useEffect } from 'react'
import '@/components/styles/RegisterMq.css'
import { obtenerBarrios } from '@/api/neighborhoodsApi'
import  {registerCustomerApi} from '@/api/customerApi'

export default function RegisterCustomerMq({setChange, datosUsuario}) {
    const [telefono, setTelefono] = useState('')
    const [nacimiento, setNacimiento] = useState('')
    const [direccion, setDireccion] = useState('')
    const [detalle, setDetalle] = useState('')
    const [barrio, setBarrio] = useState('1')
    const [numeroIdentificacion, setNumeroidentificacion] = useState('')
    const [tipoDocumento, setTipoDocumento] = useState('1')
    
    //Lista de barrios para el select
    const [neighbors, setNeighbors] = useState([])
    //Estado de carga
    const [isLoading, setIsLoading] = useState(false);

    //Manejo de error por mensaje
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        obtenerBarrios()
        .then((data) => {
            setNeighbors(data);
            if(data.length > 0) {
                setBarrio(data[0].id.toString()); // Asegura que el valor inicial sea un ID válido
            }
        })
        .catch((error) => setMensaje(error.message));
    }, []);


    const handleRegisterCustomer = async (e) => {
        e.preventDefault()
        setMensaje('')

        // Usanmos el UserId que viene desde el anterior form
        const userId = datosUsuario.current?.userId

        if (!userId) {
            setMensaje('Error: ID de usuario no encontrado. Reintenta el registro de usuario.');
            return;
        }
        
    //conversion de datos a JSON de CustomerData
        const customerData = {
                documentNumber: numeroIdentificacion,
                address: direccion,
                addressDetail: detalle,
                birthdate: nacimiento,
                phone: telefono,
                userId: userId,
                documentTypeId: parseInt(tipoDocumento),
                neighborhoodId: parseInt(barrio)
            };
        
        console.log("Datos del Customer a enviar:", customerData);    
        
        setIsLoading(true); // Iniciar estado de carga

        try{
            const customerResponse = await registerCustomerApi(customerData);
            console.log("Respuesta del registro de Customer:", customerResponse);
            setChange("exito");
        }catch (error) {
            console.error("Fallo en el registro del cliente:", error);
            const detail = error.response?.data?.detalle || error.response?.data?.message || error.message;
            setMensaje(`Fallo en el registro del cliente: ${detail}`);            
        }finally{
            setIsLoading(false); // Finalizar estado de carga
        }
    }

    return (
        <div className="contentForm3">
            <form className='formRU-Mq' onSubmit={handleRegisterCustomer}>
                <div className="contTitle">
                    <h1>Logo</h1>
                </div>
                <div className="contSubtitle">
                    <h3>Crear Nueva Cuenta</h3>
                    <p>Completa la informacion para registrarte</p>
                </div>
                <article>
                    <div className="infoPersonalOneL-Mq">
                        <div className="contUser3">
                            <p>Tipo documento</p>
                            <select name="tipDoc" id="101" onChange={(e) => setTipoDocumento(e.target.value)}>
                                <option value="1">Cedula Ciudadania</option>
                                <option value="2">Cedula Extranjera</option>
                                <option value="3">Tarjeta de identidad</option>
                                <option value="4">Pasaporte</option>
                                <option value="5">Registro Civil</option>
                                <option value="6">Proteccion Temporal</option>
                            </select>
                        </div>
                        <div className="contUser3" >
                            <p>Numero de documento</p>
                            <input type="text" placeholder='Ingresa tu numero de documento' required onChange={(e) => setNumeroidentificacion(e.target.value)}/>
                        </div>
                        <div className="contUser3" >
                            <p>Telefono</p>
                            <input type="text" placeholder='Ingresa tu numero de telefono' required onChange={(e) => 				setTelefono(e.target.value)}/>
                        </div>
                        <div className="contUser3" >
                                <p>Fecha de Nacimiento</p>
                                <input type="date"  required onChange={(e) => setNacimiento(e.target.value)}/>
                            </div>
                            <div className="contUser3">
                                <p>Direccion</p>
                                <input type="text" placeholder='Direccion de tu residencia' required onChange={(e) => setDireccion(e.target.value)}/>
                            </div>
                            <div className="contUser3">
                                <p>Detalle de Direccion</p>
                                <input type="text" placeholder='Detalle de tu Direccion' onChange={(e) => setDetalle(e.target.value)}/>
                            </div>
                            <div className="contUser3">
                                <p>Barrio</p>
                                <select name="barrio" id="101" onChange={(e) => setBarrio(e.target.value)}>
                                    {neighbors.map((item, index) => {
                                        return <option key={index} value={item.id}>{item.name}</option>
                                    })}
                                </select>
                        </div>
                        <p>{mensaje}</p>
                        <div className="contBtnThreeL-Mq">
                            <button type="submit" disabled={isLoading} >{isLoading ? 'Registrando...' : 'Enviar'}</button>
                        </div>
                    </div>
                </article>
            </form>
        </div>
            
        
    )
}
