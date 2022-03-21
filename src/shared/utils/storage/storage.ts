const prefix = 'vcbl';

function prefixedKey(key: string): string {
  return `${prefix}_${key}`;
}

function set(key: string, value: unknown): void {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(prefixedKey(key), value as string);
}

function get(key: string): unknown {
  const value = localStorage.getItem(prefixedKey(key));
  try {
    return JSON.parse(value);
  } catch {
    return value;
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