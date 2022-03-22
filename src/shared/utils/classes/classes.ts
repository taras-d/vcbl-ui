type Arg = string | {[key: string]: unknown};

export function classes(...args: Arg[]): string {
  let result = '';

  args.forEach((arg: Arg) => {
    if (!arg) {
      return;
    }

    if (typeof arg === 'string') {
      result += `${arg} `;
    } else {
      for (const key in arg) {
        if (arg[key]) {
          result += `${key} `;
        }
      }
    }
  });

  return result.trim();
}
