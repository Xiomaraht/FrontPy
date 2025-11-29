import '../Styles/Direccion.css'

export default function Direccion() {
  return (
     <div className="direccion-container">
      <h2>💳 Confirmación y pago</h2>
      <div className="direccion-summary">
        <section className="direccion-info">
          <h3>Datos de envío</h3>
          <p><strong>Nombre:</strong> Juan Pérez</p>
          <p><strong>Dirección:</strong> Calle 123 #45-67</p>
          <p><strong>Teléfono:</strong> 3001234567</p>
          <p><strong>Correo:</strong> correo@ejemplo.com</p>
          <p><strong>Mensaje:</strong> Tocar el timbre</p>
        </section>

        <section className="direccion-pedido">
          <h3>Resumen del pedido</h3>
          <ul>
            <li><span>Productos:</span><span>4</span></li>
            <li><span>Subtotal:</span><span>$80.000</span></li>
            <li><span>Envío:</span><span>Gratis</span></li>
            <li><span>Total:</span><span>$80.000</span></li>
          </ul>
        </section>

        <button className="btn-finalizar">Finalizar compra</button>
      </div>
    </div>
  );
};