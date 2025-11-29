import React, { useState } from "react";
import { cambiarContrasena } from "../../../api/ChangePasswordApi"; 


export default function ChangePassword_Xh({ volver }) {
  const [formData, setFormData] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });

  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nueva !== formData.confirmar) {
      alert("La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    try {
      setCargando(true);
      await cambiarContrasena(formData);
      alert("Contraseña actualizada correctamente");
      volver();
    } catch (error) {
      alert("Error al cambiar la contraseña: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="cambiar-contra">
      <h3>Cambiar Contraseña</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="actual"
          placeholder="Contraseña Actual"
          value={formData.actual}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="nueva"
          placeholder="Nueva Contraseña"
          value={formData.nueva}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmar"
          placeholder="Confirmar Nueva Contraseña"
          value={formData.confirmar}
          onChange={handleChange}
          required
        />
        <p className="nota-seguridad">
          Para mayor seguridad, usa una contraseña única con símbolos y números
          (# , . -).
        </p>
        <div className="acciones">
          <button
            type="button"
            className="btn-cancelar"
            onClick={volver}
            disabled={cargando}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-guardar" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
