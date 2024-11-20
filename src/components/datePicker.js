import React from "react";

const DateField = ({ label, name, value, onChange }) => {
  const inputStyle = {
    backgroundColor: "rgb(181, 175, 175)",
    color: "white",
  };

  return (
    <div className="flex-col w-3/7 ">
      <p className="text-black text-left my-2 text-center">{label}:</p>
      <input
        type="datetime-local"
        name={name}
        className="form-input text-black w-full mb-6 placeholder-white border-none rounded-lg"
        placeholder="Mjesec"
        style={inputStyle}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DateField;
