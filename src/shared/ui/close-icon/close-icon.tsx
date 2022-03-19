import './close-icon.less';

export function CloseIcon() {
  return (
    <div className="close-icon">
      <svg viewBox="0 0 20 20">
        <line x1="0" y1="0" x2="20" y2="20"/>
        <line x1="0" y1="20" x2="20" y2="0"/>
      </svg>
    </div>
  );
}
