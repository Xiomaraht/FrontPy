import "../styles/GaleryLg.css"
import img from "../images/img.jpg"



export default function GaleryLg() {
  return (
    <section class="galeria-pets">
        <div class="contenedor-pets">
          <div class="img-pet grande">
            <img src={img} alt="Perros"/>
            <div class="texto">Para perros</div>
          </div>
      
          <div class="img-pet">
            <img src={img} alt="Perros"/>
            <div class="texto">Para perros</div>
          </div>
      
          <div class="img-pet">
            <img src={img} alt="Gatos"/>
            <div class="texto">Para gatos</div>
          </div>
      
          <div class="img-pet ancha">
            <img src={img} alt="Gatos"/>
            <div class="texto">Para gatos</div>
          </div>
        </div>
      </section>

  )
}

