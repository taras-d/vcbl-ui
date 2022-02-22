import './button.less';

interface ButtonProps {
  text?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export function Button({ text, disabled, onClick }: ButtonProps) {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>{text}</button>
  );
}