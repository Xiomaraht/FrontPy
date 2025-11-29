import '../components/styles/VeterinariasMq.css'
import BannerLw from '../components/Lina/BannerLw'
import HeaderLg from '../components/Laura/HeaderLg'
import FooterLg from '../components/Laura/FooterLg'
import CardsByMq from '../components/Manuel/CardsByMq'
import VeterinariasDataMq from '../components/Data/VeterinariasDataMq.json'

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
                        <i class="bi bi-search"></i>
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
