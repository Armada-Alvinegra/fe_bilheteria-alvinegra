import { useState, useEffect } from 'react';

/**
 * useState com persistência automática em localStorage.
 * Serializa/deserializa via JSON — funciona com strings, objetos e null.
 */
export function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      if (state === null || state === undefined) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}