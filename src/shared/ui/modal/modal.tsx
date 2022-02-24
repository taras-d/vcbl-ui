import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { classes } from '@shared/utils';
import './modal.less';

interface ModalProps {
  open?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
  closeByEsc?: boolean;
  closeByBackdrop?: boolean;
  className?: string;
  onClose?: () => void;
}

export function Modal({
  open,
  header,
  children,
  closeByEsc = true,
  closeByBackdrop = true,
  className = '',
  onClose 
}: ModalProps) {
  useEffect(() => {
    if (closeByEsc) {
      const handleKeyUp = (event: KeyboardEvent) => event.key === 'Escape' && onClose?.();
      window.addEventListener('keyup', handleKeyUp);
      return () => window.removeEventListener('keyup', handleKeyUp);
    }
  }, [closeByEsc]);

  if (!open) {
    return null;
  }

  function handleModalClick(event: React.MouseEvent): void {
    const target = event.target as  HTMLElement;
    if (closeByBackdrop && onClose && !target.closest('.modal-box')) {
      onClose();
    }
  }

  const rootClassName = classes('modal', className);

  const modal = (
    <div className={rootClassName} onClick={handleModalClick}>
      <div className="modal-inner">
        <div className="modal-box">
          {header && (
            <div className="modal-header">{header}</div>
          )}
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

Modal.alert = (title: string, text: string ): void => {
  window.dispatchEvent(new CustomEvent('show-alert', {
    detail: { title, text }
  }));
}
