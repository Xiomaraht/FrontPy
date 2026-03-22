import { useState } from 'react';
import { createAppointmentApi } from '@/api/appointmentsApi';
import "@/components/styles/ModalMq.css"; // Reuse existing modal styles

export default function AppointmentModal({ service, clinic, onClose }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (!userInfo.id) {
          setMessage('Error: Debes iniciar sesión.');
          setIsLoading(false);
          return;
      }

      let realCustomerId = userInfo.customerId;

      if (!realCustomerId) {
          try {
              const response = await fetch(`http://localhost:8080/api/customers/user/${userInfo.id}`);
              if (response.ok) {
                  const customerData = await response.json();
                  realCustomerId = customerData.id;
              } else {
                  setMessage('Error: No se encontró perfil de cliente. ¿Completaste tu registro?');
                  setIsLoading(false);
                  return;
              }
          } catch (err) {
              setMessage('Error de conexión al verificar el cliente.');
              setIsLoading(false);
              return;
          }
      }

      const appointmentData = {
        appointmentDate: date,
        appointmentTime: time + ":00", 
        reason: reason,
        customer: { id: realCustomerId },
        veterinaryClinic: { id: clinic.id },
        service: { id: service.id },
        status: 'PENDING'
      };

      await createAppointmentApi(appointmentData);
      setMessage('✅ Cita agendada con éxito.');
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      setMessage('❌ Error al agendar la cita.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agendar Cita</h2>
        <p>Servicio: {service.name}</p>
        <p>Clínica: {clinic.name}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Fecha:</label>
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          </div>
          
          <div className="form-group">
            <label>Hora:</label>
            <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Motivo (opcional):</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Motivo de la consulta..."></textarea>
          </div>

          <div className="modal-actions">
            <button type="submit" disabled={isLoading}>{isLoading ? 'Agendando...' : 'Confirmar Cita'}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
        {message && <p className="status-msg">{message}</p>}
      </div>
    </div>
  );
}
