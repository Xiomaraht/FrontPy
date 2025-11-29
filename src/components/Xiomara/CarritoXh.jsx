import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Carrito.css';

export default function Carrito() {
  const [cupon, setCupon] = useState('');
  const navigate = useNavigate();

  return (
    <div className="carrito_1">
      <h2>🛒 Carrito de compras</h2>
      <div className="carrito_2">
        <div className="carrito_3">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td className="prod_1">
                    <div className="prod_2" />
                    <div className="prod_3">
                      <span>Nombre Producto</span>
                      <span className="prod_4">Peso producto</span>
                    </div>
                  </td>
                  <td>1</td>
                  <td>$20.000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sum_1">
          <h3>🧾 Resumen de Compra</h3>
          <ul>
            <li><span>Productos:</span><span>4</span></li>
            <li><span>Subtotal:</span><span>$80.000</span></li>
            <li><span>Descuento:</span><span>$0</span></li>
            <li><span>Envío:</span><span className="free">Gratis</span></li>
            <li><span>Cupón aplicado:</span><span>$0</span></li>
          </ul>

          <div className="cupon_1">
            <label htmlFor="cupon">🎟️ ¿Tienes un cupón?</label>
            <input
              type="text"
              id="cupon"
              placeholder="Ingresa tu código"
              value={cupon}
              onChange={(e) => setCupon(e.target.value)}
            />
            <button className="apply-cupon">Aplicar</button>
          </div>

          <div className="total">
            <strong>Total: $80.000</strong>
          </div>
          
          <button onClick={() => navigate('/entrega')}>
            Continuar Compra
          </button>
        </div>
      </div>
    </div>
  );
}