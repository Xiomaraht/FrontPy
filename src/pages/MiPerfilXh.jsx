import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderLg from '../components/Laura/HeaderLg'
import FooterLg from '../components/Laura/FooterLg'
import PerfilU from '../components/Xiomara/PerfilU_Xh';
import MascotasXh from '../components/Xiomara/MascotasXh';
import HistorialPe_Xh from '../components/Xiomara/HistorialPe_Xh';
import PaymentMethod_Xh from '../components/Xiomara/PaymentMethod_Xh';
import Configuracion_Xh from '../components/Xiomara/Configuracion_Xh';
import LogOut_Xh from '../components/Xiomara/CloseSession';
import { getCustomerApi } from '../api/customerApi'; // Asumo que getCustomerApi está en '../api/CustomerApi'
import '../components/styles/MiPerfilXh.css';

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
  // El estado 'perfil' ahora almacenará los datos completos del cliente obtenidos de la API
  const [perfil, setPerfil] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejar la carga

      useEffect(() => {
        // Bandera para evitar actualizaciones de estado en un componente desmontado
        let isMounted = true; 
        
        const userInfo = getUserInfoFromStorage();

        if (!userInfo || !userInfo.userId) {
            setIsLoading(false);
            return; 
        }

        const fetchPerfil = async (userId) => {
            try {
                const userData = await getCustomerApi(userId); 
                
                // Solo actualiza el estado si el componente sigue montado
                if (isMounted) {
                    setPerfil(userData);
                    console.log("Datos del perfil cargados:", userData);
                }
            } catch (error) {
                console.error("Error al obtener datos del perfil desde la API:", error);
                
                // Solo redirige si el componente sigue montado (si no, la navegación es innecesaria)
                if (isMounted) {
                    redireccion('/auth/login'); 
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };
        fetchPerfil(userInfo.userId);

        // 🔥 FUNCIÓN DE LIMPIEZA
        // Cuando el componente se desmonte, isMounted se vuelve falso.
        // Esto evita que React intente actualizar estados o navegar después del desmontaje,
        // que es donde suele fallar el "destroy is not a function".
        return () => {
            isMounted = false;
        };

    }, [redireccion]); // Dependencia de redireccion

    // Mostrar un estado de carga mientras se obtienen los datos
    if (isLoading || !perfil) {
        // Podrías usar un spinner o un mensaje más elaborado
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
    
  // Si los datos están cargados, renderiza el contenido
  return (
    <>
      <HeaderLg />
      <div className="Contenedor_P">
        <div className="textoMp-Xh">
          <h1 className="tituloMp-Xh">Tu Perfil</h1>
          <p className="subtextoMp-Xh">
            Hola, {perfil.user.names}! Gestiona tu información personal y de tus mascotas
          </p>
        </div>
        <div className="containerMas-Xh">
          {/* Le pasamos los datos del perfil cargados por la API */}
          <PerfilU seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} datos={perfil} /> 
          <div className="containerMp-Xh">
            {seccionActiva === "mascotas" && <MascotasXh perfil={perfil} />}
            {seccionActiva === "historialPe" && <HistorialPe_Xh />}
            {seccionActiva === "metodos" && <PaymentMethod_Xh />}
            {seccionActiva === "config" && <Configuracion_Xh />}
            {seccionActiva === "cerrar" && <LogOut_Xh/>}
          </div>
        </div>
      </div>
      <FooterLg />
    </>
  );
}