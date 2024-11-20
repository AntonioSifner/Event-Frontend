import React from "react";

const SelectField = ({ label, options, value, onChange }) => {
  const inputStyle = {
    backgroundColor: "rgb(181, 175, 175)",
    color: "white",
  };

  return (
    <div className="flex-col">
      <p className="text-black my-2">{label}:</p>
      <select
        className="form-select text-black rounded-lg outline-none"
        style={inputStyle}
        value={value} 
        onChange={onChange}
        required
      >
        <option value="">Odaberi opciju</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
