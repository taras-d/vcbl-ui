import './input.less';

interface InputProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function Input({
  name,
  value,
  defaultValue,
  type,
  placeholder,
  disabled,
  autoComplete,
  onChange,
  onFocus
}: InputProps) {
  return (
    <input
      className="base-input input"
      value={value}
      defaultValue={defaultValue}
      type={type}
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      autoComplete={autoComplete}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}