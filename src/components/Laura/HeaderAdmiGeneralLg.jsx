// src/components/Laura/HeaderAdmiGeneralLg.jsx
import React from 'react';
import '../styles/HeaderAdmiGeneralLg.css';
import SearchLg from './SearchLg'; // Asumo que existe y tiene su lógica interna
import FilterLg from './FilterLg';

const HeaderAdmiGeneralLg = ({ onSearchChange, onFilterChange, filterOptions }) => {
  return (
    <div className="headerHa-Lg">
      <FilterLg onFilterChange={onFilterChange} filters={filterOptions} />
      <SearchLg onSearchChange={onSearchChange} />
    </div>
  );
};

export default HeaderAdmiGeneralLg;