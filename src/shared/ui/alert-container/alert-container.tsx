import { useEffect, useState } from 'react';

import { AlertOptions } from '@shared/interfaces';
import { Modal, Button } from '@shared/ui';
import './alert-container.less';

export function AlertContainer() {
  const [options, setOptions] = useState<AlertOptions>(null);

  useEffect(() => {
    function showAlert(event: CustomEvent): void {
      setOptions(event.detail);
    }

    window.addEventListener('show-alert', showAlert);
    return () => window.removeEventListener('show-alert', showAlert);
  }, []);

  const closeAlert = () => setOptions(null);

  return options && (
    <Modal
      open={true}
      className="alert"
      header={options.title}
      onClose={closeAlert}>
      {options.text}
      <div className="alert-actions">
        <Button text="Ok" onClick={closeAlert}/>
      </div>
    </Modal>
  );
}
