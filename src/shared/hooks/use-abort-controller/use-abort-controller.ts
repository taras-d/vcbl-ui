import { useEffect, useRef } from 'react';

export function useAbortController() {
  const controller = useRef<AbortController>(null);

  useEffect(() => {
    return abort;
  }, []);

  function abort(): void {
    controller.current?.abort();
  }

  function signal(): AbortSignal {
    controller.current = new AbortController();
    return controller.current.signal;
  }

  return {
    abort,
    signal,
  }
}