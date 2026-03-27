import api from '@/api/axios';
import { createAppointmentApi } from '@/api/appointmentsApi';
import { getPetsByCustomerIdApi } from '@/api/petsApi';
import "@/components/styles/ModalMq.css";

export default function AppointmentModal({ service, clinic, onClose }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [petId, setPetId] = useState('');
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (userInfo.userId || userInfo.id) {
          try {
              let cleanCustomerId = null;
              let rawCustomerId = userInfo.customerId;

              if (rawCustomerId) {
                  if (typeof rawCustomerId === 'string' && rawCustomerId.includes(':')) {
                      cleanCustomerId = parseInt(rawCustomerId.split(':')[0]);
                  } else {
                      cleanCustomerId = parseInt(rawCustomerId);
                  }
              }

              if (!cleanCustomerId) {
                  const response = await api.get(`/api/customers/user/${userInfo.userId || userInfo.id}`);
                  cleanCustomerId = response.data.id;
              }

              if (cleanCustomerId) {
                  const userPets = await getPetsByCustomerIdApi(cleanCustomerId);
                  setPets(userPets);
                  if (userPets.length > 0) {
                      setPetId(userPets[0].id);
                  }
              }
          } catch (err) {
              console.error("No se pudieron cargar las mascotas", err);
          }
      }
    };
    fetchPets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!petId) {
        setMessage('Error: Debes seleccionar una mascota para agendar.');
        setIsLoading(false);
        return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (!userInfo.userId && !userInfo.id) {
          setMessage('Error: Debes iniciar sesión.');
          setIsLoading(false);
          return;
      }

      let cleanCustomerId = null;
      let rawCustomerId = userInfo.customerId;

      if (rawCustomerId) {
          if (typeof rawCustomerId === 'string' && rawCustomerId.includes(':')) {
              cleanCustomerId = parseInt(rawCustomerId.split(':')[0]);
          } else {
              cleanCustomerId = parseInt(rawCustomerId);
          }
      }

      if (!cleanCustomerId) {
          const response = await api.get(`/api/customers/user/${userInfo.userId || userInfo.id}`);
          cleanCustomerId = response.data.id;
      }

      const appointmentData = {
        appointmentDate: date,
        appointmentTime: time + ":00", 
        reason: reason || "Cita agendada via modal",
        customerId: cleanCustomerId,
        clinicId: clinic.id,
        serviceId: service.id,
        petId: parseInt(petId),
        status: 'PENDING'
      };

      await createAppointmentApi(appointmentData);
      setMessage('✅ Cita agendada con éxito.');
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      setMessage(`❌ Error: ${error.message || 'Error al agendar la cita.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-premium">
        <div className="modal-header-premium">
            <h2><i className="bi bi-calendar-check"></i> Agendar Cita</h2>
            <div className="details-badge">
                <span><i className="bi bi-activity"></i> {service.name || service.nombre}</span>
                <span><i className="bi bi-hospital"></i> {clinic.name || clinic.nombre}</span>
            </div>
        </div>
        
        <form onSubmit={handleSubmit} className="appointment-form-premium">
          <div className="form-group">
            <label><i className="bi bi-dog"></i> Selecciona tu Mascota:</label>
            <select required value={petId} onChange={(e) => setPetId(e.target.value)}>
                <option value="" disabled>Elige una mascota...</option>
                {pets.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
          </div>

          <div className="form-grid">
            <div className="form-group">
                <label><i className="bi bi-calendar-event"></i> Fecha:</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            </div>
            
            <div className="form-group">
                <label><i className="bi bi-clock"></i> Hora:</label>
                <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label><i className="bi bi-chat-left-text"></i> Motivo (opcional):</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="¿Por qué nos visitas? (ej: Vacunación, Control rutinario...)"></textarea>
          </div>

          <div className="modal-actions-premium">
            <button type="submit" className="btn-confirm" disabled={isLoading}>
                {isLoading ? <><span className="spinner"></span> Procesando...</> : 'Confirmar Cita'}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
          </div>
        </form>
        {message && <p className={`status-msg ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
}
