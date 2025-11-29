import { useState, useEffect } from "react";
import FormPaymentMethod from "../Xiomara/Metododepago/FormPaymentMethod_Xh";
import {
  obtenerMetodosPago,
  eliminarMetodoPago,
} from "../../api/PaymentMethodApi";
import "../styles/PaymentMethod_Xh.css";

export default function PaymentMethod_Xh() {
    const [metodos, setMetodos] = useState([
    {
      id: "default-1",
      nombre: "Manuel",
      apellido: "Quiazua",
      numero: "1234567812345678",
      marca: "Viss",
      predeterminado: true,
    },
    {
      id: "default-2",
      nombre: "Manuel",
      apellido: "Quiazua",
      numero: "8765432187654321",
      marca: "Master",
      predeterminado: true,
    },
  ]);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => {
    (async () => {
      const lista = await obtenerMetodosPago();
      setMetodos((prev) => {
        // mantenemos los predeterminados y agregamos los de la API
        const predeterminados = prev.filter((m) => m.predeterminado);
        return [...predeterminados, ...lista];
      });
    })();
  }, []);

  const handleCrear = async (nuevo) => {
    const creado = await actualizarMetodoPago(nuevo);
    setMetodos((prev) => [...prev, creado]);
    setMostrarForm(false);
  };

  const handleEliminar = async (id) => {
    // no permitir eliminar predeterminados
    const metodo = metodos.find((m) => m.id === id);
    if (metodo?.predeterminado) return;

    await eliminarMetodoPago(id);
    setMetodos(metodos.filter((m) => m.id !== id));
  };

  return (
    <div className="metodos-container">
      <div className="metodos-header">
        <h2>Métodos de Pago</h2>
        <button onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "Cancelar" : "Agregar"}
        </button>
      </div>

      {mostrarForm && <FormPaymentMethod onSave={handleCrear} />}

      <div className="tarjetas-guardadas">
        {metodos.map((m) => (
          <div key={m.id} className="tarjeta">
            <div className="chip" />
            <div className="numero">**** **** **** {m.numero.slice(-4)}</div>
            <div className="nombre">
              {m.nombre} {m.apellido}
            </div>
            <div className="marca">{m.marca}</div>
            {!m.predeterminado && (
              <button
                className="btn-eliminar"
                onClick={() => handleEliminar(m.id)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}