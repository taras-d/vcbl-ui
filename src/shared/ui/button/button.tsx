import { Spinner } from '../spinner/spinner';
import './button.less';

interface ButtonProps {
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler;
}

export function Button({ text, disabled, loading, onClick }: ButtonProps) {
  return (
    <button className={`button ${loading ? 'loading' : ''}`} disabled={disabled || loading} onClick={onClick}>
      <div className="button-text">{text}</div>
      {loading && <Spinner/>}
    </button>
  );
}