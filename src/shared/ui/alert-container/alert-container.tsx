import { useEffect, useState } from 'react';

import { AlertOptions, EventTypes } from '@shared/interfaces';
import { Modal, Button, Translate } from '@shared/ui';
import { events } from '@shared/utils';
import { useTranslate } from '@shared/hooks';
import './alert-container.less';

export function AlertContainer() {
  const translate = useTranslate();
  const [options, setOptions] = useState<AlertOptions>(null);

  useEffect(() => {
    return events.listen(EventTypes.showAlert, (data: AlertOptions) => setOptions(data));
  }, []);

  if (!options) {
    return null;
  }

  const closeAlert = () => setOptions(null);

  const title = typeof options.title === 'function' ? options.title(translate) : options.title;
  const text = typeof options.text === 'function' ? options.text(translate) : options.text;

  return (
    <Modal
      className="alert"
      header={title}
      onClose={closeAlert}>
      {text}
      <div className="alert-actions">
        <Button text={<Translate value="misc.okBtn" />} onClick={closeAlert}/>
      </div>
    </Modal>
  );
}
