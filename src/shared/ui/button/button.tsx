import { Spinner } from '@shared/ui';
import { classes } from '@shared/utils';
import './button.less';

interface ButtonProps {
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler;
}

export function Button({
  text,
  disabled,
  loading,
  className,
  type,
  onClick,
}: ButtonProps) {
  const rootClassName = classes('base-input', 'button', className, { loading });
  return (
    <button
      className={rootClassName}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}>
      <div className="button-text">{text}</div>
      {loading && <Spinner/>}
    </button>
  );
}