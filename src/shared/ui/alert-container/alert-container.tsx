import { useEffect, useState } from 'react';

import { AlertOptions } from '@shared/interfaces';
import { listen } from '@shared/utils';
import { Modal, Button } from '..';
import './alert-container.less';

export function AlertContainer() {
  const [options, setOptions] = useState<AlertOptions>(null);

  useEffect(() => {
    return listen('show-alert', (event: CustomEvent) => {
      setOptions(event.detail);
    });
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
