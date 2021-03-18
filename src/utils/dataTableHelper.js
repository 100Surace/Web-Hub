export const sortDesc = (column, a, b) => {
  let index;
  if (a[column].toLowerCase() > b[column].toLowerCase()) {
    index = 1;
  } else if (b[column].toLowerCase() > a[column].toLowerCase()) {
    index = -1;
  } else {
    index = 0;
  }
  return index;
};

export const sortAsc = (column, a, b) => {
  let index;
  if (a[column].toLowerCase() < b[column].toLowerCase()) {
    index = 1;
  } else if (b[column].toLowerCase() < a[column].toLowerCase()) {
    index = -1;
  } else {
    index = 0;
  }
  return index;
};
