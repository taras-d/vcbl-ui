
const dict: Record<string, string> = {};

export function tkey(key: string, ...args: unknown[]): string {
  const value = dict[key] || '';

  if (value && args.length) {
    return value.replace(/\{(\d+)\}/g, (_, index: string) => {
      return args[+index] as string;
    });
  }

  return value;
}
