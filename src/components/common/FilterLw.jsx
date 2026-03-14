import { useState } from 'react';
import '@/components/styles/FilterLw.css';

export default function FilterLw({ 
  headerTitle, 
  categories, 
  onFilterChange, 
  className, 
  showCheckmark = true, 
  selectedValue = '', // selectedValue sigue esperando el 'name' o el string de la opción
  closeOnSelect = true}) {

const [isOpen, setIsOpen] = useState(false);

// El manejador de selección ahora recibe el valor (objeto o string)
const handleSelect = (category) => {
      if (closeOnSelect) { 
          setIsOpen(false);
        }
    if (onFilterChange) {
            // Envía el objeto completo (si es categoría) o el string (si es otro filtro)
            onFilterChange(headerTitle, category);
        }
    };

  // Combina las clases CSS para el contenedor principal
const containerClassName = `category-selector-container ${className || ''}`;
const arrowClassName = `bi bi-chevron-down arrow-icon ${isOpen ? 'open' : ''}`;

return (
    <div className={containerClassName}>
      <div className="category-selector-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="header-title">{headerTitle}</span>
        <i className={arrowClassName}></i>
      </div>
      {isOpen && (
        <ul className="category-list">
          {categories.map((category) => {
            
            // 🛑 CAMBIO CLAVE: Lógica para manejar OBJETOS o STRINGS
            const isObject = typeof category === 'object' && category !== null;
            const itemValue = isObject ? category.name : category; // Nombre a mostrar
            const itemKey = isObject ? (category.id || category.name) : category; // Clave única
            
            const itemClassName = `category-item ${selectedValue === itemValue ? 'selected' : ''}`;
            
            return (
              <li 
                key={itemKey} 
                className={itemClassName} 
                // Al hacer click, pasamos el valor completo (objeto o string)
                onClick={() => handleSelect(category)}
              >
                <span>{itemValue}</span>
                {showCheckmark && selectedValue === itemValue && <i className="bi bi-check check-icon"></i>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}