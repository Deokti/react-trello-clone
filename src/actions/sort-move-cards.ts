const sortMoveCards = (droppableIdStart: any, droppableIdEnd: any, droppableIndexStart: any, droppableIndexEnd: any, droppableId: any) => {
  return {
    type: "SORT_MOVE_CARDS",
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      droppableId
    }
  }
};

export default sortMoveCards;