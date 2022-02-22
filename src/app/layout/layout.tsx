import './layout.less';

interface LayoutProps {
  render: JSX.Element;
}

export function Layout({ render }: LayoutProps) {
  return (
    <div className="layout">
      <div className="layout-header"></div>
      <div className="layout-content">{render}</div>
    </div>
  );
}
