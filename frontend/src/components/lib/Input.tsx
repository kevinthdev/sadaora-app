import React, { useState } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  required?: boolean;
  minLength?: number;
};

const Input: React.FC<InputProps> = ({
  className = "",
  required = false,
  minLength,
  ...props
}) => {
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    const { value, type } = props;
    if (required && String(value).trim() === "") {
      setError("This field is required.");
    } else if (minLength && String(value)?.length < minLength) {
      setError(`Must be at least ${minLength} characters.`);
    } else if (type === "email" && !validateEmail(String(value) || "")) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  return (
    <div className="w-full">
      <input
        className={`w-full px-4 py-2 my-2 rounded shadow-sm border border-yellow-200 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition ${className}`}
        onBlur={handleBlur}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
