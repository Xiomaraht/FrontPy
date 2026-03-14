import { useState } from 'react'
import '@/components/styles/UsersRegisterTL.css'

export default function UsersRegisterTL({titleForm ,casillas, registrar, exito, infoExito, infoExito2,correoActivacion, enviar}) {
  const [changePageTl, setChangePageTl] = useState('formulario')  
    if(changePageTl === 'formulario'){
        return(
            <>
                <div className='containerExitoUr-Tl'>
                    <h1  className='containerTitle'>{titleForm}</h1>
                    <div>
                            {casillas.map((item, index)=>{
                            return(
                            <div key={index} className='containerInputUr-Tl'>
                                <span>{item}</span>
                                <input type="text" placeholder='Value'/>
                            </div>
                            )})
                            }
                    </div>
                    <button type='submit' className='botonUr-Tl' onClick={() => {setChangePageTl("perfilCreado")}}>{registrar}</button>
                </div>
            </>
        )     
    }else{
        return(
            <>
                <div className='containerUr-Tl'>
                    <div>
                        <h2 className='containerTitle'>{exito}</h2>
                        <div>
                            <h5>{infoExito}</h5>
                            <h5>{infoExito2}</h5>
                        </div>
                        <div className='containerInputUr-Tl'>
                            <h4>{correoActivacion}</h4>
                            <input type="text" placeholder='ejemplo@gmail.com'/>
                        </div>
                                <button className='botonUr-Tl'>{enviar}</button>
                    </div>
                </div>
            </>
        )
    }
}