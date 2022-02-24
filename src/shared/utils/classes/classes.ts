type Arg = string | {[key: string]: unknown};

export function classes(...args: Arg[]): string {
  return args
    .filter(arg => arg)
    .map(arg => {
      if (typeof arg === 'string') {
        return arg;
      }

      const items = [];
      for (const key in arg) {
        if (arg[key]) {
          items.push(key);
        }
      }
      return items.join(' ');
    }).join(' ');
}
