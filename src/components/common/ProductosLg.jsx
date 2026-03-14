import "@/components/styles/ProductosLg.css"
import imgDogFood from "@/assets/images/product_dog_food.png"
import imgCatToy from "@/assets/images/product_cat_toy.png"

export default function ProductosLg() {
  return (
    <section className="seccion-productos">
  <h2 className="titulo-productos">Nuestros Productos Estrella</h2>
  <p className="promo-productos">Explora nuestra selección de productos de alta calidad pensados para el bienestar y felicidad de tu mascota. 🐾</p>

  <div className="contenedor-productos"> 
    <div className="producto">
      <img src={imgDogFood} alt="Comida Premium para Perro"/>
      <h3>NutriCan Premium</h3>
      <p className="tipo">Tipo: Alimento</p>
      <div className="precio-fav">
        <span className="precio">$85.000</span>
        <div className="botones">
          <button className="icono"><i className="ri-shopping-cart-line"></i></button>
          <button className="icono"><i className="ri-heart-line"></i></button>
        </div>
      </div>
    </div>

    <div className="producto">
      <img src={imgCatToy} alt="Juguete para Gato"/>
      <h3>Varita Mágica Felina</h3>
      <p className="tipo">Tipo: Juguete</p>
      <div className="precio-fav">
        <span className="precio">$25.000</span>
        <div className="botones">
          <button className="icono"><i className="ri-shopping-cart-line"></i></button>
          <button className="icono"><i className="ri-heart-line"></i></button>
        </div>
      </div>
    </div>

    <div className="producto">
      <img src={imgDogFood} alt="Snacks para Perro"/>
      <h3>Hueso de Carnaza</h3>
      <p className="tipo">Tipo: Snack</p>
      <div className="precio-fav">
        <span className="precio">$15.000</span>
        <div className="botones">
          <button className="icono"><i className="ri-shopping-cart-line"></i></button>
          <button className="icono"><i className="ri-heart-line"></i></button>
        </div>
      </div>
    </div>

    <div className="producto">
      <img src={imgCatToy} alt="Rascador para Gato"/>
      <h3>Rueda Interactiva</h3>
      <p className="tipo">Tipo: Juguete</p>
      <div className="precio-fav">
        <span className="precio">$40.000</span>
        <div className="botones">
          <button className="icono"><i className="ri-shopping-cart-line"></i></button>
          <button className="icono"><i className="ri-heart-line"></i></button>
        </div>
      </div>
    </div>
  </div> 
</section>
  )
}

