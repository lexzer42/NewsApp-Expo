let idCounter = 0;

export const generateUniqueId = (): string => {
  const timestamp = Date.now();
  idCounter += 1;
  return `id-${timestamp}-${idCounter}`;
};