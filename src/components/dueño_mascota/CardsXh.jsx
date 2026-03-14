import { Link } from 'react-router-dom';
import '@/components/styles/CardsXh.css';

export default function CardsXh({ mascota }) {
    const calcularEdad = (birthdate) => {
      if (!birthdate) return 'N/A';

      const today = new Date();
      const birthDate = new Date(birthdate);

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      
      if (today.getDate() < birthDate.getDate()) {
          months--;
      }

      if (months < 0) {
          years--;
          months += 12;
      }
  
      if (years > 0 && months === 0) {
          return `${years} años`;
      }

      if (years > 0) {
          return `${years} años y ${months} meses`;
      }

      if (months > 0) {
          return `${months} meses`;
      }

      return 'Menos de 1 mes';
  };
  return (
    <div className="cardXh_1">
        <img 
          className="Img_Xh1" 
          src={mascota.imageUrl} 
          alt={`Foto de ${mascota.name}`} 
        />
      <p className="nombre">{mascota.name}</p>
      <p className="detalle">{mascota.raceName}</p>
      <p className="detalle">{calcularEdad(mascota.birthdate)}</p>
      <p className="detalle">{mascota.gender}</p>
      <div className="botones_Xh"> 
        <button className="bton_1">Editar</button>
        <Link to={'/historial'} state={{mascota : mascota}} ><button className="bton_2">Historial</button></Link>
      </div>
    </div>
  );
}
