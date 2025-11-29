import '../styles/SuccessLoginMq.css'

export default function SuccessLoginMq({ setChange, datosUsuario}) {
    const userData = datosUsuario; 
    return (
        <div className="contenFormSl-Mq">
            <header className="topFormSl-Mq">
                <i class="bi bi-check-circle"></i>
                <h1>Cuenta creada con exito</h1>
                <p>Gracias por registrarte en nuestra plataforma. Tu cuenta ha sido creada correctamente.</p>
            </header>
            <hr className='hrL-Mq'/>
            <main>
                <div className="contentInfoSl-Mq">
                    <strong>Nombre de usuario</strong>
                    <p>{userData.names}</p>
                </div>
                <div className="contentInfoSl-Mq">
                    <strong>Username</strong>
                    <p>{userData.login}</p>
                </div>
                <p className='parrafoSl-Mq'>Hemos enviado un correo de verificacion a tu direccion de email. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para verificar tu cuenta.</p>
            </main>
            <footer className="endFormSl-Mq">
                <button onClick={()=> {setChange('log')}}>Ir a inicio de sesion</button>
            </footer>
        </div>
    )
}
