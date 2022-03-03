type Listener = () => void;

const listeners: Listener[] = [];

function callListeners(): void {
  listeners.forEach(cb => cb());
}

window.addEventListener('popstate', callListeners);

export const history = {
  listen(cb: Listener): () => void {
    listeners.push(cb);
    return () => {
      listeners.splice(listeners.indexOf(cb), 1);
    }
  },

  push(url: string, data?: unknown): void {
    window.history.pushState(data, null, url);
    callListeners();
  }
};
