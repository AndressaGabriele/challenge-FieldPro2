export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${year}`;
};
