export const getLastItem = (thePath) => {
  return thePath.substring(thePath.lastIndexOf('/') + 1);
}