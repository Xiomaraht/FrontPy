import React, { useState } from 'react';
import { cambiarContrasena } from '@/api/ChangePasswordApi';
import '@/components/styles/ChangePassword_Xh.css';

export default function ChangePassword_Xh({ volver }) {
  const [passwords, setPasswords] = useState({
    actual: '',
    nueva: '',
    confirmacion: ''
  });
  const [mensaje, setMensaje] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ text: '', type: '' });

    if (passwords.nueva !== passwords.confirmacion) {
      setMensaje({ text: 'Las contraseñas nuevas no coinciden', type: 'error' });
      return;
    }

    try {
      await cambiarContrasena({ actual: passwords.actual, nueva: passwords.nueva });
      setMensaje({ text: 'Contraseña actualizada exitosamente', type: 'success' });
      setTimeout(() => volver(), 2000); // Volver automáticamente después de 2 segundos
    } catch (error) {
      setMensaje({ text: error.message || 'Error al cambiar contraseña', type: 'error' });
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-header">
        <button className="btn-volver" onClick={volver}>
          ← Volver
        </button>
        <h2>Cambiar Contraseña</h2>
      </div>

      <form className="change-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Contraseña Actual</label>
          <input
            type="password"
            value={passwords.actual}
            onChange={(e) => setPasswords({...passwords, actual: e.target.value})}
            required
            placeholder="Introduce tu contraseña actual"
          />
        </div>

        <div className="form-group">
          <label>Nueva Contraseña</label>
          <input
            type="password"
            value={passwords.nueva}
            onChange={(e) => setPasswords({...passwords, nueva: e.target.value})}
            required
            placeholder="Introduce tu nueva contraseña"
          />
        </div>

        <div className="form-group">
          <label>Confirmar Nueva Contraseña</label>
          <input
            type="password"
            value={passwords.confirmacion}
            onChange={(e) => setPasswords({...passwords, confirmacion: e.target.value})}
            required
            placeholder="Confirma tu nueva contraseña"
          />
        </div>

        {mensaje.text && (
          <div className={`mensaje ${mensaje.type}`}>
            {mensaje.text}
          </div>
        )}

        <button type="submit" className="btn-guardar-password">
          Actualizar Contraseña
        </button>
      </form>
    </div>
  );
}
