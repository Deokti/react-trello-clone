const removeColumn = (id: number) => {
  return {
    type: 'REMOVE_COLUMN',
    payload: id
  }
};

export default removeColumn;