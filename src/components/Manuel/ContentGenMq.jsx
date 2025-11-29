import '../styles/ContentGenMq.css'
import imageDos from '../images/imageDos.jpg'
import imageUno from '../images/imageUno.jpg'
import { Link } from 'react-router-dom'


export default function ContentGenMq({title, description, buttons=[], optionalStyle, miniTitle=undefined}) {
    if(optionalStyle === 'whitestyle') {
        return(
            <section className="textTwo">
                <div className="containerContLp-Mq">
                    <div className="conText">
                        <h6>{miniTitle}</h6>
                        <h1>{title}</h1>
                        <p>{description}</p>
                        {buttons.map((item, index) => {
                        return(
                            <Link key={index} to={item.hrf} className='botonCg-Mq'>{item.texto}</Link>
                        )
                        })}
                    </div>
                    <div className="conTextTwo">
                        <img src={imageDos} alt="Descricion"  />
                    </div>
                </div>
        </section>
        )} else {
            return(
                <section className="textOne">
                <div className="containerContLp-Mq">
                    <div className="conText">
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <div className="containerButtonCg-Mq">
                            {buttons.map((item, index) => {
                                return(
                                    <Link key={index} to={item.hrf} className='botonCg-Mq'>{item.texto}</Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="conTextTwo">
                        <img src={imageDos} alt="DescricionDos" />
                    </div>
                </div>
                </section>
            )
        }
}

