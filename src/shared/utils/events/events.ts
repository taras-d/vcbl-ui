type Handler = (...args: unknown[]) => void;

const map: Record<string, Handler[]> = {};

function listen(name: string, fn: Handler): () => void {
  let fns = map[name];

  if (fns) {
    fns.push(fn);
  } else {
    map[name] = fns = [fn];
  }

  return () => fns.splice(fns.indexOf(fn), 1);
}

function trigger(name: string, ...args: unknown[]): void {
  map[name]?.forEach(fn => fn(...args));
}

export const events = {
  listen,
  trigger,
};
