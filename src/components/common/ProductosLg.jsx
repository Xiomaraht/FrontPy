import { useState, useEffect } from "react";
import { obtenerProductos } from "@/api/productsApi";
import { useCart } from "@/context/CartContext";
import "@/components/styles/ProductosLg.css";

export default function ProductosLg() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        // El backend suele envolver en { data: [...] }
        setProductos(data?.data || data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (isLoading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <section className="seccion-productos">
      <h2 className="titulo-productos">Nuestros Productos</h2>
      <p className="promo-productos">Explora nuestra selección pensada para el bienestar de tu mascota. 🐾</p>

      <div className="contenedor-productos">
        {productos.map((producto) => (
          <div className="producto" key={producto.id}>
            <img src={producto.picture || "/placeholder-product.png"} alt={producto.name} />
            <h3>{producto.name}</h3>
            <p className="tipo">{producto.brand}</p>
            <p className="description">{producto.description}</p>
            {producto.veterinaryClinicName && (
              <p className="clinic-tag">🏥 {producto.veterinaryClinicName}</p>
            )}
            <div className="precio-fav">
              <span className="precio">${producto.price.toLocaleString()}</span>
              <div className="botones">
                <button 
                  className="icono" 
                  onClick={() => addToCart({
                    id: producto.id,
                    nombre: producto.name,
                    precioUnit: producto.price,
                    imagen: producto.picture,
                    cantidad: 1
                  })}
                >
                  <i className="ri-shopping-cart-line"></i>
                </button>
                <button className="icono"><i className="ri-heart-line"></i></button>
              </div>
            </div>
          </div>
        ))}
        {productos.length === 0 && <p>No hay productos disponibles en este momento.</p>}
      </div>
    </section>
  );
}

