// components/InputField.tsx

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  children?: React.ReactNode;
  maxLength?: number;
  rounded?: string;
  feedback?: string;
  feedbackClass?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  required,
  error,
  children,
  maxLength,
  rounded = "rounded-lg",
  feedback,
  feedbackClass,
}) => (
  <div className="flex flex-col w-96 space-y-2">
    <p className="text-black text-md font-semibold">{label}</p>
    <div className="flex w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`flex-grow h-12 border border-black p-2 ${rounded} text-black`}
        required={required}
        maxLength={maxLength}
      />
      {children}
    </div>
    {error && <span className="text-red-500 text-xs">{error}</span>}
    {feedback && <span className={`text-xs ${feedbackClass}`}>{feedback}</span>}
  </div>
);

export default InputField;