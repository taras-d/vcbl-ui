export function isObject(value: unknown): boolean {
  return value && value.constructor.name === 'Object';
}