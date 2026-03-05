import { useState,useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {loginApi} from '../api/LoginApi'
import { jwtDecode } from 'jwt-decode'
import '../components/styles/Login.css'
import RegisterMq from '../components/Manuel/RegisterMq'
import RegisterMascotasMq from '../components/Manuel/RegisterMascotasMq'
import SuccessLoginMq from '../components/Manuel/SuccessLoginMq'
import Logo from '../components/images/Logo.png';


export default function Login() {
//datos de registros compartidos entre el componente
const datosUsuarioRef = useRef({}); 
//Busqueda de parametros en la URL
const [busquedaParametros]  = useSearchParams()
//Lectura de la accion 
const action = busquedaParametros.get('action')   
//useState de cambio de pagina     
const [change, setChange] = useState(action === 'register' ? 'register' : 'log')
//Navigate para redirigir al usuario
const redireccion = useNavigate();
//useState para captura de datos del Login
const [login, setLogin] = useState('')
const [password, setPassword] = useState('')

//useState de manejo de errores 
const [mensaje, setMensaje] = useState('')

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
            login: decodificarToken.sub,
            names: decodificarToken.names || '',
            rol: decodificarToken.rol || 'ROLE_USER'
        };

        // Guardamos token y datos del usuario
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        setMensaje('Inicio de sesión exitoso. Redirigiendo...');

        // Redirección según el rol
        if(userInfo.rol === 'ROLE_ADMIN'){ 
            redireccion('/adminClient'); 
        } else if(userInfo.rol === 'ROLE_CUSTOMER'){
            redireccion('/'); 
        } else {
            redireccion('/dashboard'); 
        }

    } catch(error) {
        console.error('Error durante la autenticación:', error.message);
        setMensaje("Usuario o contraseña incorrectos");
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
                <form>
                    <div className="contTitle">
                        <h1>Logo</h1>
                    </div>
                    <div className="contSubtitle2">
                        <h3>¿Olvidaste tu contraseña?</h3>
                        <p>Ingresa tu correo electronico y te enviaremos un enlace para restablecer tu contraseña</p>
                    </div>
                    <div className="contUser">
                        <input type="email" placeholder='Correo Electronico'/>
                    </div>
                    <div className="contBtn2">
                        <button type="submit">Enviar enlace de recuperacion</button>
                    </div>
                    <div className="contLink">
                        <i class="bi bi-arrow-left-circle"></i>
                        <p><span onClick={()=> setChange('log')}>Volver al inicio de sesion</span></p>
                    </div>
                    <hr id='hrL-Mq'/>
                    <div className="contInfo">
                        <div className="miniTitle">
                            <i class="bi bi-info-circle"></i>
                            <p>Información</p>
                        </div>
                        <p>Sí no recibes un correo electronico en unos minutos, revisa tu carpeta de spam o verifica que la direccion de correo electronico sea correcta.</p>
                    </div>
                </form>
            </div>
        )
    }else if(change === 'register'){
        return (
            <RegisterMq setChange={setChange} datosUsuario={datosUsuarioRef}/>
        )
    }else if(change === 'exito'){
        return(
            <SuccessLoginMq setChange={setChange} datosUsuario={datosUsuarioRef.current}/>
        )
    }else {
        return null
    }

}
