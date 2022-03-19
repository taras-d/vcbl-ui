import './input.less';

interface InputProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  autoCapitalize?: string;
  maxLength?: number;
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
  autoComplete = 'off',
  autoCapitalize = 'off',
  maxLength = 50,
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
      autoCapitalize={autoCapitalize}
      maxLength={maxLength}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
}