// src/components/Laura/DetailCardLg.jsx
import React from 'react';
import '@/components/styles/DetailCardLg.css';
import defaultImg from "@/components/images/img.jpg";
import IconEditLg from '@/components/common/IconEditLg';

const DetailCardLg = ({
    data,
    fields,
    onClose,
    showEditIcon = false,
    onEditClick,
    actionMode = 'view', // 'view' (default) o 'actions'
    profileImage = defaultImg,
    titleField,
    subtitleField,
    children,
    // --- PROPS PARA CONTROLAR LA VISIBILIDAD DE LOS BOTONES ---
    // Si la función se pasa (no es null/undefined), el botón se mostrará y estará habilitado.
    onActivateClick = null,
    onDeactivateClick = null,
    onDeleteClick = null,
}) => {
    if (!data) {
        return null;
    }

    // Determinar si mostrar la sección completa de botones de acción
    // Se mostrará si actionMode es 'actions' Y al menos una de las funciones de click está presente
    const showActionButtonsSection = actionMode === 'actions' &&
                                   (onActivateClick || onDeactivateClick || onDeleteClick);

    // Lógica para determinar qué botón de "activación/desactivación" mostrar
    let actionButton = null;
    if (onDeactivateClick && data.status === 'Activo') {
        actionButton = (
            <button
                className="action-btn deactivate"
                onClick={() => onDeactivateClick(data)}
                // No se usa 'disabled' aquí, ya que siempre estará habilitado si se muestra
            >
                Desactivar
            </button>
        );
    } else if (onActivateClick && (data.status === 'Pendiente' || data.status === 'Suspendido' || data.status === 'Cancelado')) {
        actionButton = (
            <button
                className="action-btn activate"
                onClick={() => onActivateClick(data)}
                // No se usa 'disabled' aquí, ya que siempre estará habilitado si se muestra
            >
                Activar
            </button>
        );
    }

    return (
        <section className="detail-card">
            <div className="detail-card-header">
                <img src={profileImage || defaultImg} alt="Foto perfil" className="circle-image-large" />
                {titleField && data[titleField] && <h2 className="main-title">{data[titleField]}</h2>}
                {subtitleField && data[subtitleField] && <p className="subtitle">{data[subtitleField]}</p>}

                {showEditIcon && onEditClick && (
                    <div className="edit-icon-container" onClick={() => onEditClick(data)}>
                        <IconEditLg />
                    </div>
                )}
            </div>

            <div className="detail-card-body">
                {fields.map((field, index) => (
                    <React.Fragment key={index}>
                        <p>
                            <strong>{field.label}:</strong>{' '}
                            {field.key === 'address' ? (
                                <span dangerouslySetInnerHTML={{ __html: data[field.key] }}></span>
                            ) : (
                                <span>{data[field.key]}</span>
                            )}
                        </p>
                        {/* Now using the detail-card-divider class */}
                        {field.key === 'status' && (
                            <hr className="detail-card-divider" />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {showActionButtonsSection && (
                <>
                    <div className="detail-card-actions">
                        {actionButton} {/* Renderiza el botón de acción determinado por la lógica de estado */}
                        {/* El botón de eliminar solo se renderiza si onDeleteClick es una función */}
                        {onDeleteClick && (
                            <button
                                className="action-btn delete"
                                onClick={() => onDeleteClick(data)}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                </>
            )}

            {onClose && (
                <div className="close-button-container">
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            )}

            {children}
        </section>
    );
};

export default DetailCardLg;