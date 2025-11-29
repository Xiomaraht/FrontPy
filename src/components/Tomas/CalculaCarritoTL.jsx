import { useState } from "react";
import "../styles/CarritoComprasTL.css";
import HeaderLg from "../Laura/HeaderLg";
import FooterLg from "../Laura/FooterLg";
import Titulo from "./Titulo"; // New component
import ListaProductos from "./ListaProductos"; // New component
import ResumenCompra from "./ResumenCompra"; // New component
import VaciarCarrito from "./VaciarCarrito"; // New component

export default function CarritoComprasTL() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Nombre Producto", peso: "Peso producto", precioUnit: 20000, cantidad: 1 },
    { id: 2, nombre: "Nombre Producto", peso: "Peso producto", precioUnit: 15000, cantidad: 1 },
    { id: 3, nombre: "Nombre Producto", peso: "Peso producto", precioUnit: 41000, cantidad: 1 },
  ]);

  // Función para aumentar cantidad
  const aumentar = (id) => {
    setProductos(productos.map(p =>
      p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
    ));
  };

  // Función para disminuir cantidad
  const disminuir = (id) => {
    setProductos(productos.map(p =>
      p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p
    ));
  };

  // Función para vaciar el carrito
  const vaciar = () => {
    setProductos([]);
  };

  // Subtotal calculation (can stay here or move to a custom hook if it gets complex)
  const subtotal = productos.reduce((acc, p) => acc + p.precioUnit * p.cantidad, 0);

  return (
    <>
      <HeaderLg />
      <div className="body">
        <Titulo /> {/* Separated Title */}

        <div className="contenedor">
          <ListaProductos 
            productos={productos} 
            aumentar={aumentar} 
            disminuir={disminuir} 
          /> {/* Separated Product List */}

          <ResumenCompra 
            productos={productos} 
            subtotal={subtotal} 
          /> {/* Separated Purchase Summary */}
        </div>
        
        <VaciarCarrito vaciar={vaciar} /> {/* Separated Empty Cart Button */}
      </div>
      <FooterLg />
    </>
  );
}