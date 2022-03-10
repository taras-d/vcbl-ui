import { useEffect, useState } from 'react';

import { AlertOptions } from '@shared/interfaces';
import { Modal, Button } from '@shared/ui';
import { events } from '@shared/utils';
import './alert-container.less';

export function AlertContainer() {
  const [options, setOptions] = useState<AlertOptions>(null);

  useEffect(() => {
    return events.listen('show-alert', (data: AlertOptions) => setOptions(data));
  }, []);

  const closeAlert = () => setOptions(null);

  return options && (
    <Modal
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
