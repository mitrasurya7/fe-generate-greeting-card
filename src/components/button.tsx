import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 cursor-pointer font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
