export const saveValueToLS = (field: string, val: boolean | string) => {
  const valueToWrite = typeof val === 'string' ? val : JSON.stringify(val);
  window.localStorage.setItem(field, valueToWrite)
}
export const getValueFromLS = (field: string, defaultValue: boolean | string | null) => {
  const itemInStorage = window.localStorage.getItem(field);
  if (itemInStorage === null) {
    return defaultValue;
  }
  let returnValue;
  try {
    returnValue = JSON.parse(itemInStorage);
  } catch (e) {
    returnValue = itemInStorage
  }
  return returnValue;
}
export const deleteValueFromLS = (field: string) =>
  window.localStorage.removeItem(field)
