export const history = {
  push(url: string, data?: unknown): void {
    window.history.pushState(data, null, url);
    window.dispatchEvent(new Event('pushstate'));
  }
};
