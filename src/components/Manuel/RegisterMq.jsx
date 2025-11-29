import { useState } from 'react'
import '../styles/RegisterMq.css'
import RegisterUserMq from './RegisterUserMq'
import RegisterCustomerMq from './RegisterCustomerMq'

export default function RegisterMq({setChange, datosUsuario}) {
    const [register, setRegister] = useState('user')
    if(register === 'user'){
        return(
            <RegisterUserMq setChange={setRegister} datosUsuario={datosUsuario}/>
        )
    }else if(register === 'registerCustomer'){
        return(
            <RegisterCustomerMq setChange={setChange} datosUsuario={datosUsuario}/>
        )
    }
}
