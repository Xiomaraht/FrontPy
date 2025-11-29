import '../styles/CardsByMq.css'
export default function CardsByMq({title, description, image, style, raza, edad, gen}) {
    if(style === 'veterinaria'){
        return (
            <div className="contentCardCd-Mq">
                <img src={image} alt={description} />
                <strong>{title}</strong>
            </div>
        )
    }else if(style === 'history'){
        return(
            <div className="contentCardHistoryCd-Mq">
                <div className="containerImageMascotaCd-Mq">
                    <img src={image} alt={description}/>
                </div>
                <article className="containerStrongsCd-Mq">
                    <h2>{raza}</h2>
                    <h5>{edad}</h5>
                    <h5>{gen}</h5>
                </article>
            </div>
        )
    }else{
        return null
    }

}
