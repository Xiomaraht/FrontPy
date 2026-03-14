
function SidebarMq({ onItemClick }) {
  return (
    <div className="sidebarNA-Mq">
      <h2>Menú</h2>
      <ul>
        <li onClick={() => onItemClick('productos')}>Productos</li>
        <li onClick={() => onItemClick('servicios')}>Servicios</li>
        <li onClick={() => onItemClick('clientes')}>Clientes</li>
        <li onClick={() => onItemClick('mascotas')}>Mascotas</li>
        <li onClick={() => onItemClick('pedidos')}>Pedidos</li>
        <li onClick={() => onItemClick('citas')}>Citas</li>
        <li onClick={() => onItemClick('cerrar sesion')}>Cerrar Sesión</li>
      </ul>
    </div>
  );
}

export default SidebarMq;