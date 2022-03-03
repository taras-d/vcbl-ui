import './layout-header.less';

export function LayoutHeader() {
  return (
    <div className="layout-header">
      <select>
        <option value="/">Vocabulary</option>
        <option value="/profile">Profile</option>
      </select>
    </div>
  );
}