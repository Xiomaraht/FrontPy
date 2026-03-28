import { useState, useEffect } from "react";
import FormPaymentMethod from "./FormPaymentMethod_Xh";
import {
  obtenerMetodosPago,
  crearMetodoPago,
  eliminarMetodoPago,
} from "@/api/PaymentMethodApi";
import "@/components/styles/PaymentMethod_Xh.css";

// Subcomponente para la Tarjeta Premium
const PremiumCard = ({ card, onRemove }) => {
  const getBrandClass = (brand) => {
    const b = brand.toLowerCase();
    if (b.includes("visa")) return "tarjeta-visa-xh";
    if (b.includes("master")) return "tarjeta-master-xh";
    if (b.includes("amex") || b.includes("american")) return "tarjeta-amex-xh";
    return "tarjeta-default-xh";
  };

  return (
    <div className={`tarjeta-premium-xh ${getBrandClass(card.marca)}`}>
      <div className="card-overlay-xh" />
      <div className="chip-xh" />
      <div className="numero-xh">
        **** **** **** {card.numero?.slice(-4) || "0000"}
      </div>
      <div className="meta-xh">
        <div className="nombre-xh">
          {card.nombre} {card.apellido}
        </div>
        <div className="marca-xh">{card.marca}</div>
      </div>
      <button 
        className="btn-eliminar-xh" 
        onClick={() => onRemove(card.id)}
        title="Eliminar tarjeta"
      >
        ✕
      </button>
    </div>
  );
};

export default function PaymentMethod_Xh() {
  const [metodos, setMetodos] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMetodos = async () => {
    setLoading(true);
    try {
      const lista = await obtenerMetodosPago();
      setMetodos(lista);
    } catch (error) {
      console.error("Error al cargar métodos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetodos();
  }, []);

  const handleCrear = async (nuevo) => {
    try {
      await crearMetodoPago(nuevo);
      await fetchMetodos();
      setMostrarForm(false);
    } catch (error) {
      alert("Error al guardar tarjeta: " + error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este método de pago?")) return;
    try {
      await eliminarMetodoPago(id);
      setMetodos(metodos.filter((m) => m.id !== id));
    } catch (error) {
      alert("Error al eliminar: " + error);
    }
  };

  return (
    <div className="metodos-container">
      <div className="metodos-header">
        <h2>Mis Métodos de Pago</h2>
        <button className="btn-añadir-xh" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "Cancelar" : "+ Agregar Tarjeta"}
        </button>
      </div>

      {mostrarForm && <FormPaymentMethod onSave={handleCrear} />}

      {loading ? (
        <div className="empty-state-xh"><p>Cargando tus tarjetas...</p></div>
      ) : metodos.length > 0 ? (
        <div className="tarjetas-guardadas-xh">
          {metodos.map((m) => (
            <PremiumCard key={m.id} card={m} onRemove={handleEliminar} />
          ))}
        </div>
      ) : (
        <div className="empty-state-xh">
          <p>No tienes métodos de pago registrados todavía.</p>
        </div>
      )}
    </div>
  );
}