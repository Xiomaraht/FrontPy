import "../styles/ProductosLg.css"
import img from "../images/img.jpg"


export default function ProductosLg() {
  return (
    <section class="seccion-productos">
  <h2 class="titulo-productos">Nuestros Productos Estrella</h2>
  <p class="promo-productos">Explora nuestra selección de productos de alta calidad pensados para el bienestar y felicidad de tu mascota. 🐾</p>

  <div class="contenedor-productos"> 
    <div class="producto">
      <img src={img} alt="Producto 1"/>
      <h3>Nombre del Producto</h3>
      <p class="tipo">Tipo: Juguete</p>
      <div class="precio-fav">
        <span class="precio">$20.000</span>
        <div class="botones">
          <button class="icono"><i class="ri-shopping-cart-line"></i></button>
          <button class="icono"><i class="ri-heart-line"></i></button>
        </div>
      </div>
    </div>

    <div class="producto">
      <img src={img} alt="Producto 2"/>
      <h3>Nombre del Producto</h3>
      <p class="tipo">Tipo: Juguete</p>
      <div class="precio-fav">
        <span class="precio">$20.000</span>
        <div class="botones">
          <button class="icono"><i class="ri-shopping-cart-line"></i></button>
          <button class="icono"><i class="ri-heart-line"></i></button>
        </div>
      </div>
    </div>

    <div class="producto">
      <img src={img} alt="Producto 3"/>
      <h3>Nombre del Producto</h3>
      <p class="tipo">Tipo: Juguete</p>
      <div class="precio-fav">
        <span class="precio">$20.000</span>
        <div class="botones">
          <button class="icono"><i class="ri-shopping-cart-line"></i></button>
          <button class="icono"><i class="ri-heart-line"></i></button>
        </div>
      </div>
    </div>

    <div class="producto">
      <img src={img} alt="Producto 3"/>
      <h3>Nombre del Producto</h3>
      <p class="tipo">Tipo: Juguete</p>
      <div class="precio-fav">
        <span class="precio">$20.000</span>
        <div class="botones">
          <button class="icono"><i class="ri-shopping-cart-line"></i></button>
          <button class="icono"><i class="ri-heart-line"></i></button>
        </div>
      </div>
    </div>
  </div> 
</section>
  )
}

