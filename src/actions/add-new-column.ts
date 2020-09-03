const addNewColumn = (title: string) => {
  return {
    type: 'ADD_NEW_COLUMN',
    payload: title
  }
};

export default addNewColumn;