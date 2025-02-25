import React from "react";

interface TextFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  errorMessage?: string;
}

const TextField: React.FC<TextFieldProps> = ({ id, label, placeholder, value, onChange, className, errorMessage }) => {
  return (
    <label htmlFor={id} className="block">
      <p className="text-lg font-semibold">{label}</p>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 mt-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      <p className="text-red-500 text-sm">{errorMessage}</p>
    </label>
  );
};

export default TextField;
