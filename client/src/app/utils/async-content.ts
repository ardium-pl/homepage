import { Signal, signal } from '@angular/core';

export interface AsyncContent<T> {
  readonly content: Signal<T | null>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<boolean>;
}

export function createAsyncContent<T>(loader: () => Promise<T | null>): AsyncContent<T> {
  const content = signal<T | null>(null);
  const loading = signal(true);
  const error = signal(false);

  void Promise.resolve()
    .then(loader)
    .then((value) => {
      content.set(value);
      error.set(!value);
    })
    .catch(() => error.set(true))
    .finally(() => loading.set(false));

  return { content, loading, error };
}
