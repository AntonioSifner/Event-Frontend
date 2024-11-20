import React from "react";

const TextareaField = ({ label, name, value, onChange }) => {
  const inputStyle = {
    backgroundColor: "rgb(181, 175, 175)",
    color: "white",
  };

  return (
    <div className="flex-col">
      <p className="text-black text-left my-2">{label}:</p>
      <textarea
        name={name}
        rows="3"
        className="form-textarea text-black w-full mb-6 placeholder-white border-none rounded-lg"
        placeholder={`${label}...`}
        style={inputStyle}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextareaField;
