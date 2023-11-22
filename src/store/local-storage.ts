export const getItemFromStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : {};
};

export const setItemFromStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
