export function isObject(value: unknown): boolean {
  return value && value.constructor.name === 'Object';
}

export function flattenObject<T>(object: Record<string, unknown>, path?: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const key in object) {
    const val = object[key];
    const newKey = path ? `${path}.${key}` : key;

    if (isObject(val)) {
      Object.assign(result, flattenObject(val as Record<string, unknown>, newKey));
    } else {
      result[newKey] = val;
    }
  }

  return result;
}