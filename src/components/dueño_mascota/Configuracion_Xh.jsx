import React, { useState, useEffect } from 'react';
import ChangePassword_Xh from './ChangePassword_Xh';
import '@/components/styles/Configuracion_Xh.css';
import { updateUserApi } from '@/api/userApi';
import { updateCustomerApi } from '@/api/customerApi';
import { uploadImageToCloudinary } from '@/utilities/useImageUploader';
import { message } from 'antd';

export default function Configuracion_Xh({ perfil }) {
  const [mostrarCambio, setMostrarCambio] = useState(false);
  const [foto, setFoto] = useState(perfil?.picture || null);
  const [fotoFile, setFotoFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: perfil?.name?.split(' ')[0] || '',
    lastName: perfil?.name?.split(' ').slice(1).join(' ') || '',
    email: perfil?.email || '',
    phone: perfil?.phone || '',
    address: perfil?.address || '',
  });

  useEffect(() => {
    if (perfil) {
      setFormData({
        firstName: perfil.name?.split(' ')[0] || '',
        lastName: perfil.name?.split(' ').slice(1).join(' ') || '',
        email: perfil.email || '',
        phone: perfil.phone || '',
        address: perfil.address || '',
      });
      setFoto(perfil.picture || null);
    }
  }, [perfil]);
  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file));
      setFotoFile(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let pictureUrl = foto;
      if (fotoFile) {
        pictureUrl = await uploadImageToCloudinary(fotoFile);
      }

      // El 'id' para actualizar el usuario suele estar en userInfo o ser perfil.userId
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const userId = userInfo.userId || perfil.userId || perfil.id;

      const updateData = {
        id: userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        picture: pictureUrl,
      };

      await updateUserApi(updateData);
      
      if (perfil && perfil.id) {
          const updateCustomerData = {
              id: perfil.id,
              address: formData.address,
              phone: formData.phone,
              email: formData.email,
              name: formData.firstName + ' ' + formData.lastName,
              picture: pictureUrl,
          };
          await updateCustomerApi(perfil.id, updateCustomerData);
      }

      message.success('Perfil actualizado correctamente. Refresca para ver los cambios.');
      
      // Actualizar userInfo en localStorage si el correo o foto cambiaron
      const updatedUserInfo = { ...userInfo, email: formData.email, picture: pictureUrl };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error('Error al actualizar el perfil.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="configuracion-container">
      {!mostrarCambio ? (
        <div className="config-form">
          <h2 className="config-title">Información Personal</h2>

          <div className="perfil-foto-section">
            <div className="perfil-foto-wrapper">
              {foto ? (
                <img src={foto} alt="Perfil" className="perfil-foto" />
              ) : (
                <span className="sin-foto">+</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImagen}
                className="input-foto"
              />
            </div>
            <p className="perfil-text">Haz clic para cambiar tu foto de perfil</p>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nombre</label>
              <input id="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="Nombre" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input id="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Apellido" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="correo@ejemplo.com" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="Número de teléfono" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="direccion">Dirección</label>
              <input id="address" type="text" value={formData.address} onChange={handleChange} placeholder="Dirección" />
            </div>
          </div>

          <div className="btn-actions">
            <button 
              className="btn-cambiar" 
              onClick={() => setMostrarCambio(true)}
            >
              Cambiar Contraseña
            </button>
            <button className="btn-guardar" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      ) : (
        <ChangePassword_Xh volver={() => setMostrarCambio(false)} />
      )}
    </div>
  );
}

