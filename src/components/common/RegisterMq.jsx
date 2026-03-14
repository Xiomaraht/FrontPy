import { useState } from 'react'
import '@/components/styles/RegisterMq.css'
import RegisterUserMq from '@/components/common/RegisterUserMq'
import RegisterCustomerMq from '@/components/common/RegisterCustomerMq'
import RegisterVeterinariaMq from '@/components/common/RegisterVeterinariaMq'

export default function RegisterMq({setChange, datosUsuario, defaultRole}) {
    const [register, setRegister] = useState('user')
    if(register === 'user'){
        return(
            <RegisterUserMq setChange={setRegister} datosUsuario={datosUsuario} defaultRole={defaultRole}/>
        )
    }else if(register === 'registerCustomer'){
        return(
            <RegisterCustomerMq setChange={setChange} datosUsuario={datosUsuario}/>
        )
    }else if(register === 'registerVeterinary'){
        return(
            <RegisterVeterinariaMq setChange={setChange} datosUsuario={datosUsuario}/>
        )
    }
}
