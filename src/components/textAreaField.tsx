import React from "react";

interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  errorMessage?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ id, label, placeholder, value, onChange, className, errorMessage }) => {
  return (
    <label htmlFor={id} className="block my-2">
      <p className="text-lg font-semibold">{label}</p>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-3 mt-2 border border-gray-400 rounded-lg min-h-60 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      <p className="text-red-500 text-sm">{errorMessage}</p>
    </label>
  );
};

export default TextAreaField;
