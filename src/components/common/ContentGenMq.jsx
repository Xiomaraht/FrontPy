import '@/components/styles/ContentGenMq.css'
import imageDos from '@/components/images/imageDos.jpg'
import imageUno from '@/components/images/imageUno.jpg'
import { Link } from 'react-router-dom'


export default function ContentGenMq({title, description, buttons=[], optionalStyle, miniTitle=undefined, imageSrc=imageDos}) {
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
                        <img src={imageSrc} alt="Descricion"  />
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
                        <img src={imageSrc} alt="DescricionDos" />
                    </div>
                </div>
                </section>
            )
        }
}

