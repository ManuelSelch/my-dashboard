import { useState, useEffect } from 'react';

export const storage = {
  set: (key, value) => {
      try {
          localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
          console.error(`Error setting ${key} in localStorage`, error);
      }
  },

  get: (key) => {
      try {
          const value = localStorage.getItem(key);
          return value ? JSON.parse(value) : null;
      } catch (error) {
          console.error(`Error getting ${key} from localStorage`, error);
          return null;
      }
  },

  remove: (key) => {
      try {
          localStorage.removeItem(key);
      } catch (error) {
          console.error(`Error removing ${key} from localStorage`, error);
      }
  }
};


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
