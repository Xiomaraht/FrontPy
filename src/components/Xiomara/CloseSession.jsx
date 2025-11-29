import { useNavigate } from "react-router-dom";

export default function CloseSession() {
  const cerrar = useNavigate();

  const cerrarSesion = () => {
  
    localStorage.removeItem('usuarioActual');

    cerrar("/home"); 
  };
}


