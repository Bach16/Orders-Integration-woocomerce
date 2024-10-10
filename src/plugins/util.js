export const findIndexByKey = (array, key) => {
  if (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        return i;
      }
    }
    return -1;
  } // Return -1 to indicate the key wasn't found
};
export const findValueByKey = (array, key) => {
  if (array) {
    for (const obj of array) {
      if (obj.key === key) {
        return obj.value;
      }
    }
    return null; // or any other value to indicate the key wasn't found
  }
};
export const TotalNbultosSum = (array) => {
  const result = array?.reduce((total, item) => {
    if (parseInt(item.meta_data[0].value)) {
      return total + parseInt(item.meta_data[0].value);
    }
    return total + 0;
  }, 0);
  return result;
};
export const TotalVariosSum = (array) => {
  const result = array?.reduce((total, item) => {
    if (parseInt(item.meta_data[3].value)) {
      return total + parseInt(item.meta_data[3].value);
    }
    return total + 0;
  }, 0);
  return result;
};