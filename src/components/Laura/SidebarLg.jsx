import '../styles/SidebarLg.css';
import img from "../images/img.jpg"
import { useState } from 'react';



const SidebarLg = ({parametroDeCambio}) => {
  const clickDeCambio = (nombrepagina) => {
    setEstiloAct(nombrepagina)
    if(parametroDeCambio){
      parametroDeCambio(nombrepagina)
    }
  }

  const [estiloAct, setEstiloAct] = useState('veterinarias')
  return (
    <aside className="sidebar">
      <img src={img} alt="Avatar" className="circle-image" />
      <nav>
        <ul>
          <li className={estiloAct === 'veterinarias' ? 'active' : ''} onClick={()=> clickDeCambio('veterinarias')}>
            <span className="material-symbols-outlined">pets</span>Veterinarias
          </li>
          <li className={estiloAct === 'users' ? 'active' : ''} onClick={()=> clickDeCambio('users')}>
            <span className="material-symbols-outlined">group</span>Usuarios
          </li>
          <li className={estiloAct === 'reportes' ? 'active' : ''} onClick={()=> clickDeCambio('reportes')}>
            <span className="material-symbols-outlined">request_page</span>Reportes
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarLg;

