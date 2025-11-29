import { useState } from 'react'
import { registerUserApi } from '../../api/LoginApi.js'


export default function RegisterUserMq({setChange, datosUsuario}) {
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')
    const [confirmar, setConfirmar] = useState('')
    const [imageProfile, setImageProfile] = useState('')
    const [login, setLogin] = useState('')

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
        
        let userData = {}; 
        setIsLoading(true); // Iniciar estado de carga

        try{
            const imageUrl = await uploadImageToCloudinary(imageProfile);

            //conversion de datos a objeto JSON de User
            const userData = {
                login: login,
                password: password,
                names: nombres,
                lastNames: apellidos,
                email: correo,
                imageUrl: imageUrl,
                rolId: 3
            };

            //Procedemo a enviar los datos a la API
            const registerResponse = await registerUserApi(userData);

            //De la respuesta obtengo el id
            const createdUserId = registerResponse.user_id;

            if (createdUserId) {
                // Guarda el ID para usarlo en el siguiente paso (Customer)
                datosUsuario.current = { ...userData, userId: createdUserId };

                const userDataJson = JSON.stringify(userData, null, 2);
                console.log("Datos del usuario en formato JSON:");
                console.log(userDataJson);
                setChange("registerCustomer");
            } else {
                throw new Error("El registro fue exitoso, pero la API no devolvió el ID del usuario ('user_id') en el token.");
            }
        }catch (error) {
            console.error("Error en el proceso de registro:", error.message);
            setMessage(`Fallo en el registro: ${error.message}`);
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
                    <h3>Crear Nueva Cuenta</h3>
                    <p>Completa la informacion para registrarte</p>
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
