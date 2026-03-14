import '@/components/styles/VeterinariasMq.css'
import BannerLw from '@/components/common/BannerLw'
import HeaderLg from '@/components/common/HeaderLg'
import FooterLg from '@/components/common/FooterLg'
import CardsByMq from '@/components/common/CardsByMq'
import VeterinariasDataMq from '@/components/Data/VeterinariasDataMq.json'

export default function VeterinariasMq() {
    return (
        <>
            <HeaderLg/>
            <BannerLw titulo={'Veterinarias'}/>
            <div className="containerContentVet-Mq">
                <div className="searchVet-Mq">
                    <span>Busqueda</span>
                    <div className="inputSearchVet-Mq">
                        <input type="text" placeholder='Busca locacion, por nombre o servicio' />
                        <i className="bi bi-search"></i>
                    </div>
                </div>
                <div className="containerCardsVet-Mq">
                    {VeterinariasDataMq.map((item, index)=>{
                        return(
                            <CardsByMq key={index} title={item.title} description={item.description} image={item.image} style={'veterinaria'}/>
                        )
                    })}
                </div>
            </div>
            <FooterLg/>
        </>
    )
}
