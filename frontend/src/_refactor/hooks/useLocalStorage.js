import { useState, useEffect } from 'react';

const useLocalStorage = (storageKey) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : null;
  });

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.detail.key === storageKey) {
        setValue(event.detail.value);
      }
    };

    window.addEventListener('local-storage-'+storageKey, handleStorageChange);

    return () => {
      window.removeEventListener('local-storage-'+storageKey, handleStorageChange);
    };
  }, [storageKey]);

  const setLocalStorageValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(storageKey, JSON.stringify(newValue));
    window.dispatchEvent(
      new CustomEvent('local-storage-'+storageKey, {
        detail: {
          key: storageKey,
          value: newValue,
        },
      })
    );
  };

  return [value, setLocalStorageValue];
};

export default useLocalStorage;
