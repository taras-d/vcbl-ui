import { events } from '@shared/utils';

const triggerChange = () => events.trigger('history-change');

window.addEventListener('popstate', triggerChange);

export const history = {
  push(url: string, data?: unknown): void {
    window.history.pushState(data, null, url);
    triggerChange();
  }
};
