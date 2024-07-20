import { useState } from "react";

function FormInput({ label, type, name, placeholder, error }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <label className="form-control">
      
      <input
        // required
        type={type}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`input input-bordered w-full focus:outline-none ${error}`}
      />
    </label>
  );
}

export default FormInput;
