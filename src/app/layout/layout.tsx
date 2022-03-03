import { LayoutHeader } from './layout-header';
import './layout.less';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <LayoutHeader />
      <div className="layout-content">{children}</div>
    </div>
  );
}
