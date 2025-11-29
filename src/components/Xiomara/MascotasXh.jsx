import '../styles/MascotasXh.css'
import CardsXh from './CardsXh'
import { getPetsByCustomerIdApi } from '../../api/petsApi';
import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';


export default function MascotasXh({perfil}) {
    const [mascotas, setMascotas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const redireccion = useNavigate();

    //Obtencion del Id desde perfil
    const customerId = perfil?.id;

    useEffect(() => {
        // La bandera isMounted es una buena práctica para efectos asíncronos.
        let isMounted = true; 

        if (!customerId) {
            if (isMounted) {
                setIsLoading(false);
            }
            return;
        }

        const fetchPets = async () => {
            try {
                //DEpuracion
                console.log(customerId)
                const petsData = await getPetsByCustomerIdApi(customerId);
                if (isMounted) {
                    setMascotas(petsData);
                    console.log("Mascotas cargadas:", petsData);
                }
            } catch (error) {
                console.error("Error al obtener las mascotas:", error);
                // No actualizamos estados o renderizamos en caso de error aquí, lo manejamos arriba.
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchPets();
        
        // 🔥 Función de limpieza: evita actualizaciones de estado si el componente se desmonta.
        return () => {
            isMounted = false;
        };

    }, [customerId]);

    const handleRegisterPet = () =>{
        redireccion('/registerPet')
    }

    if (isLoading) {
        return <div className='Mascota_1'>Cargando mascotas...</div>;
    }

    if (mascotas.length === 0) {
        return (
            <div className='Mascota_1'>
                <div className='Mascota_2'>
                    <h2>Mis Mascotas</h2>
                    <button className='Bton_1' onClick={()=>{handleRegisterPet()}}>
                        Agregar mascotas
                    </button>
                </div>
                <p>No tienes mascotas registradas.</p>
            </div>
        );
    }

    // Si hay mascotas, las mapea
    return (
        <div className='Mascota_1'>
            <div className='Mascota_2'>
                <h2>Mis Mascotas</h2>
                <button className='Bton_1'>
                    Agregar Mascotas
                </button>
            </div>
            <div className='List_1'>
                {/* Usar el estado 'mascotas' para mapear */}
                {mascotas.map(mascota => (
                    <CardsXh 
                        key ={mascota.id}
                        mascota ={mascota} // Le pasa el PetDTO completo
                    />
                ))}
            </div>
        </div>
    );

}