import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { MAX_DOMAINS } from '../utils/constants';

const SelectionContext = createContext(null);

export function SelectionProvider({ children }) {
  const [selected, setSelected] = useState([]);
  const [limitWarning, setLimitWarning] = useState(false);

  const toggleDomain = useCallback((id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        setLimitWarning(false);
        return prev.filter((d) => d !== id);
      }
      if (prev.length >= MAX_DOMAINS) {
        setLimitWarning(true);
        return prev;
      }
      setLimitWarning(false);
      return [...prev, id];
    });
  }, []);

  const clearWarning = useCallback(() => setLimitWarning(false), []);

  const value = useMemo(
    () => ({ selected, toggleDomain, limitWarning, clearWarning }),
    [selected, toggleDomain, limitWarning, clearWarning]
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used inside SelectionProvider');
  return ctx;
}
