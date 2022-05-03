import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { classes, events, tkey } from '@shared/utils';
import { EventTypes, AlertOptions } from '@shared/interfaces';
import { CloseIcon } from '@shared/ui';
import './modal.less';

interface ModalProps {
  open?: boolean;
  header?: React.ReactNode;
  children?: React.ReactNode;
  closeIcon?: boolean;
  closeByEsc?: boolean;
  closeByBackdrop?: boolean;
  className?: string;
  onClose?: () => void;
}

export function Modal({
  open = true,
  header,
  children,
  closeIcon = true,
  closeByEsc = true,
  closeByBackdrop = true,
  className = '',
  onClose 
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (closeByEsc && onClose) {
      const handleKeyUp = (event: KeyboardEvent) => {
        if (
          event.key === 'Escape' && 
          document.querySelector('.modal:last-child') === modalRef.current
        ) {
          onClose();
        }
      };
      window.addEventListener('keyup', handleKeyUp);
      return () => window.removeEventListener('keyup', handleKeyUp);
    }
  }, [closeByEsc]);

  if (!open) {
    return null;
  }

  function handleModalClick(event: React.MouseEvent): void {
    const target = event.target as  HTMLElement;
    if (closeByBackdrop && onClose && target.isConnected && !target.closest('.modal-box')) {
      onClose();
    }
  }

  const rootClassName = classes('modal', className);

  const modal = (
    <div className={rootClassName} onClick={handleModalClick} ref={modalRef}>
      <div className="modal-inner">
        <div className="modal-box">
          {header && (
            <div className="modal-header">
              <div className="modal-header-text">{header}</div>
              {closeIcon && <div className="modal-header-close" onClick={onClose}><CloseIcon /></div>}
            </div>
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

Modal.alert = (options: AlertOptions): void => {
  if (!options.title) {
    options.title = tkey('misc.defErrTitle');
  }

  events.trigger(EventTypes.showAlert, options);
}
