import { LayoutHeader } from './layout-header';
import './layout.less';

interface LayoutProps {
  render: JSX.Element;
}

export function Layout({ render }: LayoutProps) {
  return (
    <div className="layout">
      <LayoutHeader />
      <div className="layout-content">{render}</div>
    </div>
  );
}
