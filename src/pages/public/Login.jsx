import { useState,useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {loginApi} from '@/api/LoginApi'
import { recuperarPasswordApi, resetPasswordApi } from '@/api/authApi'
import { jwtDecode } from 'jwt-decode'
import '@/components/styles/Login.css'
import RegisterMq from '@/components/common/RegisterMq'
import RegisterMascotasMq from '@/components/common/RegisterMascotasMq'
import SuccessLoginMq from '@/components/common/SuccessLoginMq'
import Logo from '@/components/images/logo.png';


export default function Login() {
//datos de registros compartidos entre el componente
const datosUsuarioRef = useRef({}); 
//Busqueda de parametros en la URL
const [busquedaParametros]  = useSearchParams()
//Lectura de la accion 
const action = busquedaParametros.get('action')   
const roleParam = busquedaParametros.get('role')
//useState de cambio de pagina     
const [change, setChange] = useState(action === 'register' ? 'register' : 'log')
//Navigate para redirigir al usuario
const redireccion = useNavigate();
//useState para captura de datos del Login
const [login, setLogin] = useState('')
const [password, setPassword] = useState('')
const [recuperacionEmail, setRecuperacionEmail] = useState('')
const [resetToken, setResetToken] = useState('')
const [newPassword, setNewPassword] = useState('')
const [confirmNewPassword, setConfirmNewPassword] = useState('')

//useState de manejo de errores e indicadores de carga
const [mensaje, setMensaje] = useState('')
const [isLoading, setIsLoading] = useState(false)

//Funcion del control del envio, ahora asincrona para el manejo de la API
const manejoLogin = async (e) => {
    e.preventDefault() 
    setMensaje('Iniciando sesión...')

    try {
        // Enviamos datos a la API
        const tokenData = await loginApi(login, password);
        
        // Aquí corregimos: el token viene como "token" desde tu backend
        const { token } = tokenData;

        if (!token || typeof token !== 'string') {
            throw new Error("Token inválido recibido del backend");
        }

        // Decodificamos el token
        const decodificarToken = jwtDecode(token);

        // Creamos el objeto con la info del usuario
        const userInfo = {
            userId: decodificarToken.id, // ID numérico de la BD
            login: decodificarToken.sub, // Username
            names: decodificarToken.nombreCompleto || '', 
            rol: decodificarToken.rol || 'ROLE_USER'
        };

        // Guardamos token y datos del usuario
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        setMensaje('Inicio de sesión exitoso. Redirigiendo...');

        // Redirección según el rol
        console.log("UserInfo Rol:", userInfo.rol);
        if(userInfo.rol === 'ROLE_ADMIN'){ 
            console.log("Redirigiendo a /ingresoAdmin");
            redireccion('/ingresoAdmin'); 
        } else if(userInfo.rol === 'ROLE_VETERINARIAN'){
            console.log("Redirigiendo a /adminClient");
            redireccion('/adminClient'); 
        } else if(userInfo.rol === 'ROLE_CUSTOMER'){
            console.log("Redirigiendo a /miperfil");
            redireccion('/miperfil'); 
        } else {
            console.log("Redirigiendo a / (Home)");
            redireccion('/'); 
        }

    } catch(error) {
        console.error('Error durante la autenticación:', error.message);
        setMensaje("Usuario o contraseña incorrectos");
    } finally {
        setIsLoading(false);
    }
}

// Control envio de email para recuperar
const handleForgotPswd = async (e) => {
    e.preventDefault();
    setMensaje('Enviando código...');
    setIsLoading(true);
    try {
        await recuperarPasswordApi(recuperacionEmail);
        setMensaje('Tu código ha sido enviado al correo electrónico.');
        // Cambiar a la vista de código
        setTimeout(() => setChange('reset-pswd'), 2000);
    } catch (error) {
        setMensaje(error.response?.data || "Error enviando el correo. Revisa si existe en el sistema.");
    } finally {
        setIsLoading(false);
    }
}

// Control de restablecimiento final
const handleResetPswd = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
        setMensaje('Las contraseñas nuevas no coinciden');
        return;
    }
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        setMensaje('ERROR, LA CONTRASEÑA DEBE TENER MÍNIMO 8 CARACTERES Y AL MENOS 1 NÚMERO');
        return;
    }
    setMensaje('Reestableciendo contraseña...');
    setIsLoading(true);
    try {
        await resetPasswordApi(resetToken, newPassword);
        setMensaje('¡Contraseña actualizada con éxito! Ingresa sesión ahora.');
        setTimeout(() => setChange('log'), 3000);
    } catch (error) {
        setMensaje(error.response?.data || "El token es inválido o ha expirado.");
    } finally {
        setIsLoading(false);
    }
}
//useState para registro
    if(change==='log'){
        return (
            <div className="contentForm">
                <form onSubmit={manejoLogin}>
                    <div className="contTitle">
                    <div className="logo-container">
                        <img src={Logo} alt="Logo PetCare" className="login-logo" />
                        <h1 className="logo-text">PetCare</h1>
                    </div>
                    </div>

                    <div className="contSubtitle">
                        <h3>Bienvenido de nuevo</h3>
                        <p>Ingresa tus credenciales para acceder a tu cuenta</p>
                    </div>
                    <div className="contUser">
                        <input type="text" placeholder='Nombre de usuario' id='username' onChange={(e) => setLogin(e.target.value)}/>
                    </div>
                    <div className="contUser" id='secundario'>
                        <input type="password" placeholder='Contraseña' id='passIngreso' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {mensaje && <p className="message">{mensaje}</p>}
                    <div className="questions">
                        <p><span onClick={() => setChange('fgt-pswd')}>¿Ha olvidado su contraseña?</span></p>
                    </div>
                    <div className="check">
                        <input type="checkbox" />
                        <p>Guardar informacion de inicio de sesión</p>
                    </div>
                    <div className="contBtn">
                        <button type="submit">Iniciar Sesion</button>
                    </div>
                    <div className="contRegister">
                        <span onClick={()=> setChange('register')}>¿No tiene una? Cree una.</span>
                    </div>
                </form>
            </div>
        )
    }else if(change==='fgt-pswd'){
        return(
            <div className="contentForm2">
                <form onSubmit={handleForgotPswd}>
                    <div className="contTitle">
                        <h1>Logo</h1>
                    </div>
                    <div className="contSubtitle2">
                        <h3>¿Olvidaste tu contraseña?</h3>
                        <p>Ingresa tu correo electronico y te enviaremos un código para restablecer tu contraseña</p>
                    </div>
                    <div className="contUser">
                        <input type="email" placeholder='Correo Electronico' required onChange={(e) => setRecuperacionEmail(e.target.value)}/>
                    </div>
                    {mensaje && <p className="message" style={{color: 'orange', textAlign: 'center'}}>{mensaje}</p>}
                    <div className="contBtn2">
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Enviando...' : 'Enviar enlace de recuperacion'}</button>
                    </div>
                    <div className="contLink">
                        <i className="bi bi-arrow-left-circle"></i>
                        <p><span onClick={()=> setChange('log')}>Volver al inicio de sesion</span></p>
                    </div>
                    <hr id='hrL-Mq'/>
                    <div className="contInfo">
                        <div className="miniTitle">
                            <i className="bi bi-info-circle"></i>
                            <p>Información</p>
                        </div>
                        <p>Sí no recibes un correo electronico en unos minutos, revisa tu carpeta de spam o verifica que la direccion de correo electronico sea correcta.</p>
                    </div>
                </form>
            </div>
        )
    }else if(change==='reset-pswd'){
        return(
            <div className="contentForm2">
                <form onSubmit={handleResetPswd}>
                    <div className="contTitle">
                        <h1>Logo</h1>
                    </div>
                    <div className="contSubtitle2">
                        <h3>Ingresa el Código de Recuperación</h3>
                        <p>Se ha enviado un token de confirmación a tu correo electrónico</p>
                    </div>
                    <div className="contUser">
                        <input type="text" placeholder='Token o Código de Recuperación (Ej: ac55-123x...)' required onChange={(e) => setResetToken(e.target.value)}/>
                    </div>
                    <div className="contUser" style={{marginTop: '10px'}}>
                        <input type="password" placeholder='Nueva Contraseña (+8 letras y 1 número)' required onChange={(e) => setNewPassword(e.target.value)}/>
                    </div>
                    <div className="contUser" style={{marginTop: '10px'}}>
                        <input type="password" placeholder='Confirmar Nueva Contraseña' required onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    </div>
                    {mensaje && <p className="message" style={{color: 'orange', textAlign: 'center'}}>{mensaje}</p>}
                    <div className="contBtn2">
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Restableciendo...' : 'Restablecer Contraseña'}</button>
                    </div>
                    <div className="contLink">
                        <i className="bi bi-arrow-left-circle"></i>
                        <p><span onClick={()=> setChange('fgt-pswd')}>Solicitar nuevo código</span></p>
                    </div>
                </form>
            </div>
        )
    }else if(change === 'register'){
        return (
            <RegisterMq setChange={setChange} datosUsuario={datosUsuarioRef} defaultRole={roleParam}/>
        )
    }else if(change === 'exito'){
        return(
            <SuccessLoginMq setChange={setChange} datosUsuario={datosUsuarioRef.current}/>
        )
    }else {
        return null
    }

}
