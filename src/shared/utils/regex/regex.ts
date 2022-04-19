export function escapeRegex(string: string): string {
  // https://stackoverflow.com/a/3561711/8368932
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}