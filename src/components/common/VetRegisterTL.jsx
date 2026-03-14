import { useState } from 'react'
import '@/components/styles/VetRegisterTL.css'

export default function VetRegisterTL() {
    const [changePageTl, setChangePageTl] = useState('registro');
    if(changePageTl === 'registro'){
        return (
        <div className='containerVr-Tl'>
        <h1>Registrar Consulta</h1>
            <div className='containerInputVr-Tl'>
                <button type='submit' className='botonVr-Tl' onClick={() => {setChangePageTl("dD")}}>Datos del Dueño</button>
            </div>
            <div className='containerInputVr-Tl'>
                <button type='submit' className='botonVr-Tl' onClick={() => {setChangePageTl("dM")}}>Datos de la Mascota</button>
            </div>
            <div className='containerInputVr-Tl'>
                <button type='submit' className='botonVr-Tl' onClick={() => {setChangePageTl("mC")}}>Motivo de la Consulta</button>
            </div>
            <div className='containerInputVr-Tl'>
                <button type='submit' className='botonVr-Tl' onClick={() => {setChangePageTl("aM")}}>Antecedentes Medicos</button>
            </div>
        </div>
        )
    }else if (changePageTl === 'dD'){
        return (
                <div className='containerUr-Tl'>
        <h1>Datos del Dueño</h1>
            <div className='containerInputUr-Tl'>
                <span>Nombre Completo</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Tipo de Documento</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Direccion</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Telefono de Contacto</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Correo electronico</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Relacion con la Mascota</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <button type="submit" className='botonUr-Tl' onClick={() => {setChangePageTl('dM')}}>siguiente</button>
            </div>
        </div>
        )
    }else if (changePageTl === 'dM'){
        return (
                <div className='containerUr-Tl'>
        <h1>Datos de la Macota</h1>
            <div className='containerInputUr-Tl'>
                <span>Nombre de la Mascota</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Raza *opcional*</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Sexo</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Peso</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Microchip o Número de Identificación</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Vacunas Recientes</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Especie</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Fecha de Nacimiento</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Castrado/Estarilizado/No aplica</span> /*usar un desplegable*/
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Color</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Alergias Conocidas</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Historial Medico</span>
                <input type="text" placeholder='Value'/> /* aqui debe ser para adjuntar un archivo */
            </div>
            <div className='containerInputUr-Tl'>
                <button type="submit" className='botonUr-Tl' onClick={() => {setChangePageTl('dD')}}>anterior</button>
                <button type="submit" className='botonUr-Tl' onClick={() => {setChangePageTl('mC')}}>siguiente</button>
            </div>
        </div>
        )
    }else if (changePageTl === 'mC'){
        return (
                <div className='containerUr-Tl'>
        <h1>Motivo de la Consulta</h1>
            <div className='containerInputUr-Tl'>
                <span>Descripción de los síntomas o problemas que presenta la mascota</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Tratamientos previos que la mascota haya recibido</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Evento reciente que pueda haber provocado los síntomas</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <span>Duración de los síntomas o problemas</span>
                <input type="text" placeholder='Value'/>
            </div>
            <div className='containerInputUr-Tl'>
                <button type="submit" className='botonUr-Tl' onClick={() => {setChangePageTl('dM')}}>anterior</button>
                <button type="submit" className='botonUr-Tl' onClick={() => {setChangePageTl('aM')}}>siguiente</button>
            </div>
        </div>
        )
        }else if (changePageTl === 'aM'){
            return (
                <div className='containerUr-Tl'>
                <h1>Antecedentes medicos</h1>
                    <div className='containerInputUr-Tl'>
                        <span>Historia de enfermedades previas que haya tenido la mascota</span>
                        <input type="text" placeholder='Value'/>
                    </div>
                    <div className='containerInputUr-Tl'>
                        <span>Medicamentos que la mascota está tomando actualmente</span>
                        <input type="text" placeholder='Value'/>
                    </div>
                    <div className='containerInputUr-Tl'>
                        <span>Datos de la última consulta veterinaria</span>
                        <input type="text" placeholder='Value'/>
                    </div>
                    <div className='containerInputUr-Tl'>
                        <button type="submit" className='botonUr-Tl' onClick={() => {setChangePageTl('mC')}}>anterior</button>
                        <button type="submit" className='botonUr-Tl' onClick={() => {setChangePageTl('registrado')}}>Confirmar</button>
                    </div>
                </div>
        )
        }else if (changePageTl === 'registrado'){
            return(
                <div className='containerUr-Tl'>
                    <div className='containerE1-Tl'>
                        <h1>¡Consulta Guardada Exitosamente!</h1>
                        <h4>ID cita</h4>
                        <h4>1001.199.287</h4>
                    </div>
                    <button type="submit" className='botonUr-Tl' onClick={() => {setChangePageTl('registro')}}>Confirmar</button>
                </div>
        )
        }
}