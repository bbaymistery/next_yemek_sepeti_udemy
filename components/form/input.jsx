import React from "react";

const Input = (props) => {
  const { type, errorMessage, touched, placeholder, ...inputProps } = props;

  return (
    <div className="w-full">
      <label className="relative block cursor-text w-full">
        <input
          type={type}
          className={`h-14 w-full border rounded-xl outline-none px-4 peer pt-2 text-sm bg-white/50 backdrop-blur-sm
          ${touched && errorMessage ? "border-red-500 ring-2 ring-red-100" : "border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm"}
          transition-all duration-300 hover:border-gray-300
          `}
          required
          placeholder=" "
          {...inputProps}
        />
        <span className="absolute top-0 left-0 px-4 text-sm text-gray-400 flex items-center h-full peer-focus:h-7 peer-focus:text-xs peer-focus:text-primary peer-valid:h-7 peer-valid:text-xs transition-all pointer-events-none">
          {placeholder}
        </span>
      </label>
      {touched && <span className="text-xs text-danger mt-1 block">{errorMessage}</span>}
    </div>
  );
};

export default Input;
