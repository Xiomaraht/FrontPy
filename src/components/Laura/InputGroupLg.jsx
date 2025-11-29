import React from 'react';

const InputGroupLg = ({ label, name, value, onChange, placeholder, type = 'text' }) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputGroupLg;


