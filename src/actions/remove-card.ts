const removeCard = (trelloColumnId: number, trelloCardId: number) => {
  return {
    type: 'REMOVE_CARD',
    payload: {
      trelloColumnId,
      trelloCardId
    }
  }
};

export default removeCard;