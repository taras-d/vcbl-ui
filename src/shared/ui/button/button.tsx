import { Spinner } from '@shared/ui';
import { classes } from '@shared/utils';
import './button.less';

interface ButtonProps {
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler;
}

export function Button({ text, disabled, loading, onClick }: ButtonProps) {
  const rootClassName = classes('button', { loading });
  return (
    <button className={rootClassName} disabled={disabled || loading} onClick={onClick}>
      <div className="button-text">{text}</div>
      {loading && <Spinner/>}
    </button>
  );
}