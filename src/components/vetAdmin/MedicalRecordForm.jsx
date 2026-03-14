import React, { useState } from 'react';
import '@/components/styles/ModalMq.css';

export default function MedicalRecordForm({ isOpen, onClose, title, onSubmit }) {
    const [detail, setDetail] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ detail });
        setDetail('');
        onClose();
    };

    return (
        <div className="modalOverlayMq">
            <div className="modalContentMq">
                <h2>{title}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                    <label>
                        Detalles:
                        <textarea 
                            value={detail} 
                            onChange={(e) => setDetail(e.target.value)} 
                            required
                            style={{ width: '100%', minHeight: '80px', marginTop: '5px' }}
                        />
                    </label>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button type="button" onClick={onClose} style={{ padding: '8px 16px', cursor: 'pointer' }}>Gancelar</button>
                        <button type="submit" style={{ padding: '8px 16px', background: 'var(--colorTituloOscura)', color: 'white', cursor: 'pointer' }}>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
