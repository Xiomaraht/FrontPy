import { useState } from 'react'
import { registerUserApi } from '@/api/authApi'


export default function RegisterUserMq({setChange, datosUsuario, defaultRole}) {
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [confirmar, setConfirmar] = useState('')
    const [imageProfile, setImageProfile] = useState('')
    const [login, setLogin] = useState('')
    
    // Si defaultRole es 'vet', rolId inicia en 2. Si no, en 3.
    const [rolId, setRolId] = useState(defaultRole === 'vet' ? 2 : 3) // 3 = Cliente, 2 = Veterinaria

    //Estado de carga
const [isLoading, setIsLoading] = useState(false);

    //Manejo de error por mensaje
    const [message, setMessage] = useState('')
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnzom8pgh/image/upload';
    const UPLOAD_PRESET = 'ml_default'; // Debe ser un preset SIN FIRMAR

    // Funcion para subir la imagen a Cloudinary
    const uploadImageToCloudinary = async (imageFile) => {
        // 1. Verificar que haya un archivo
        if (!imageFile) {
            console.log("Se envió la imagen vacia") // Retorna string vacío si no hay archivo
            return '';
        }

        // 2. Crear un objeto FormData para el envío
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', UPLOAD_PRESET); // Tu preset sin firmar

        try {
            // 3. Realizar la petición POST a la API de Cloudinary
            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                // Manejo de errores de Cloudinary (ej: tamaño, formato)
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'Error al subir la imagen a Cloudinary');
            }

            // 4. Obtener la respuesta y extraer la URL
            const data = await response.json();
            // 'secure_url' es la URL HTTPS que guardaremos en la API
            return data.secure_url;

        } catch (error) {
            console.error("Error en la subida a Cloudinary:", error);
            throw error; // Propagar el error para que sea manejado en handleNext
        }
    };

    const handleNext = async (e) => {
        e.preventDefault()
        setMessage('') //limpiado 

        if(password !== confirmar){
            setMessage('ERROR, LAS CONTRASENAS NO COINCIDEN')
            return;
        }

        const passwordRegex = /^(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            setMessage('ERROR, LA CONTRASEÑA DEBE TENER MÍNIMO 8 CARACTERES Y AL MENOS 1 NÚMERO');
            return;
        }
        
        let userData = {}; 
        setIsLoading(true); // Iniciar estado de carga

        try {
            const imageUrl = await uploadImageToCloudinary(imageProfile);

            // conversion de datos a objeto JSON de User
            const roleString = parseInt(rolId) === 2 ? "ROLE_VETERINARIAN" : "ROLE_CUSTOMER";
            const userData = {
                username: login,
                password: password,
                firstName: nombres,
                lastName: apellidos,
                email: correo,
                role: roleString,
                picture: imageUrl
            };

            // Procedemo a enviar los datos a la API
            const registerResponse = await registerUserApi(userData);

            // El backend devuelve ResponseEntity.ok(Map.of("data", userDTO)) o badRequest si falla
            const createdUserId = registerResponse?.data?.data?.id;

            if (createdUserId) {
                // Guarda el ID para usarlo en el siguiente paso (Customer o Veterinary)
                datosUsuario.current = { ...userData, userId: createdUserId };
                
                if (parseInt(rolId) === 3) {
                    setChange("registerCustomer");
                } else if (parseInt(rolId) === 2) {
                    setChange("registerVeterinary");
                } else {
                    setChange("exito"); 
                }
            } else {
                throw new Error("El registro falló: No se recibió el ID del usuario.");
            }
        } catch (error) {
            console.error("Error en el proceso de registro:", error);
            const detail = error.response?.data?.detalle || error.response?.data?.error || error.message;
            
            // Mapeo de errores específicos del backend
            if (detail.includes("ERROR_USERNAME_EXISTS")) {
                setMessage("El nombre de usuario ya está en uso. Por favor elige otro.");
            } else if (detail.includes("ERROR_EMAIL_EXISTS")) {
                setMessage("El correo electrónico ya está registrado. Intenta iniciar sesión.");
            } else {
                setMessage(`Fallo en el registro: ${detail}`);
            }
        } finally {
            setIsLoading(false); // Finalizar estado de carga
        }
    }

    return (
        <>      
        <div className="contentForm3">
            <form className='formRU-Mq' onSubmit={handleNext}>
                <div className="contTitle">
                    <h1>Logo</h1>
                </div>
                <div className="contSubtitle">
                            <h3>{defaultRole === 'vet' ? "Registro de Veterinaria" : "Registro de Dueño de Mascota"}</h3>
                            <p>Completa la información para registrarte como {defaultRole === 'vet' ? "Veterinario" : "Dueño de Mascota"}</p>
                        </div>
                <article>
                    <div className="infoPersonalOneL-Mq">
                        {/* Primero registramos al user */}
                        <div className="contUser3">
                            <p>Nombre</p>
                            <input type="text" placeholder='Ingresa tu nombre' required onChange={(e) => setNombres(e.target.value)}/>
                        </div>
                        <div className="contUser3">
                            <p>Apellidos</p>
                            <input type="text" placeholder='Ingresa tus apellidos' required onChange={(e) => setApellidos(e.target.value)}/>
                        </div>

                        <div className="contUser3">
                            <p>Nombre de usuario</p>
                            <input type="text" placeholder='Ingresa tu username' required onChange={(e) => setLogin(e.target.value)}/>
                        </div>
                        <div className="contUser3" >
                            <p>Contraseña</p>
                            <input type="password" placeholder='Crea una contraseña segura' required onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="contUser3" >
                            <p>Confirma tu Contraseña</p>
                            <input type="password" placeholder='Confirma tu contraseña' required onChange={(e) => setConfirmar(e.target.value)}/>
                        </div>

                        <div className="contUser3">
                            <p>Correo Electronico</p>
                            <input type="email" placeholder='ejemplo@correo.com' required onChange={(e) => setCorreo(e.target.value)}/>
                        </div>

                        {/* Ocultar el dropdown de rol si ya elegimos un botón específico */}
                        <div className="contUser3" style={{ display: defaultRole ? 'none' : 'block' }}>
                            <p>Rol</p>
                            <select className="select-rol" required onChange={(e) => setRolId(e.target.value)} value={rolId}>
                                <option value="3">Dueño de Mascota</option>
                                <option value="2">Veterinaria</option>
                            </select>
                        </div>

                        <div className="contUploadFile-Mq" >
                            <p>Foto de tu perfil</p>
                            <input 
                                type="file" 
                                id="photoPerfil" 
                                accept='image/png, image/jpeg' 
                                onChange={(e)=>{
                                    // Al seleccionar o arrastrar el archivo, actualizamos el estado:
                                    if(e.target.files && e.target.files[0]){
                                        setImageProfile(e.target.files[0]);
                                    } else {
                                        setImageProfile('');
                                    }
                                }}
                            />
                            <label htmlFor="photoPerfil">
                                {/* 
                                    Aquí aplicamos la lógica condicional: 
                                    Si hay una imagen en el estado, mostramos un mensaje de éxito. 
                                */}
                                {imageProfile ? (
                                    <div style={{ color: 'green', fontWeight: 'bold', textAlign: 'center', margin: '3vh 0' }}>
                                        ✅ ¡Imagen cargada con éxito!
                                        <p style={{ fontSize: '0.9em', fontWeight: 'normal', color: 'var(--colorTituloOscura)' }}>
                                        Archivo: {imageProfile.name}
                                        </p>
                                    </div>
                                ) : (
                                    // Mensaje por defecto cuando no hay imagen
                                    <p>Sube una foto o arrastra y suelta PNG, JPG hasta 5MB</p>
                                )}
                            </label>
                        </div>
                        <p>{message}</p>
                        <div className="contBtnThreeL-Mq">
                            <button type="submit" disabled={isLoading}>{isLoading ? 'Cargando...' : 'Siguiente'}</button>
                            <button onClick={()=> {setChange('log')}}>Cancelar</button>
                        </div>
                    </div>
                </article>
            </form>
        </div>
            
        </>
    )
}
