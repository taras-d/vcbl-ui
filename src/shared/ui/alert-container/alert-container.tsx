import { useEffect, useState } from 'react';

import { AlertOptions, EventTypes } from '@shared/interfaces';
import { Modal, Button } from '@shared/ui';
import { events, tkey } from '@shared/utils';
import './alert-container.less';

export function AlertContainer() {
  const [options, setOptions] = useState<AlertOptions>(null);

  useEffect(() => {
    return events.listen(EventTypes.showAlert, (data: AlertOptions) => setOptions(data));
  }, []);

  const closeAlert = () => setOptions(null);

  return options && (
    <Modal
      className="alert"
      header={options.title}
      onClose={closeAlert}>
      {options.text}
      <div className="alert-actions">
        <Button text={tkey('alert_ok')} onClick={closeAlert}/>
      </div>
    </Modal>
  );
}
