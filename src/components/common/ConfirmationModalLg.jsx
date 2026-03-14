// ConfirmationModal.jsx

import React from 'react';
import '@/components/common/ConfirmationModal.css'; // Crea un archivo CSS para el modal

export default function ConfirmationModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText,
  cancelText
}) {
  if (!isOpen) return null; // No renderiza nada si no está abierto

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="btn btn-confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}