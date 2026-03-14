import "@/components/styles/GaleryLg.css"
import img from "@/components/images/img.jpg"



export default function GaleryLg() {
  return (
    <section className="galeria-pets">
        <div className="contenedor-pets">
          <div className="img-pet grande">
            <img src={img} alt="Perros"/>
            <div className="texto">Para perros</div>
          </div>
      
          <div className="img-pet">
            <img src={img} alt="Perros"/>
            <div className="texto">Para perros</div>
          </div>
      
          <div className="img-pet">
            <img src={img} alt="Gatos"/>
            <div className="texto">Para gatos</div>
          </div>
      
          <div className="img-pet ancha">
            <img src={img} alt="Gatos"/>
            <div className="texto">Para gatos</div>
          </div>
        </div>
      </section>

  )
}

