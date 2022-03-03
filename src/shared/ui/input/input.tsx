import './input.less';

interface InputProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input({ name, value, defaultValue, type, placeholder, disabled, onChange }: InputProps) {
  return (
    <input
      className="input"
      value={value}
      defaultValue={defaultValue}
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
}