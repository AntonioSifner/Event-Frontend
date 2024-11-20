import React from "react";

const InputField = ({ label, type, name, placeholder, value, onChange }) => {
  const inputStyle = {
    backgroundColor: "rgb(181, 175, 175)",
    color: "white",
  };
  return (
    <div className="flex-col ">
      <p className="text-black text-left my-2">{label}:</p>
      <input
        type={type}
        name={name}
        className="form-input text-black w-full mb-6 placeholder-white border-none rounded-lg"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={inputStyle}
        required
      />
    </div>
  );
};

export default InputField;
