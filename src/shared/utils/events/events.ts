const eventTarget = new EventTarget();

function listen(name: string, handler: (...args: unknown[]) => void): () => void {
  const listener = (event: CustomEvent): void => handler(...event.detail)
  eventTarget.addEventListener(name, listener);
  return () => eventTarget.removeEventListener(name, listener);
}

function trigger(name: string, ...args: unknown[]): void {
  eventTarget.dispatchEvent(new CustomEvent(name, { detail: args }));
}

export const events = {
  listen,
  trigger,
};
