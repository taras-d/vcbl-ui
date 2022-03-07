import './select.less';

interface SelectProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Select({ value, onChange, disabled, children }: SelectProps) {
  return (
    <select className="base-input select" value={value} onChange={onChange} disabled={disabled}>
      {children}
    </select>
  );
}