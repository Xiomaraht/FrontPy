import '../styles/InfoU_Xh.css'

export default function InfoU_Xh() {
  return (
    <div className="infoXh_1">
      <h1>Información Personal</h1>
      <div className='FormXh_1'>
        <div className='FormXh_2'>
          <span>Nombre</span>
          <input type="text" />
        </div>
        <div className='FormXh_2'>
          <span>Correo Electrónico</span>
          <input type="email" />
        </div>
      </div>
      <div className='FormXh_1'>
        <div className='FormXh_2'>
        <span>Teléfono</span>
          <input type="text" />
        </div>
        <div className='FormXh_2'>
        <span>Dirreción</span>
        <input type="text" />
        </div>
      </div>
    </div>
  );
}
