export function listen(
  type: string,
  listener: (event: Event) => void
): () => void {
  window.addEventListener(type, listener);
  return () => window.removeEventListener(type, listener);
}