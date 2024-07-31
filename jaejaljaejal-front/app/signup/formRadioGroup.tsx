import React from "react";

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: { label: string; value: string }[];
  required?: boolean;
  error?: string;
}

const FormRadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
}) => {
  return (
    <div className="flex flex-col w-96 space-y-2">
      <p className="text-black text-md font-semibold">{label}</p>
      <div className="flex justify-between">
        {options.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="mr-2"
              required={required}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default FormRadioGroup;
