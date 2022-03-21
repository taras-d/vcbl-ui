import { classes } from '@shared/utils';
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
  className?: string;
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
  className,
  onChange,
  onFocus
}: InputProps) {
  const rootClass = classes('base-input input', className);
  return (
    <input
      className={rootClass}
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