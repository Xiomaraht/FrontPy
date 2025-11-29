import React, { useState, useEffect } from 'react'; // Importamos useEffect para prellenar el campo
import '../styles/ProfileCreatedLg.css';

const ProfileCreatedLg = ({ vet, onRegresar }) => {
  // Inicializamos el estado del email con el email de la veterinaria si está disponible
  const [welcomeEmail, setWelcomeEmail] = useState(vet.email || '');
  const [isSending, setIsSending] = useState(false); // Nuevo estado para controlar el envío

  // Usar useEffect para asegurarnos de que el email se actualice si `vet.email` cambia
  // Esto es útil si el componente se re-renderiza con un `vet` diferente.
  useEffect(() => {
    if (vet && vet.email) {
      setWelcomeEmail(vet.email);
    }
  }, [vet]);

  const handleEmailChange = (e) => {
    setWelcomeEmail(e.target.value);
  };

  const handleSendWelcomeEmail = () => {
    if (!welcomeEmail) {
      alert('Por favor, ingresa una dirección de correo.');
      return;
    }

    setIsSending(true); // Indicar que el envío está en curso

    // Simular el contenido del correo de bienvenida
    const subject = `¡Bienvenido a nuestro servicio, ${vet.name}!`;
    const body = `Estimado(a) ${vet.name},\n\n` +
                 `¡Bienvenido(a) a nuestra plataforma! Nos complace tenerte a bordo.\n\n` +
                 `Tu veterinaria, ${vet.name} (NIT: ${vet.nit}), ha sido registrada exitosamente.\n\n` +
                 `Estamos listos para ayudarte a gestionar tus servicios. Si tienes alguna pregunta, no dudes en contactarnos.\n\n` +
                 `Saludos cordiales,\nEl equipo de [Tu Empresa]`;

    // Simular el envío del correo electrónico.
    // En una aplicación real, aquí integrarías un servicio de envío de correos (ej. EmailJS, SendGrid, tu propio backend).
    // Por ahora, usamos window.open para simular un "mailto:" y un retardo.

    const mailtoLink = `mailto:${welcomeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Abrir el cliente de correo predeterminado
    window.open(mailtoLink, '_blank');

    // Simular un tiempo de "envío" y luego mostrar la alerta
    setTimeout(() => {
      alert(`Correo de bienvenida enviado a: ${welcomeEmail} para ${vet.name} (Simulación vía mailto y retardo)`);
      setIsSending(false); // Restablecer el estado de envío
    }, 1500); // Simula 1.5 segundos de envío
  };

  const handleAddAdmin = () => {
    alert(`Redirigiendo para agregar administrador a ${vet.name} (funcionalidad no implementada)`);
  };

  if (!vet) {
    return null;
  }

  return (
    <div className="profile-created-container">
      <h2>¡Perfil Creado Exitosamente!</h2>

      <h3 className="vet-name-display">{vet.name}</h3>
      <p className="vet-nit-display">NIT {vet.nit}</p>

      <button className="add-admin-btn" onClick={handleAddAdmin}>
        <span className="material-symbols-outlined">person_add</span>Agregar Administrador
      </button>

      <div className="send-email-section">
        <p>Enviar Correo de Bienvenida</p> {/* <--- Texto cambiado */}
        <div className="email-input-group">
          <input
            type="email"
            placeholder="Correo del Administrador" // <--- Placeholder cambiado
            value={welcomeEmail} // Valor prellenado con el email de la veterinaria
            onChange={handleEmailChange}
            className="activation-email-input"
          />
          <button
            className="send-email-btn"
            onClick={handleSendWelcomeEmail}
            disabled={isSending} // Deshabilitar el botón mientras se envía
          >
            {isSending ? 'Enviando...' : 'Enviar'} {/* Texto dinámico del botón */}
          </button>
        </div>
      </div>

      <div className="regresar-btn-container" onClick={onRegresar}>
        <span className="material-symbols-outlined">arrow_back</span> Regresar
      </div>
    </div>
  );
};

export default ProfileCreatedLg;