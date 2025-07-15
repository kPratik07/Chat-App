// Save data to localStorage
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Retrieve data from localStorage
export const getFromStorage = (key) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
};

// Remove data from localStorage
export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};
