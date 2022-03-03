const prefix = 'vcbl';

function prefixedKey(key: string): string {
  return `${prefix}_${key}`;
}

function set(key: string, value: unknown): void {
  localStorage.setItem(prefixedKey(key), JSON.stringify(value));
}

function get(key: string): unknown {
  try {
    return JSON.parse(localStorage.getItem(prefixedKey(key)));
  } catch {
    return null;
  }
}

function remove(key: string): void {
  localStorage.removeItem(prefixedKey(key));
}

export const storage = {
  get,
  set,
  remove,
}