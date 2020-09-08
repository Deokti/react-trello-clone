import { ActionsType } from "./reducers";

export type TypeOneTrelloColumn = {
  id: number,
  title: string,
  cards: Array<TypeOneTrelloCard>
};

export type TypeOneTrelloCard = {
  id: number,
  label: string,
}

type GetUpdateDynamicArrays = {
  dynamicArrays: {
    arrayTrelloListColumn: Array<TypeOneTrelloColumn | null>
  }
}

type ReturnUpdateDynamicArrays = {
  arrayTrelloListColumn: Array<TypeOneTrelloColumn | null | undefined>
}

const updateCardItem = (prevItem: TypeOneTrelloColumn | null, label: string) => {
  const newCard = { id: Date.now(), label: label };
  if (prevItem) {
    return {
      ...prevItem,
      cards: [...prevItem.cards, newCard]
    }
  }
}

const updateColumnItem = (columnList: Array<TypeOneTrelloColumn | null | undefined>, item: any, index: number) => {
  return [
    ...columnList.slice(0, index),
    item,
    ...columnList.slice(index + 1),
  ]

}

const deleteCardItem = (columnList: Array<TypeOneTrelloColumn | null | undefined | any>,  indexColumn: number, indexCard: number) => {
  const columnIndex = columnList.findIndex(item => item?.id === indexColumn);
  const column = columnList[columnIndex];
  const cardIndex = column?.cards.findIndex((item: any) => item.id === indexCard);

  const newOneColumn = { ...column, cards: [
      ...column?.cards.slice(0, cardIndex),
      ...column?.cards.slice(cardIndex + 1),
    ] }

  return updateColumnItem(columnList, newOneColumn, columnIndex)
}

const updateDynamicArrays = (state: GetUpdateDynamicArrays, { type, payload }: ActionsType): ReturnUpdateDynamicArrays => {
  if (state === undefined) {
    return {
      arrayTrelloListColumn: [
        {
          id: 0,
          title: 'Название списка дел',
          cards: [
            { id: 1, label: 'Пройти курс по React' },
            { id: 2, label: 'Сделать бекенд своего сайта на node.js' },
            { id: 3, label: 'Записаться на курсы английского языка' },
            { id: 4, label: 'Пройти курс по React' },
          ]
        },
        {
          id: 1,
          title: 'Добавить новое дело',
          cards: [
            {id: 5, label: 'Забронировать тир на субботу'},
            {id: 6, label: 'Накидать тем для статей в блог'},
          ]
        },
      ],
    }
  }

  switch (type) {
    case 'TRELLO_LIST':
      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: payload
      }

    case "ADD_NEW_COLUMN":
      const column = {
        id: Date.now(),
        title: payload,
        cards: [],
      };

      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: [
          ...state.dynamicArrays.arrayTrelloListColumn,
          column
        ]
      }

    case "ADD_NEW_CARD":
      const { id, label } = payload;
      const indexCard = state.dynamicArrays.arrayTrelloListColumn.findIndex((item) => item?.id === id );
      const getCard = state.dynamicArrays.arrayTrelloListColumn[indexCard];

      const newCard = updateCardItem(getCard, label);

      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: updateColumnItem(state.dynamicArrays.arrayTrelloListColumn, newCard, indexCard)
      }

    case "REMOVE_CARD":
      const { trelloColumnId, trelloCardId } = payload;

      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: deleteCardItem(state.dynamicArrays.arrayTrelloListColumn, trelloColumnId, trelloCardId)
      }

    default:
      return state.dynamicArrays
  }
}

export { updateDynamicArrays }
