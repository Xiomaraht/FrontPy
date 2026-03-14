
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/authApi';
import '@/components/styles/PerfilU_Xh.css';

export default function PerfilU({ seccionActiva, setSeccionActiva, datos }) {
  const redireccion = useNavigate();
  const items = [
    { key: 'mascotas', label: 'Mis Mascotas' },
    { key: 'historialPe', label: 'Historial de Pedidos' },
    { key: 'metodos', label: 'Métodos de Pago' },
    { key: 'config', label: 'Configuración' }
  ];

  const closeSession = async () => {
    try {
      await logout();
    } catch (error) {
       console.error("Error signing out", error);
    } finally {
      localStorage.clear();
      window.location.href = '/home'; // Redirect and force reload
    }
  }
  
  const imageUrl = datos?.imageUrl; // Simplified
  const imageStyle = imageUrl 
    ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } 
    : {};

  return (
    <div className='Perf_1Xh'>
      <div 
        className='ImgXh_1' 
        style={imageStyle} 
      >
        {!imageUrl && <p style={{textAlign: 'center', fontSize: '10px', color: '#999', paddingTop: '10px'}}>Sin Foto</p>}
      </div> 
      {datos ? (
        <div style={{padding: '10px 0'}}>
          <h4 className='NomXh_1'>{datos.name}</h4>
          <p className='CorreoXh_1' style={{fontSize: '0.9rem', color: '#666'}}>{datos.email}</p>
        </div>
      ) :( 
        <>
          <h4 className='NomXh_1'>Nombre del usuario</h4>
          <p className='CorreoXh_1'>Correo del usuario</p>
        </>
      )}
      <ul className='Menu_1'>
        {items.map(item => (
          <li
            key={item.key}
            className={seccionActiva === item.key ? 'active' : ''}
            onClick={() => setSeccionActiva(item.key)}
          >
            {item.label}
          </li>
        ))}
        <li id='cerrar-sesion' onClick={closeSession}>
          Cerrar sesión
        </li>
      </ul>
    </div>
  );
}



