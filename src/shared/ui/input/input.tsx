import './input.less';

interface InputProps {
  name?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input({ name, value, type, placeholder, onChange }: InputProps) {
  return (
    <input
      className="input"
      value={value}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}