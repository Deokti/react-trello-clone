const addNewCard = (id: number, label: string) => {
  return {
    type: 'ADD_NEW_CARD',
    payload: {
      id,
      label
    }
  }
};

export default addNewCard;