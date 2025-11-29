// src/components/Laura/FilterLg.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/FilterLg.css';

const FilterLg = ({ onFilterChange, filters = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedFilterLabel, setSelectedFilterLabel] = useState('Filtrar'); // Valor inicial

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterClick = (statusValue, statusLabel) => {
    onFilterChange(statusValue);
    setSelectedFilterLabel(statusLabel);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Efecto para establecer el filtro inicial. Se ejecuta una vez al montar, o si `filters` cambia
  useEffect(() => {
    // Si ya hay una etiqueta seleccionada que no es 'Filtrar' (el valor por defecto), no la resetees
    if (selectedFilterLabel === 'Filtrar' && filters.length > 0) {
      setSelectedFilterLabel(filters[0].label); // Selecciona la primera opción por defecto
      onFilterChange(filters[0].value); // Y aplica ese filtro
    } else if (filters.length === 0) {
      // Si no hay filtros, se puede establecer un estado por defecto si es necesario
      setSelectedFilterLabel('Todos');
      onFilterChange('Todos'); // O maneja este caso como quieras
    }
  }, [filters, onFilterChange, selectedFilterLabel]);


  return (
    <div className="filter-section" ref={dropdownRef}>
      <button className="filter-btn" onClick={toggleFilter}>
        {selectedFilterLabel} ▼
      </button>
      <ul className="dropdown" style={{ display: isOpen ? 'block' : 'none' }}>
        {filters.length > 0 ? (
          filters.map((filter, index) => (
            <li
              key={filter.value || index} // Usa filter.value si es único, si no index está bien.
              onClick={() => handleFilterClick(filter.value, filter.label)}
            >
              {filter.label}
            </li>
          ))
        ) : (
          // Esto solo se mostrará si no se pasa ningún 'filterOptions' al componente
          <li onClick={() => handleFilterClick('Todos', 'Todos')}>Todos</li>
        )}
      </ul>
    </div>
  );
};

export default FilterLg;