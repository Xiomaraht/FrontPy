
function SidebarMq({ onItemClick }) {
  return (
    <div className="sidebarNA-Mq">
      <h2>Menú</h2>
      <ul>
        <li onClick={() => onItemClick('productos')}>Productos</li>
        <li onClick={() => onItemClick('servicios')}>Servicios</li>
        <li onClick={() => onItemClick('cerrar sesion')}>Cerrar Sesión</li>
      </ul>
    </div>
  );
}

export default SidebarMq;