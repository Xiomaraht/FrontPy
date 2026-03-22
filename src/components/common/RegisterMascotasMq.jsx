import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 🚨 Nuevo import: useNavigate para la navegación
import { message } from 'antd'; 
import { getCustomerApi } from '@/api/customerApi'; 
import { getSpeciesApi, getRacesBySpecieIdApi } from '@/api/dataApi';
import { registerPetForCustomer } from '@/api/petsApi'; 
import { uploadImageToCloudinary } from '@/utilities/useImageUploader'; // 🚨 Ruta de utilidad actualizada
import '@/components/styles/RegisterMascotasMq.css';

// Función para obtener información del usuario de localStorage
const getUserInfoFromStorage = () => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
        try {
            return JSON.parse(userInfoString);
        } catch (error) {
            console.error("Error al parsear userInfo:", error);
            return null;
        }
    }
    return null;
};

export default function RegisterMascotasMq() {

    // ----------------------------- DEPURACION -------------------------------
    useEffect(() => {
        try {
            const userInfoString = localStorage.getItem('userInfo');
            if (userInfoString) {
                const userInfo = JSON.parse(userInfoString);
                console.log("======================================");
                console.log("✅ Rol del usuario cargado:", userInfo.rol);
                console.log("✅ ID del usuario cargado:", userInfo.userId);
                console.log("======================================");
            } else {
                console.log("❌ userInfo no encontrado en localStorage.");
            }
        } catch (error) {
            console.error("❌ Error al parsear userInfo del localStorage:", error);
        }
    }, []);
    // ----------------------- FIN DE DEPURACION ---------------------------------
    const redireccion = useNavigate();

    // 1. ESTADOS DE FORMULARIO
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [microchip, setMicrochip] = useState('');
    const [color, setColor] = useState('');
    const [weight, setWeight] = useState('');
    
    const [terminos, setTerminos] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. ESTADOS PARA SELECTS Y DATOS MAESTROS (Usaremos IDs, no nombres)
    const [species, setSpecies] = useState([]);
    const [races, setRaces] = useState([]);
    const [selectedSpecieId, setSelectedSpecieId] = useState(''); // ID de la Especie (para filtrar razas)
    const [selectedRaceId, setSelectedRaceId] = useState('');     // ID de la Raza (el que se envía al backend)

    // 3. EFECTO PARA CARGAR ESPECIES AL MONTAR
    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const data = await getSpeciesApi();
                setSpecies(data);
            } catch (error) {
                console.error("Error al cargar especies:", error);
                message.error('Fallo al cargar la lista de especies.');
            }
        };
        fetchSpecies();
    }, []);

    // 4. EFECTO PARA CARGAR RAZAS CUANDO CAMBIA LA ESPECIE
    useEffect(() => {
        if (selectedSpecieId) {
            const fetchRaces = async () => {
                setRaces([]); // Limpiar razas anteriores
                setSelectedRaceId(''); // Limpiar la raza seleccionada
                try {
                    const data = await getRacesBySpecieIdApi(selectedSpecieId);
                    setRaces(data);
                } catch (error) {
                    console.error("Error al cargar razas:", error);
                    message.error('Fallo al cargar la lista de razas.');
                }
            };
            fetchRaces();
        } else {
            setRaces([]);
        }
    }, [selectedSpecieId]);


    // 5. FUNCIÓN DE REGISTRO ASÍNCRONA
    const handleRegisterMascota = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return; 
        
        if (!selectedRaceId) {
            message.warning("Por favor, selecciona una especie y una raza.");
            return;
        }

        setIsSubmitting(true);
        message.loading('Iniciando registro...');
        
        let imageUrl = '';
        let customerId = null;

        try {
            // A. OBTENER EL ID DEL CLIENTE (CUSTOMER)
            const userInfo = getUserInfoFromStorage();
            if (!userInfo || !userInfo.userId) {
                throw new Error('Usuario no autenticado. Por favor, inicie sesión.');
            }
            
            const customerData = await getCustomerApi(userInfo.userId);
            customerId = customerData.id;
            
            if (!customerId) {
                throw new Error("No se pudo obtener el ID del cliente.");
            }
            
            // B. SUBIR IMAGEN A CLOUDINARY
            if (photoFile) {
                message.loading('Subiendo foto a la nube...');
                imageUrl = await uploadImageToCloudinary(photoFile); 
                message.destroy();
            } else {
                throw new Error('Debe seleccionar una foto para la mascota.');
            }
            
            // C. CONSTRUIR EL DTO DE REGISTRO (PetRegistrationDTO)
            // Ya no usamos raceName/specieName, ¡usamos raceId!
            const cleanOpcional = (val) => {
                if (!val) return null;
                const trimmed = val.trim();
                if (trimmed.toLowerCase() === 'opcional' || trimmed === '') return null;
                return trimmed;
            };

            const petRegistrationDTO = {
                imageUrl: imageUrl, 
                name: name,
                birthdate: birthdate, 
                microchip: cleanOpcional(microchip), 
                color: cleanOpcional(color), 
                weight: cleanOpcional(weight),
                gender: gender.toUpperCase(), 
                raceId: parseInt(selectedRaceId),
                status: true
            };
            
            console.log("Pet Registration DTO a enviar:", petRegistrationDTO);

            // D. REGISTRAR MASCOTA
            message.loading('Registrando mascota...');
            await registerPetForCustomer(customerId, petRegistrationDTO); 
            message.destroy();

            // E. MANEJAR ÉXITO Y REDIRECCIONAR
            message.success('¡Mascota registrada con éxito!');
            redireccion('/miperfil'); // 🚨 Uso de la redirección
            
        } catch (error) {
            message.destroy();
            console.error("Error en el registro:", error);
            message.error(`Fallo en el registro: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // 6. RENDERIZADO DEL FORMULARIO
    return (
        <div className="contentForm4">
            <form onSubmit={handleRegisterMascota}>
                <div onClick={()=>{redireccion('/miperfil')}} className='returniconL-Mq'>
                    <i className="bi bi-arrow-left-circle"></i>
                    <span>Regresar</span>
                </div>
                <div className="contTitle">
                    <h1>Logo</h1>
                </div>
                <div className="contSubtitle">
                    <h3>Crear Nueva Mascota</h3>
                    <p>Completa la información para registrar tu mascota</p>
                </div>
                <article>
                    <div className="infoMascotaL-Mq">
                        {/* NOMBRE */}
                        <div className="contUser3">
                            <p>Nombre</p>
                            <input 
                                type="text" 
                                placeholder='Ingresa el nombre de tu mascota' 
                                required 
                                onChange={(e) => {setName(e.target.value)}}
                                value={name}
                            />
                        </div>
                        
                        {/* -------------------- SELECT ESPECIE -------------------- */}
                        <div className="contUser3">
                            <p>Especie</p>
                            <select 
                                required 
                                value={selectedSpecieId}
                                onChange={(e) => setSelectedSpecieId(e.target.value)}
                            >
                                <option value="" disabled>Selecciona la especie</option>
                                {species.map(specie => (
                                    <option key={specie.id} value={specie.id}>{specie.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* -------------------- SELECT RAZA -------------------- */}
                        <div className="contUser3">
                            <p>Raza</p>
                            <select 
                                required 
                                value={selectedRaceId}
                                onChange={(e) => setSelectedRaceId(e.target.value)}
                                disabled={!selectedSpecieId || isSubmitting}
                            >
                                <option value="" disabled>
                                    {selectedSpecieId ? (races.length > 0 ? 'Selecciona la raza' : 'Cargando/Sin razas...') : 'Selecciona primero una especie'}
                                </option>
                                {races.map(race => (
                                    <option key={race.id} value={race.id}>{race.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* FECHA DE NACIMIENTO */}
                        <div className="contUser3" >
                            <p>Fecha de Nacimiento</p>
                            <input 
                                type="date" 
                                placeholder='Fecha de nacimiento de tu mascota' 
                                required 
                                onChange={(e)=> {setBirthdate(e.target.value)}}
                                value={birthdate}
                            />
                        </div>
                        {/* GÉNERO */}
                        <div className="contUser3" id='contGeneroLo-Mq'>
                            <p>Genero</p>
                            <div id='genreMascotaMq'>
                                <div className='checkMq'>
                                    <input 
                                        type="radio" 
                                        id='macho' 
                                        name="genero_mascota" 
                                        value='MACHO' 
                                        required 
                                        onChange={(e)=>{setGender(e.target.value)}}
                                    />
                                    <label htmlFor='macho'>Macho</label>
                                </div>
                                <div className='checkMq'>
                                    <input 
                                        type="radio" 
                                        id='hembra' 
                                        name="genero_mascota" 
                                        value='HEMBRA' 
                                        required 
                                        onChange={(e)=>{setGender(e.target.value)}}
                                    />
                                    <label htmlFor='hembra' >Hembra</label>
                                </div>
                            </div>
                        </div>
                        {/* Opcionales del DTO */}
                        <div className="contUser3"><p>Microchip</p><input type="text" placeholder='Opcional' onChange={(e)=>{setMicrochip(e.target.value)}} value={microchip}/></div>
                        <div className="contUser3"><p>Color</p><input type="text" placeholder='Opcional' onChange={(e)=>{setColor(e.target.value)}} value={color}/></div>
                        <div className="contUser3"><p>Peso (kg)</p><input type="text" placeholder='Opcional' onChange={(e)=>{setWeight(e.target.value)}} value={weight}/></div>
                        {/* FOTO DE LA MASCOTA */}
                        <div className="contUploadFile-Mq" >
                            <p>Foto de tu mascota</p>
                            <input 
                                type="file" 
                                id="photoMascota" 
                                accept='image/png, image/jpeg' 
                                onChange={(e)=>{setPhotoFile(e.target.files[0])}}
                                required
                            />
                            <label htmlFor="photoMascota">
                                <p>
                                    {photoFile ? `Archivo: ${photoFile.name}` : 'Sube una foto o arrastra y suelta PNG, JPG hasta 5MB'}
                                </p>
                            </label>
                        </div>
                    </div>
                </article>
                <div className="check2Mq">
                    <input 
                        type="checkbox" 
                        id='terminos' 
                        value='terminos' 
                        required 
                        onChange={(e)=>{setTerminos(e.target.checked)}}
                        checked={terminos}
                    />
                    <strong htmlFor='terminos'>Acepta los terminos y condiciones</strong>
                    <p>Al crear una cuenta, acepta las terminos de servicio y la politica de privacidad.</p>
                </div>
                <div className="contBtn">
                    <button type="submit" disabled={isSubmitting || !terminos}>
                        {isSubmitting ? 'Registrando...' : 'Crear cuenta'} 
                    </button>
                    <button type="button" onClick={()=> {redireccion('/miperfil')}} disabled={isSubmitting}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}