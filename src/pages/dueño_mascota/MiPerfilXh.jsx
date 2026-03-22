import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLg from '@/components/common/HeaderLg'
import FooterLg from '@/components/common/FooterLg'
import PerfilU from '@/components/dueño_mascota/PerfilU_Xh';
import MascotasXh from '@/components/dueño_mascota/MascotasXh';
import Configuracion_Xh from '@/components/dueño_mascota/Configuracion_Xh';
import LogOut_Xh from '@/components/dueño_mascota/CloseSession';
import { getCustomerApi } from '@/api/customerApi'; 
import '@/components/styles/MiPerfilXh.css';
import RegisterCustomerMq from '@/components/common/RegisterCustomerMq';
import PaymentMethod_Xh from '@/components/dueño_mascota/PaymentMethod_Xh';

// Función para obtener la información de usuario del localStorage
const getUserInfoFromStorage = () => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
        try {
            return JSON.parse(userInfoString);
        } catch (error) {
            console.error("Error al parsear userInfo:", error);
            localStorage.removeItem('userInfo');
            return null;
        }
    }
    return null;
};

export default function MiPerfilXh() {
  const [seccionActiva, setSeccionActiva] = useState("mascotas");
  const redireccion = useNavigate();
  const [perfil, setPerfil] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [perfilInexistente, setPerfilInexistente] = useState(false);
  const datosUsuarioRef = useRef({ userId: getUserInfoFromStorage()?.userId });

  const fetchPerfilData = async () => {
    const userInfo = getUserInfoFromStorage();
    if (!userInfo || !userInfo.userId) {
        setIsLoading(false);
        return; 
    }
    try {
        const userData = await getCustomerApi(userInfo.userId); 
        setPerfil(userData);
        setPerfilInexistente(false);
        console.log("Datos del perfil cargados:", userData);
    } catch (error) {
        console.error("Error al obtener datos del perfil:", error);
        if (error.response?.status === 404) {
            setPerfilInexistente(true);
            setPerfil(null); 
        } else {
            redireccion('/auth/login'); 
        }
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfilData();
  }, [redireccion]); 

  if (isLoading) {
    return (
        <>
            <HeaderLg />
            <div className="Contenedor_P">
                <h1 className="tituloMp-Xh">Cargando perfil...</h1>
            </div>
            <FooterLg />
        </>
    );
  }

  if (perfilInexistente) {
      return (
        <>
            <HeaderLg />
            <div className="Contenedor_P">
                <div className="textoMp-Xh">
                    <h1 className="tituloMp-Xh">Completa tu Perfil</h1>
                    <p className="subtextoMp-Xh">Parece que aún no has completado tus datos de cliente. Por favor, llena el siguiente formulario.</p>
                </div>
                <RegisterCustomerMq 
                    setChange={(val) => {
                        if (val === 'exito') fetchPerfilData(); 
                    }} 
                    datosUsuario={datosUsuarioRef} 
                />
            </div>
            <FooterLg />
        </>
      )
  }
    
  return (
    <>
      <HeaderLg />
      <div className="Contenedor_P">
        <div className="textoMp-Xh">
          <h1 className="tituloMp-Xh">Tu Perfil</h1>
          <p className="subtextoMp-Xh">
            Hola, {perfil?.name}! Gestiona tu información personal y de tus mascotas
          </p>
        </div>
        <div className="containerMas-Xh">
          <PerfilU seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} datos={perfil} /> 
          <div className="containerMp-Xh">
            {seccionActiva === "mascotas" && <MascotasXh perfil={perfil} onUpdate={fetchPerfilData} />}
            {seccionActiva === "metodos" && <PaymentMethod_Xh />}
            {seccionActiva === "config" && <Configuracion_Xh perfil={perfil} onUpdate={fetchPerfilData} />}
            {seccionActiva === "cerrar" && <LogOut_Xh/>}
          </div>
        </div>
      </div>
      <FooterLg />
    </>
  );
}