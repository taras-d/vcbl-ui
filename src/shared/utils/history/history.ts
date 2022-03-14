import { events } from '@shared/utils';
import { EventTypes } from '@shared/interfaces';

const triggerChange = () => events.trigger(EventTypes.historyChange);

window.addEventListener('popstate', triggerChange);

export const history = {
  push(url: string, data?: unknown): void {
    window.history.pushState(data, null, url);
    triggerChange();
  }
};
