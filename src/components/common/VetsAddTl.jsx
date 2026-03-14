import { useState } from 'react'
import '@/components/styles/VetsAdd.css'

export default function VetsAddTl({titleAdd ,casillasAdd, registrarAdd, exitoAdd, infoExitoAdd, infoExito2Add, agregarAdministradorAdd, correoActivacionAdd, enviarAdd}) {
  const [changePageTl, setChangePageTl] = useState('RegistrarAdd');
    if(changePageTl === 'RegistrarAdd'){
        return (
            <>
                <div className='containerAdd-Tl'>
                    <h1  className='containerTitleAdd-Tl'>{titleAdd}</h1>
                    <div>
                            {casillasAdd.map((item, index)=>{
                            return(
                            <div key={index} className='containerInputAdd-Tl'>
                                <span>{item}</span>
                                <input type="text" placeholder='Value'/>
                            </div>
                            )})
                            }
                    </div>
                    <button type='submit' className='botonAdd-Tl' onClick={() => {setChangePageTl("veterinariaCreada")}}>{registrarAdd}</button>
                </div>
            </>
        )
    }else{
        return (
            <>
                <div className='containerAdd-Tl'>
                    <h2 className='containerTitleAdd'>{exitoAdd}</h2>
                        <div className='containerGeneralAdd-Tl'>
                            <h5>{infoExitoAdd}</h5>
                            <h5>{infoExito2Add}</h5>
                            <button className='botonPequeñoAdd-Tl'>{agregarAdministradorAdd}</button>
                        </div>
                        <div className='containerInputAdd-Tl'>
                            <h4>{correoActivacionAdd}</h4>
                            <input type="text" placeholder='ejemplo@gmail.com'/>
                        </div>
                            <button className='botonAdd-Tl'>{enviarAdd}</button>
                </div>
            </>
        )
    }
}

               <VetsAddTl
                    /*vista regitro usuario */
                    titleAdd={'Nueva Veterinaria'}
                    casillasAdd={['Nombre Veterinaria', 'NIT', 'Barrio', 'Teléfono', 'Dirección', 'Correo']}
                    registrarAdd={["registrar"]}
                    confirmarAdd={["exito"]}

                    /*vista regitro usuario */
                    exitoAdd={["¡Veterinaria Agregada Exitosamente!"]}
                    infoExitoAdd={["Sonrisas y bigotes"]}
                    infoExito2Add={["Nit 86243562-7"]}
                    agregarAdministradorAdd={["Agregar Administrador"]}
                    correoActivacionAdd={["Enviar Correo de Bienvenida"]}
                    enviarAdd={["Enviar"]}
                />