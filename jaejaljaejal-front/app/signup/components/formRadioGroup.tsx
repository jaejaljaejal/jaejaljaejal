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
      <div className="flex space-x-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`flex-1 py-2 border rounded-lg ${
              value === option.value
                ? "bg-custom text-white"
                : "bg-white text-black border-gray-300"
            }`}
            onClick={() =>
              onChange({
                target: { name, value: option.value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          >
            {option.label}
          </button>
        ))}
      </div>
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default FormRadioGroup;
